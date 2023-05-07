import { defineComponent, h, withDirectives } from 'vue'
import { Ripple } from "../../directives/ripple"

const Checkbox = defineComponent({
  name: 'x-checkbox',
  emits: ['click', 'update:value'],
  props: {
    color: String,
    value: [Boolean, String, Number],
    indeterminate: Boolean,
    // onClick: Function
  },
  methods: {
    handleClick () {
      this.$emit('update:value', !this.value)
      this.$emit('click', !this.value)
    },
    _renderSquare() {
      const svg = h('svg', {
        viewBox: "0 0 16 16",
        class: {
          'x-checkbox--svg': true,
          '_check': Boolean(this.value),
          '_line': this.indeterminate,
        },
      }, h('path', {  d: "M3,6 L3,10 L13,10" }))

      return h('div', {
        class: {
          "x-checkbox--square": true,
          [this.color ?? 'blue']: Boolean(this.value) || this.indeterminate,
        }
      }, svg)
    },
    _renderInput() {
      return h('input', { class: "x-checkbox--input" })
    },
    _renderRipple() {
      const VNode = h('div', { class: "x-checkbox--ripple" })
      return withDirectives(VNode, [[Ripple]])
    },
    _renderLabel() {
      return h('div', { class: "x-checkbox--label" }, this.$slots.default?.())
    },
    _renderControl() {
      return h('div', {
        class: {
          "x-checkbox--control": true,
          [this.color ?? 'text-blue']: Boolean(this.value) || this.indeterminate,
        },
      }, [
        this._renderSquare(),
        this._renderInput(),
        this._renderRipple()
      ]) 
    }
  },
  render() {
    return h('div', {
      class: { "x-checkbox": true },
      onClick: this.handleClick,
    }, [
      this._renderControl(),
      this._renderLabel()
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
})

export default Checkbox