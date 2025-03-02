import { computed, defineComponent, h, inject, ref, Transition, vShow, watchEffect, withDirectives } from "vue"
import { CollapseKey } from './collapse'
import useExpand from '../transitions/expand'
import { Ripple } from "../../directives/ripple"
import Icon from "../Icon"

const CollapsePanel = defineComponent({
  name: 'x-collapse-panel',

  props: {
    // reflect -> key
    value: { 
      type: [String, Number],
      required: true,
    },
    title: String,
    disabled: Boolean,
  },

  setup(props, { slots }) {
    const collapse = inject(CollapseKey)
    const expand = useExpand(true)
    const rendered = ref(false)

    const isActive = computed(() => {
      if (!collapse) {
        console.warn('can\'t query collapse')
        return false
      }

      return collapse.iValue.includes(props.value)
    })

    const iDisabled = computed(() => collapse?.disabled || props.disabled)

    watchEffect(() => {
      if (isActive.value && !rendered.value) {
        rendered.value = true
      }
    })

    const handleTrigger = () => {
      collapse?.selected(props.value)
    }

    const _renderHeader = () => {
      const header = h('div', {
        class: 'x-collapse-panel-header',
        onClick: handleTrigger
      }, [
        slots.header?.() || props.title || h('div'),
        h(Icon, { type: 'chevron-down' })
      ])

      return withDirectives(header, [[Ripple, { enable: collapse?.ripple }]])
    }

    const _renderContent = () => {
      // https://github.com/vuejs/core/issues/3727
      // https://github.com/vuejs/core/blob/5ad4036e29f75dc907e95b99a63325b855332566/packages/runtime-core/src/components/BaseTransition.ts#L31
      // https://github.com/vuejs/docs/commit/1bc10c092e32de98c9cf5c1f0f49c15e0373a563#diff-12cd56da3ca16c18069fe92eb77310c570271e1a6f84c7c9476559d81a944abfL23
      return h(Transition, { ...expand, persisted: true, appear: true }, () => {
        if (!rendered.value) return

        const content =  h('div', { class: 'x-collapse-panel-content'},
          h('div', { class: 'x-collapse-panel-content-box' }, slots.default?.())
        )
        return withDirectives(content, [[vShow, isActive.value]])
      })
    }

    return () => {
      return h('div', {
        class: {
          'x-collapse-panel': true,
          'x-collapse-panel-active': isActive.value,
          'x-collapse-panel-disabled': iDisabled.value,
        }
      }, [
        h('div', { class: 'x-collapse-panel-shadow' }),
        _renderHeader(),
        _renderContent(),
      ])
    }
  },
})

export default CollapsePanel