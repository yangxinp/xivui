import { defineComponent, h, Transition } from 'vue'
import Button from '../Button'
import Icon from '../Icon'
import pad from './util/pad'

const MONTH_NAME = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DatePickerHeader = defineComponent({
  name: 'x-date-picker-header',
  emits: ['trigger', 'next', 'prev'],
  props: {
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    max: String,
    min: String,
    // 居中模式
    center: {
      type: Boolean,
      default: false,
    },
    // 显示年份切换按钮
    trigger: {
      type: Boolean,
      default: true,
    },
    // 切换按钮激活
    triggerActive: {
      type: Boolean,
      default: false,
    },
    // 前按钮
    prev: {
      type: Boolean,
      default: true
    },
    // 后按钮
    next: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    maxWeights (): number | undefined {
      if (!this.max) return undefined
      const [year, month] = this.max.split('-')
      return parseInt(year) * 100 + parseInt(month)
    },
    minWeights (): number | undefined {
      if (!this.min) return undefined
      const [year, month] = this.min.split('-')
      return parseInt(year) * 100 + parseInt(month)
    },
    currentWeigths () : number {
      return this.year * 100 + this.month + 1
    },
    disabledPrev () {
      if (this.minWeights == null) return false
      return this.minWeights >= this.currentWeigths
    },
    disabledNext () {
      if (this.maxWeights == null) return false
      return this.maxWeights <= this.currentWeigths
    },
  },
  methods: {
    _renderLabel () {
      const label = `${MONTH_NAME[this.month]} ${this.year}`
      return h('span', { class: 'x-date-picker-header-label' }, label)
    },
    _renderTrigger () {
      return h(Button, {
        class: 'x-date-picker-header-button',
        circle: true,
        text: true,
        small: true,
        onClick: () => this.$emit('trigger')
      }, () => h(Icon, { class: {
        'x-date-picker-header-down': true,
        active: this.triggerActive,
      }, type: 'menu-down' }))
    },
    _renderPrev () {
      return h(Transition, { name: 'fade-transition' }, () => {
        if (!this.prev) return

        return h(Button, {
          class: 'x-date-picker-header-button',
          circle: true,
          text: true,
          small: true,
          disabled: this.disabledPrev,
          onClick: () => this.$emit('prev')
        }, () => h(Icon, { type: "chevron-left" }))
      })
    },
    _renderNext () {
      return h(Transition, { name: 'fade-transition' }, () => {
        if (!this.next) return

        return h(Button, {
          class: 'x-date-picker-header-button',
          circle: true,
          text: true,
          small: true,
          disabled: this.disabledNext,
          onClick: () => this.$emit('next')
        }, () => h(Icon, { type: "chevron-right" }))
      })
    },
  },
  render () {
    const chilren = []

    if (this.center) {
      const center = h('div', { class: 'x-date-picker-header-center' }, [
        this._renderLabel(),
        this.trigger ? this._renderTrigger() : undefined,
      ])
      chilren.push(
        this._renderPrev(),
        center,
        this._renderNext(),
      )
    } else {
      const before = h('div', { class: 'x-date-picker-header-before' }, [
        this._renderLabel(),
        this.trigger ? this._renderTrigger() : undefined,
      ])
      const after = h('div', { class: 'x-date-picker-header-after' }, [
        this._renderPrev(),
        this._renderNext(),
      ])
      chilren.push(before, after)
    }

    return h('div', {
      class: {
        'x-date-picker-header': true,
        center: this.center
      }
    }, chilren)
  }
})

export default DatePickerHeader