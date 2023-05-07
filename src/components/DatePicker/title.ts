import { defineComponent, h, PropType, Transition } from 'vue'

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
    // 值
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    // 范围
    range: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    _renderTip () {
      return h('div', { class: 'x-date-picker-title--tip' }, this.range ? 'SELECTED RANGE' : 'SELECT DATE')
    },
    _renderClock (above: string, under: string) {
      return h('div', { class: 'x-date-picker-title--clock' }, [
        h('div', { class: 'x-date-picker-title--above' }, above),
        h('div', { class: 'x-date-picker-title--under' }, under),
      ])
    },
    _renderTitleItem (val: string) {
      const value = new Date(val) 
      const year = value.getFullYear()
      const month = value.getMonth() + 1
      const date = value.getDate()
      const day = value.getDay()

      return this._renderClock(year.toString(), `${month}月${date}日 ${Dictionaries[day]}`)
    },
    _renderBody () {
      return h(Transition, { mode: 'out-in', name: 'fade-transition' }, () => {
        let key
        const chilren = []

        if (!this.range && this.value.length >= 2) {
          key = 'x-date-picker-title--body-multiple'
          chilren.push(this._renderClock('', '已选择 ' + this.value.length + ' 天'))
        } else {
          key = 'x-date-picker-title--body-select'
          chilren.push(...this.value.map(this._renderTitleItem))
        }

        return h('div', { key, class: 'x-date-picker-title--body' }, chilren)
      })
    },
  },
  render () {
    return h('div', {
      class: {
        'x-date-picker-title': true,
        landscape: this.landscape,
        range: this.range,
      }
    }, [this._renderTip(), this._renderBody()])
  }
})

export default DatePickerTitle