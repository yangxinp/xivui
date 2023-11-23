import { InjectionKey, ExtractPublicPropTypes, PropType, defineComponent, h, withDirectives, inject, computed, provide, reactive, toRefs } from 'vue'
import { Ripple } from "../../directives/ripple"

interface CheckboxOption { label: string; value: any, disabled?: boolean}

type CheckboxGroupPropsType = ExtractPublicPropTypes<typeof CheckboxGroupProps>

interface CheckboxGroupContext extends CheckboxGroupPropsType {
  change: (value: CheckboxGroupPropsType['value'] ) => any
}

const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupContext> = Symbol()

const CheckboxGroupProps = {
  value: Array,
  color: String,
  inline: Boolean,
  disabled: Boolean,
  max: Number,
  min: Number,
  options: Array as PropType<CheckboxOption[]>,
}

export const CheckboxGroup = defineComponent({
  emits: ['input', 'change', 'update:value'],

  name: 'x-checkbox-group',

  props: CheckboxGroupProps,

  setup(props, { emit, slots }) {
    const change: CheckboxGroupContext['change'] = (value) => {
      emit('input', value)
      emit('change', value)
      emit('update:value', value)
    }

    provide(CHECKBOX_GROUP_KEY, reactive({ ...toRefs(props), change }))

    const _renderRadio = () => {
      return (props.options ?? []).map(opt => {
        return h(Checkbox, { value: opt.value, disabled: opt.disabled }, () => opt.label)
      })
    }

    return () => h('div', {
      class: ['x-checkbox-group', { 'x-checkbox-group--inline': props.inline }]
    }, [
      _renderRadio(),
      slots.default?.()
    ])
  }
})

const Checkbox = defineComponent({
  emits: ['update:checked', 'change'],

  name: 'x-checkbox',

  props: {
    color: String,
    checked: Boolean,
    disabled: Boolean,
    value: [String, Number, Object],
    indeterminate: Boolean,
  },

  setup(props, { emit, slots }) {
    const groups = inject(CHECKBOX_GROUP_KEY)

    const color = computed(() => props.color ?? groups?.color ?? 'blue')
    const disabled = computed(() => groups?.disabled || props.disabled)

    const checked = computed<boolean>({
      set(val) {
        if (groups) {
          const duplicate = groups.value ? [...groups.value] : []

          if (checked.value) {
            // remove
            const idx = duplicate.indexOf(props.value)
            if (idx > -1) duplicate.splice(idx, 1)
          } else {
            // add
            duplicate.push(props.value)
          }

          groups.change(duplicate)
        } else {
          emit('change', val)
          emit('update:checked', val)
        }
      },
      get() {
        if (groups) {
          return groups.value ? groups.value.indexOf(props.value) > -1 : false
        } else {
          return props.checked
        }
      }
    })

    const onClick = () => {
      if (!disabled.value) {
        checked.value = !checked.value
      }
    }

   const _renderSquare = () => {
      const svg = h('svg', { viewBox: "0 0 16 16", class: {
        'x-checkbox--svg': true,
        '_check': checked.value,
        '_line': props.indeterminate,
      }}, h('path', {  d: "M3,6 L3,10 L13,10" }))

      return h('div', {
        class: ['x-checkbox--square', {
          [color.value]: !disabled.value && (checked.value || props.indeterminate)
        }]
      }, svg)
    }

    const _renderControl = () => {
      return h('div', {
        class: [
          'x-checkbox--control',
          { ['text-' + color.value]: !disabled.value && (checked.value || props.indeterminate) }
        ],
      }, [
        _renderSquare(),
        h('input', { class: 'x-checkbox--input' }),
        withDirectives(h('div', { class: 'x-checkbox--ripple' }), [[Ripple]])
      ]) 
    }

    const _renderLabel = () => {
      return h('div', { class: "x-checkbox--label" }, slots.default?.())
    }

    return () => {
      return h('div', { class: ['x-checkbox', { 'x-checkbox--disabled': disabled.value }], onClick }, [
        _renderControl(),
        _renderLabel()
      ])

      return (
        <div class="checkbox">
          <div class="control">
            <div class="square">
              <svg></svg>
            </div>
            <input class="input"/>
            <div class="ripple"></div>
          </div>
          <label>label</label>
        </div>
      )
    }
  },
})

export default Checkbox