import { defineComponent, h } from "vue";

const ProgressLinear = defineComponent({
  name: "x-progress-linear",
  props: {
    // 0 ~ 100
    value: Number,
    bufferValue: {
      type: Number,
      default: 100
    },
    stream: Boolean,
    indeterminate: Boolean,
  },
  computed: {
    _value(): number {
      return this.normalValue(this.value)
    },
    _bufferValue(): number {
      return this.normalValue(this.bufferValue)
    },
    _surplusValue(): number {
      return this._bufferValue - this._value
    },
    _streamValue(): number {
      return 100 - this._bufferValue
    }
  },
  methods: {
    normalValue (val: number | string | undefined) {
      if (!val) return 0
      if (typeof val === 'string') val = parseFloat(val)
      return Math.min(100, Math.max(0, val))
    },
    _renderBuffer () {
      return h('div', {
        class: {
          "x-progress-linear--buffer": true
        },
        style: {
          transform: `scaleX(${this._bufferValue / 100})`
        }
      })
    },
    _renderDeterminate () {
      return h('div', {
        class: {
          "x-progress-linear--determinate": true
        },
        style: {
          transform: `scaleX(${this._value / 100})`
        }
      })
    },
    _renderSurplus () {
      return h('div', {
        class: {
          "x-progress-linear--surplus": true
        },
        style: {
          left: this._value + "%",
          width: this._surplusValue + "%"
        }
      })
    },
    _renderStream () {
      return h('div', {
        class: {
          "x-progress-linear--stream": true
        },
        style: {
          transform: `translateX(-${this._streamValue}%)`
        }
      })
    },
    _renderIndeterminate () {
      return [
        h('div', { class: { "x-progress-linear--indeterminate-long": true } }),
        h('div', { class: { "x-progress-linear--indeterminate-short": true } })
      ]
    }
  },
  render() {
    const tree = [this._renderBuffer()]

    if (this.indeterminate) {
      tree.push(...this._renderIndeterminate())
    } else {
      tree.push(this._renderDeterminate())
    }

    if (this.stream && this._streamValue) tree.push(this._renderStream())
    
    return h('div', {
      class: { "x-progress-linear": true }
    }, tree)

    return (
      <div class="progress-linear">
        <div class="buffer"></div>
        <div class="determinate"></div>
        {/* <div class="surplus"></div> */}
        <div class="stream"></div>
        <div class="indeterminate-long"></div>
        <div class="indeterminate-short"></div>
      </div>
    )
  }
});

export default ProgressLinear;
