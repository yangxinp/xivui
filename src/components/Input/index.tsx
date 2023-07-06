import { PropType, Transition, defineComponent, h, nextTick } from "vue";
import { makeComponentProps } from "../../compositions/component"
import Icon from "../Icon"
import expand from "../transitions/expand";
import ProgressLinear from "../ProgressLinear";

const allowVariants = ['underlined', 'outlined', 'filled'] as const
type Variant = typeof allowVariants[number]

enum IconPos {
  Prefix,
  Suffix,
  PrefixOuter,
  SuffixOuter,
  Clear
}

export const makeInputProps = () => ({
  label: String,
  variant: {
    type: String as PropType<Variant>,
    default: 'underlined'
  },
  loading: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  prefixIcon: String,
  prefixOuterIcon: String,
  suffixIcon: String,
  suffixOuterIcon: String,
})

const Input = defineComponent({
  emits: ['click', 'click:clear'],

  inheritAttrs: false,

  name: "x-input",
  props: {
    moveLabel: Boolean,
    active: Boolean,
    error: Boolean,
    message: String,
    ...makeComponentProps(),
    ...makeInputProps(),
  },
  setup() {
    return { expandHook: expand(), expandHookY: expand(true) }
  },
  data() {
    return {
      legendWidth: 0,
      offset: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    labelClasses(): object {
      return {
        "x-label": true,
        _move: this.moveLabel,
        _active: this.active,
        _disabled: this.disabled,
      };
    },
    labelStyles() {
      return {
        transform: `translateX(${-this.offset.x}px) translateY(${-this.offset.y}px) scale(0.75)`
      }
    },
    legendStyle() {
      return { width: this.moveLabel ? `${this.legendWidth}px` : '0px' };
    },
    inputClasses() {
      return [
        'x-input',
        `_${this.variant}`,
        {
          _active: this.active,
          _error: !this.disabled && this.error,
          _disabled: this.disabled,
        },
        this.class,
      ];
    },
  },
  mounted() {
    this.initOffset()
  },
  watch: {
    variant() {
      nextTick(() => this.initOffset())
    },
  },
  methods: {
    initOffset() {
      if (this.variant === 'underlined') {
        const label = this.$refs.label as HTMLElement

        this.offset = {
          x: 0,
          y: label.offsetTop + label.clientHeight * 0.75,
        }
        this.legendWidth = 0
      }

      if (this.variant === 'outlined') {
        const slot = this.$refs.slot as HTMLElement
        const label = this.$refs.label as HTMLElement
        const legend = this.$refs.legend as HTMLElement
        const space = 6

        this.offset = {
          x: slot.offsetLeft - legend.offsetLeft - space * 0.5,
          y: label.offsetTop + label.clientHeight * 0.5 * 0.75
        }
        this.legendWidth = label.clientWidth * 0.75 + space
      }

      if (this.variant === 'filled') {
        const label = this.$refs.label as HTMLElement
        this.offset = {
          x: 0,
          y: label.clientHeight * 0.75 * 0.5
        }
        this.legendWidth = 0
      }
    },
    _renderIcon (pos: IconPos) {
      switch (pos) {
        case IconPos.Prefix:
          return h(Icon, { type: this.prefixIcon, class: 'prefix-icon'  })
        case IconPos.Suffix:
          return h(Icon, { type: this.suffixIcon, class: 'suffix-icon' })
        case IconPos.PrefixOuter:
          return h(Icon, { type: this.prefixOuterIcon, class: 'prefix-outer-icon' })
        case IconPos.SuffixOuter:
          return h(Icon, { type: this.suffixOuterIcon, class: 'suffix-outer-icon' })
        case IconPos.Clear:
          return h(Icon, {
            type: 'close-circle', class: 'suffix-icon close',
            onMousedown: (e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              this.$emit('click:clear')
            }
          })
      }
    },
    _renderFieldset () {
      return h('fieldset', [h('legend', { style: this.legendStyle, ref: 'legend' })])
    },
    _renderLabel () {
      return h('label', { class: this.labelClasses, style: this.moveLabel ? this.labelStyles : {}, ref: 'label' }, this.label)
    },
    _renderSlot () {
      const children = [this._renderLabel()]
      const slot = this.$slots.default?.()
      if (slot) {
        Array.isArray(slot) ? children.push(...slot) : children.push(slot)
      }

      return h('div', { class: 'x-input--slot', ref: 'slot' }, children)
    },
    _renderDetails() {
      return h('div', { class: 'x-input--details' }, [
        h('div', { class: 'x-input--message' },
          h(Transition, { name: "slide-y-reverse-transition", appear: true }, () => {
            if (!this.disabled && this.message && this.message.length > 0) return h('div', {}, this.message)
          })
        ),  
        this.$slots.details?.(),
        // h('div', { class: 'x-input--counter' }, '1 / 20')
      ])
    },
    _renderContent () {  
      const children = [this._renderSlot()]

      if (this.variant === 'outlined') {
        children.unshift(this._renderFieldset())
      }
      if (this.prefixIcon) {
        children.unshift(this._renderIcon(IconPos.Prefix))
      }

      children.push(h(Transition, { ...this.expandHook }, () => {
        if (this.clearable && !this.disabled) return this._renderIcon(IconPos.Clear)
      }))

      if (this.suffixIcon) {
        children.push(this._renderIcon(IconPos.Suffix))
      }

      return h('div', { class: 'x-input--content', onClick: () => this.$emit('click') }, children)
    },
    _renderControl () {
      return h('div', { class: 'x-input--control' }, [
        this._renderContent(),
        h(Transition, { ...this.expandHookY }, () => {
          if (this.loading) return h(ProgressLinear, { indeterminate: true })
        }),
        this._renderDetails()
      ])
    },
  },
  render() {
    const children = [this._renderControl()]
    if (this.prefixOuterIcon) {
      children.unshift(this._renderIcon(IconPos.PrefixOuter))
    }

    if (this.suffixOuterIcon) {
      children.push(this._renderIcon(IconPos.SuffixOuter))
    }
    return h('div', { class: this.inputClasses, style: this.style }, children)

    return (
      <div class="input">
        <Icon />
        <div class="control">
          <div class="content">
            <Icon />
            <fieldset><legend></legend></fieldset>
            <div class="slot">
              <label></label>
              <slot></slot>
            </div>
            <Icon />
          </div>

          <div class="detail">
            <div>message</div>
            <div>counter</div>
          </div>
        </div>
        <Icon />
      </div>
    )
  },
});

export default Input;
