import { defineComponent, h, VNode } from 'vue'
import Button from '../Button'

const DatePickerYear = defineComponent({
  name: 'x-date-picker-year',
  emits: ['input'],
  props: {
    small: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
    },
  },
  computed: {
    count () : number {
      return this.small ? 4 : 3
    }
  },
  methods: {
    _renderBox(vnode?: VNode) {
      return h('div', { class: 'x-date-picker-year-box' }, vnode)
    },
    _renderYear (year: number) {
      const button = h(Button, {
        block: true,
        color: 'black',
        rounded: true,
        text: year !== this.value,
        small: this.small,
        onClick: () => this.$emit('input', year)
      }, () => year.toString())

      return this._renderBox(button)
    },
    _renderRow (chilren: VNode[]) {
      if (chilren.length !== this.count) {
        chilren = Array(this.count).fill(0).map((_, idx) => {
          return chilren[idx] ?? this._renderBox()
        })
      }
      return h('div', { class: 'x-date-picker-year-row' }, chilren)
    }
  },
  render () {
    const chilren = []

    let row = []
    let year = this.min
    while (year <= this.max) {
      row.push(this._renderYear(year))
      if (row.length === this.count) {
        chilren.push(this._renderRow(row))
        row = []
      }
      year++
    }

    if (row.length > 0) {
      chilren.push(this._renderRow(row))
    }

    return h('div', {
      class: {
        'x-date-picker-year': true,
        small: this.small
      }
    }, chilren)
  }
})

export default DatePickerYear