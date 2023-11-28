import { defineComponent, h, resolveDirective, withDirectives } from "vue";
import { Ripple } from "../../directives/ripple"
import ProgressCircular from "../ProgressCircular";

const Switch = defineComponent({
  emits: ['click', 'input', 'update:value'],

  name: 'x-switch',
  directives: {
    Ripple
  },
  props: {
    inset: Boolean,
    value: Boolean,
    loading: Boolean,
    disabled: Boolean,
  },
  methods: {
    handleClick () {
      const value = !this.value
      this.$emit('click')
      this.$emit('input', value)
      this.$emit('update:value', value)
    },
    _renderTrack () {
      return h('div', { class: "x-switch--track" })
    },
    _renderThumb () {
      const child = this.loading ?
        h(ProgressCircular, { indeterminate: true  }) :
        undefined

      return h('div', { class: "x-switch--thumb" }, child)
    },
    _renderRipple () {
      const VRipple = resolveDirective('ripple')
      const VNode = h('div', { class: "x-switch--ripple" })
      if (VRipple === undefined) throw new Error('缺少指令')

      return withDirectives(VNode, [[VRipple]])
    }
  },
  render () {
    return h('div', {
      class: {
        "x-switch": true,
        "loading": this.loading,
        "disabled": this.disabled,
        "active": this.value,
        "inset": this.inset
      },
      onClick: this.handleClick
    }, [
      this._renderTrack(),
      this._renderThumb(),
      this._renderRipple(),
    ])

    return (
      <div class="switch">
        <div class="track"></div>
        <div class="thumb"></div>
        <div class="ripple"></div>
      </div>
    )
  }
})

export default Switch