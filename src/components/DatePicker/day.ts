import { defineComponent, h } from 'vue'

const DatePickerDay = defineComponent({
  name: 'x-date-picker-day',
  props: {
    small: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    classes () : object {
      return {
        'x-date-picker-day': true,
        small: this.small
      }
    }
  },
  render () {
    return h('div', { class: this.classes }, [
      h('div', { class: 'x-date-picker-day-item' }, '一'),
      h('div', { class: 'x-date-picker-day-item' }, '二'),
      h('div', { class: 'x-date-picker-day-item' }, '三'),
      h('div', { class: 'x-date-picker-day-item' }, '四'),
      h('div', { class: 'x-date-picker-day-item' }, '五'),
      h('div', { class: 'x-date-picker-day-item' }, '六'),
      h('div', { class: 'x-date-picker-day-item' }, '日'),
    ])
  }
})

export default DatePickerDay