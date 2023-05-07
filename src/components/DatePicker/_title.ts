import { defineComponent, h, PropType } from 'vue'
import pad from './util/pad'

interface DatePickerTitleVal {
  year?: number,
  month?: number,
  date?: number,
  day?: number,
  activeYear?: Boolean,
  activeMonth?: Boolean,
  activeDate?: Boolean,
  activeDay?: Boolean,
}

const Dictionaries = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]

const DatePickerTitle = defineComponent({
  name: 'x-date-picker-title',
  props: {
    // 横向
    landscape: {
      type: Boolean,
      default: false,
    },
    before: {
      type: Object as PropType<DatePickerTitleVal>,
    },
    after: {
      type: Object as PropType<DatePickerTitleVal>
    },
  },
  methods: {
    _renderTitleItem (val: DatePickerTitleVal, click: (handle: string) => void) {
      const yearNode = h('div', { 
        class: {
          'x-date-picker-title--above': true,
          'x-date-picker-title--btn': true,
          active: val.activeYear
        },
        onClick: () => click('year')
      }, val.year)

      const monthNode = h('span', {
        class: {
          'x-date-picker-title--btn': true,
          active: val.activeMonth
        },
        onClick: () => click('month')
      }, val.month && pad(val.month))

      const dateNode = h('span', {
        class: {
          'x-date-picker-title--btn': true,
          active: val.activeDate
        },
        onClick: () => click('date')
      }, val.date && pad(val.date))

      return h('div', { class: 'x-date-picker-title--clock' }, [
        yearNode,
        h('div', { class: 'x-date-picker-title--under' }, [
          monthNode,
          h('span', '/'),
          dateNode,
          h('span', Dictionaries[val.day ?? 1]),
        ]),
      ])
    },
    _renderTitleBefore () {
      if (!this.before) return
      return this._renderTitleItem(this.before, (handle) => this.$emit('before-click', handle))
    },
    _renderTitleAfter () {
      if (!this.after) return
      return this._renderTitleItem(this.after, (handle) => this.$emit('after-click', handle))
    }
  },
  render () {
    const chilren = [this._renderTitleBefore()]
    if (this.after) {
      chilren.push(this._renderTitleAfter())
    }

    return h('div', {
      class: {
        'x-date-picker-title': true,
        landscape: this.landscape,
        range: Boolean(this.after),
      }
    }, chilren)
  }
})

export default DatePickerTitle