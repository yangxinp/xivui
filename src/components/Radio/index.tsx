import { ExtractPublicPropTypes, InjectionKey, PropType, Ref, toRefs, defineComponent, h, provide, reactive, ref, withDirectives, inject, computed } from 'vue'
import { Ripple } from "../../directives/ripple"

interface RadioOption { label: string; value: any, disabled?: boolean}

type RadioGroupPropsType = ExtractPublicPropTypes<typeof RadioGroupProps>

interface RadioGroupContext extends RadioGroupPropsType {
  change: (value: RadioGroupPropsType['value'] ) => any
}

const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol()

const RadioGroupProps = {
  value: [String, Number, Object],
  color: String,
  inline: Boolean,
  disabled: Boolean,
  options: Array as PropType<RadioOption[]>,
}

export const RadioGroup = defineComponent({
  emits: ['input', 'change', 'update:value'],

  name: 'x-radio-group',

  props: RadioGroupProps,

  setup(props, { emit, slots }) {
    const change: RadioGroupContext['change'] = (value) => {
      emit('input', value)
      emit('change', value)
      emit('update:value', value)
    }

    provide(RADIO_GROUP_KEY, reactive({ ...toRefs(props), change }))

    const _renderRadio = () => {
      return (props.options ?? []).map(opt => {
        return h(Radio, { value: opt.value, disabled: opt.disabled }, () => opt.label)
      })
    }

    return () => h('div', {
      class: ['x-radio-group', { 'x-radio-group--inline': props.inline }]
    }, [
      _renderRadio(),
      slots.default?.()
    ])
  }
})

const Radio = defineComponent({
  emits: ['update:checked'],

  name: 'x-radio',

  props: {
    color: String,
    checked: Boolean,
    disabled: Boolean,
    value: [String, Number, Object],
  },

  setup(props, { emit, slots }) {
    const groups = inject(RADIO_GROUP_KEY)

    const color = computed(() => props.color ?? groups?.color ?? 'blue')
    const disabled = computed(() => groups?.disabled || props.disabled)

    const checked = computed<boolean>({
      set(val) {
        return groups ? groups.change(props.value) : emit('update:checked', val)
      },
      get() {
        return groups ? groups.value === props.value : props.checked 
      }
    })

    const onClick = () => {
      if (!disabled.value) {
        checked.value = !checked.value
      }
    }

    const _renderControl = () => {
      return h('div', {
        class: [
          'x-radio--control',
          { ['text-' + color.value]: !disabled.value && checked.value }
        ]
      }, [
        h('div', { class: ['x-radio--circle', { active: checked.value }] }),
        h('input', { class: 'x-radio--input' }),
        withDirectives(h('div', { class: 'x-radio--ripple' }), [[Ripple]])
      ]) 
    }

    const _renderLabel = () => {
      return h('div', { class: "x-radio--label" }, slots.default?.())
    }

    return () => {
      return h('div', { class: ['x-radio', { 'x-radio--disabled': disabled.value }], onClick }, [
        _renderControl(),
        _renderLabel()
      ])

      return (
        <div class="radio">
          <div class="control">
            <div class="circle">::before</div>
            <input class="input"/>
            <div class="ripple"></div>
          </div>
          <label>label</label>
        </div>
      )
    }
  }
})

export default Radio