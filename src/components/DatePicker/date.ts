import { defineComponent, h, PropType } from 'vue'
import Button from '../Button'
import pad from './util/pad'

const DatePickerDate = defineComponent({
  name: 'x-date-picker-date',
  emits: ['input'],
  props: {
    // large: {
    //   type: Boolean,
    //   default: false
    // },
    small: {
      type: Boolean,
      default: false
    },
    // 首尾为圆角
    rounded: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
      required: true,
    },
    // 0 ~ 11
    month: {
      type: Number,
      required: true,
    },
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    min: String,
    max: String,
  },
  computed: {
    // 当前月份天数 - 当前月份最后一天
    daysInMonth () : number {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    // 上一个月的最后一天的周几
    beforeMonthLastDay () : number {
      return new Date(this.year, this.month, 0).getDay()
    }
  },
  methods: {
    isDisabled (date: string) {
      if (this.min && this.min > date) return true
      if (this.max && this.max < date) return true
    },
    // 是否为边界值
    isBoundary (date: string) {
      const boundary = { start: false, end: false }
      if (!this.range) return boundary

      if (this.value.length === 2) {
        const [from, to] = [...this.value].sort()
        boundary.start = from === date
        boundary.end = to === date
      } else {
        boundary.start = true
        boundary.end = true
      }

      return boundary
    },
    // 是否选中
    isSelected (date: string) : boolean {
      if (this.range && this.value.length === 2) {
        const [from, to] = [...this.value].sort()
        return from <= date && date <= to
      }

      return this.value.indexOf(date) !== -1
    },
    _renderDate (date ?: number) {
      if (!date) return h('div', { class: 'x-date-picker-date-box' })

      const time = `${this.year}-${pad(this.month + 1)}-${pad(date)}`
      const active = this.isSelected(time)
      const boundary = this.isBoundary(time)
      const disabled = this.isDisabled(time)
      const buttonActive = this.range ? (active && (boundary.start || boundary.end)) : active
      const backgroudActive = this.range && active

      const button = h(Button, {
        circle: true,
        color: 'black',
        small: this.small,
        disabled,
        // large: this.large,
        text: !buttonActive,
        onClick: () => this.$emit('input', date)
      }, () => date)

      return h('div', {
        class: {
          'x-date-picker-date-box': true,
          active: backgroudActive,
          first: backgroudActive && boundary.start,
          last: backgroudActive && boundary.end,
        }
      }, button)
    },
    _renderRow (cols: Parameters<typeof h>[2]) {
      return h('div', { class: 'x-date-picker-date-row' }, cols)
    },
  },
  render () {
    const week = 7
    const chilren = []

    let day = (this.beforeMonthLastDay + 0) % week // 0 为星期偏移量
    let cols = []

    while (day--) cols.push(this._renderDate())

    for (let date = 1; date <= this.daysInMonth; date++) {
      cols.push(this._renderDate(date))

      if (cols.length === week) {
        chilren.push(this._renderRow(cols))
        cols = []
      }
    }

    let surplusDay = week - cols.length
    while (surplusDay--) cols.push(this._renderDate())
    if (cols.length !== 0) chilren.push(this._renderRow(cols))

    return h('div', {
      class: {
        'x-date-picker-date': true,
        // large: this.large,
        small: this.small,
        rounded: this.rounded,
      }
    }, chilren)
  }
})

export default DatePickerDate