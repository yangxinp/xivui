import { defineComponent, h, InjectionKey, PropType, computed } from "vue"
import CollapsePanel from './collapse-panel'
import { wrapInArray } from "../../utils"

export const CollapseKey: InjectionKey<InstanceType<typeof Collapse>> = Symbol()
export type CollapseValue = string | number | symbol

const Collapse = defineComponent({
  name: 'x-collapse',

  emits: ['update:value'],

  props: {
    value: [String, Number, Array] as PropType<CollapseValue | CollapseValue[]>,
    accordion: Boolean,
    multiple: Boolean,
    ripple: Boolean,
    disabled: Boolean,
  },

  provide() {
    return { [CollapseKey as symbol]: this }
  },

  setup(props, { emit, slots }) {
    const iValue = computed({
      get () : CollapseValue[] {
        return wrapInArray(props.value)
      },
      set (v : CollapseValue[]) {
        if (!props.multiple && v.length === 1) {
          emit('update:value', v[0])
        } else {
          emit('update:value', v)
        }
      }
    })

    function selected(key: CollapseValue) {
      if (!props.multiple) {
        iValue.value = iValue.value.includes(key) ? [] : [key]
        return
      }

      const duplicate = [...iValue.value]
      const idx = duplicate.indexOf(key)
      if (idx > -1) {
        duplicate.splice(idx, 1)
      } else {
        duplicate.push(key)
      }
      iValue.value = duplicate
    }

    const _render = () => {
      const content = slots.default?.().filter((vnode, index) => {
        if (vnode.type !== CollapsePanel) {
          console.warn('Collapse children should be CollapsePanel')
          return false
        } else {
          if (!vnode.props?.value) {
            vnode.props ??= {}
            vnode.props.value = vnode.key || index
          }

          return true
        }
      })

      return h('div', {
        class: {
          'x-collapse': true,
          'x-collapse-accordion': props.accordion,
        },
      }, content)
    }

    return { iValue, selected, _render }
  },

  render() {
    return this._render()
  }
})

export default Collapse