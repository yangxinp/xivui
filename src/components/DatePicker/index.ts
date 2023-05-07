import { computed, defineComponent, h, PropType, ref, Transition, mergeProps } from 'vue'
import Picker from '../Picker'
import Button from '../Button'
import DatePickerTitle from './title'
import DatePickerHeader from './header'
import DatePickerYear from './year'
import DatePickerMonth from './month'
import DatePickerDate from './date'
import DatePickerDay from './day'
import pad from './util/pad'
import { wrapInArray } from '../../utils'

const datestr = (year: number, month: number, date?: number) => {
  year = year + Math.floor(month / 12)
  month %= 12
  if (month < 0) {
    month += 12
    year--
  }

  return date == null ? `${year}-${pad(month + 1)}` : `${year}-${pad(month + 1)}-${pad(date)}`
}

const commonProps = {
  value: {
    type: Array as PropType<string[]>,
    required: true as true,
  },
  // 2020-01-01 或 2020-01。日如果省略，那么不约束日期
  max: {
    type: String,
    required: true as true,
  },
  // 2020-01-01 或 2020-01。日如果省略，那么不约束日期
  min: {
    type: String,
    required: true as true,
  },
  landscape: {
    type: Boolean,
    default: false,
  },
  range: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  desktop: {
    type: Boolean,
    default: false
  },
}

const DatePicker = defineComponent({
  emits: ['input', 'inputYear', 'inputMonth'],
  props: {
    ...commonProps,
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    prev: {
      type: Boolean,
      default: true,
    },
    next: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    arrVal () : string[] {
      return this.value ? Array.isArray(this.value) ? this.value : [this.value] : []
    },
    minYear () : number {
      return parseInt(this.min.split('-')[0])
    },
    maxYear () : number {
      return parseInt(this.max.split('-')[0])
    },
    iYear: {
      get () : number {
        return this.year
      },
      set (v : number) {
        this.$emit('inputYear', v)
      }
    },
    iMonth: {
      get () : number {
        return this.month
      },
      set (v: number) {
        this.$emit('inputMonth', v)
      }
    },
  },
  data () {
    return {
      selectYear: false,
    }
  },
  methods: {
    // emitYear (v: number) {
    //   this.$emit('inputYear', v)
    // },
    // emitMonth (v: number) {
    //   this.$emit('inputMonth', v)
    // },
    monthPrevClick () {
      let iMonth = this.iMonth - 1
      if (iMonth < 0) {
        iMonth = 11
        this.iYear = this.iYear - 1
      }
      this.iMonth = iMonth
    },
    monthNextClick () {
      let iMonth = this.iMonth + 1
      if (iMonth > 11) {
        iMonth = 0
        this.iYear = this.iYear + 1
      }
      this.iMonth = iMonth
    },
    yearClick (val: number) {
      this.iYear = val
      this.selectYear = false
    },
    dateClick (val: number) {
      const year = this.iYear
      const month = pad(this.iMonth + 1)
      const date = pad(val)
      const value = `${year}-${month}-${date}`

      if (this.range) {
        let copyVal = this.value.slice()
        if (copyVal.length === 1) {
          copyVal.push(value)
        } else {
          copyVal = [value]
        }
        this.$emit('input', copyVal)
      } else if (this.multiple) {
        const copyVal = this.value.slice()
        const findIdx = copyVal.indexOf(value)
        if (findIdx > -1) {
          copyVal.splice(findIdx, 1)
        } else {
          copyVal.push(value)
        }
        this.$emit('input', copyVal)
      } else {
        this.$emit('input', value)
      }
    },
    _renderTitle () {
      return h(DatePickerTitle, {
        key: 'data-picker-title',
        class: 'black',
        landscape: this.landscape,
        range: this.range,
        value: this.value,
      })
    },
    _renderHeader () {
      return h(DatePickerHeader, {
        key: 'date-picker-header',
        year: this.iYear,
        month: this.iMonth,
        min: this.min,
        max: this.max,
        prev: !this.selectYear,
        next: !this.selectYear,
        center: this.desktop && this.range,
        triggerActive: this.selectYear,
        onPrev: this.monthPrevClick,
        onNext: this.monthNextClick,
        onTrigger: () => this.selectYear = !this.selectYear,
      })
    },
    _renderDay () {
      return h(DatePickerDay, { key: 'date-picker-day', small: this.desktop })
    },
    _renderYear () {
      return h(DatePickerYear, {
        key: 'date-picker-year',
        small: this.desktop,
        min: this.minYear,
        max: this.maxYear,
        value: this.iYear,
        onInput: this.yearClick
      })
    },
    _renderDate () {
      return h(Transition, { mode: 'out-in', name: 'fade-transition' }, () => {
        return h(DatePickerDate, {
          key: `date-picker-date-${this.iYear}-${this.iMonth}`,
          small: this.desktop,
          year: this.iYear,
          month: this.iMonth,
          value: this.value,
          range: this.range,
          rounded: this.rounded,
          onInput: this.dateClick 
        })
      })
    },
    _renderFooter () {
      return h('div', { class: 'x-date-picker-footer' }, [
        h(Button, { text: true }, () => 'CANCEL'),
        h(Button, { text: true }, () => 'OK'),
      ])
    },
    _renderBody () {
      const children = [this._renderHeader()]

      children.push(h(Transition, { mode: 'out-in', name: 'fade-transition' }, () => {
        if (this.selectYear) {
          return this._renderYear()
        } else {
          return h('div', [this._renderDay(), this._renderDate()])
        }
      }))

      // children.push(this._renderFooter())

      return h('div', { class: 'x-date-picker-body' }, children)
    },
  },
  render () {
    const chilren = [this._renderBody()]

    if (!this.desktop) {
      chilren.unshift(this._renderTitle())
    }

    return h('div', {
      class: {
        "x-date-picker": true,
        "small": this.desktop,
        "landscape": this.landscape
      }
    }, chilren)
  }
})

export default defineComponent({
  name: 'x-date-picker',
  emits: ['input', 'update:value'],
  props: {
    ...commonProps,
    value: [String, Array] as PropType<string | string[]>,
    max: String,
    min: String,
  },
  setup (props, { emit }) {
    const iValue = computed({
      get () : string[] {
        return [...wrapInArray(props.value)].sort()
      },
      set (v : string[]) {
        if (!props.range && !props.multiple && v.length === 1) {
          emit('input', v[0])
          emit('update:value', v[0])
        } else {
          emit('input', v)
          emit('update:value', v)
        }
      }
    })

    const now = new Date().toLocaleDateString()
    const select = Array(props.range ? 2 : 1).fill(0).map((_, index) => {
      const [year, month] = (iValue.value[index] ?? now).split(/[-/]/)
      return { year: parseInt(year), month: parseInt(month) - 1 }
    })

    if (select.length === 2) {
      const [start, end] = select
      if (start.year === end.year && start.month && end.month) {
        const date = new Date(end.year, end.month + 1)
        end.year = date.getFullYear()
        end.month = date.getMonth()
      }
    }

    return { iValue, select: ref(select) }
  },
  methods: {
    emitValue (v: string) {
      console.log(v)
      this.$emit('input', v)
      this.$emit('update:value', v)
    }
  },
  render () {
    if (this.desktop && this.range) {
      const minYear = this.select[0].year - 20
      const maxYear = this.select[1].year + 20

      return h('div', { class: 'x-date-picker-range' }, [
        h(DatePicker, {
          ...this.$props,
          value: this.iValue,
          min: this.min ?? datestr(minYear, 0),
          max: datestr(this.select[1].year, this.select[1].month - 1),
          year: this.select[0].year,
          month: this.select[0].month,
          onInput: this.emitValue,
          onInputYear: (v: number) => this.select[0].year = v,
          onInputMonth: (v: number) => this.select[0].month = v,
        }),
        h(DatePicker, {
          ...this.$props,
          value: this.iValue,
          min: datestr(this.select[0].year, this.select[0].month + 1),
          max: this.max ?? datestr(maxYear, 0),
          year: this.select[1].year,
          month: this.select[1].month,
          onInput: this.emitValue,
          onInputYear: (v: number) => this.select[1].year = v,
          onInputMonth: (v: number) => this.select[1].month = v,
        }),
      ])
    } else {
      return h(DatePicker, {
        ...this.$props,
        value: this.iValue,
        min: this.min ?? datestr(this.select[0].year - 20, 0),
        max: this.max ?? datestr(this.select[0].year + 20, 0),
        year: this.select[0].year,
        month: this.select[0].month,
        onInput: this.emitValue,
        onInputYear: (v: number) => this.select[0].year = v,
        onInputMonth: (v: number) => this.select[0].month = v,
      })
    }
  }
})

// function addClass (e: Element, classes: string) {
//   if (!e.classList.contains(classes)) {
//     e.classList.add(classes)
//   }
// }

// function removeClass (e: Element, classes: string) {
//   e.classList.remove(classes)
// }

// function nextFrame(cb: () => void) {
//   requestAnimationFrame(() => {
//     requestAnimationFrame(cb)
//   })
// }

// const duration = 5000

// return h(TransitionGroup, {
//   name: 'date-picker-body',
//   // duration,
//   css: true,
//   // onBeforeEnter: (e) => {
//   //   addClass(e, 'date-picker-body-enter-from')
//   //   addClass(e, 'date-picker-body-enter-active')
//   // },
//   onBeforeLeave: (e) => {
//     // nextFrame(() => {
//       const rect = e.getBoundingClientRect()
//       console.dir(e)
//       console.log('rect', rect)
//       if (!e.parentElement) {
//         console.log('return')
//         return
//       }
//       console.log('pe', e.parentElement)
//       const parentRect = e.parentElement.getBoundingClientRect()
//       console.log('parentRect:', parentRect)
//       ;(e as HTMLElement).style.top = (rect.top - parentRect.top) + 'px'
//     // })
//   },
//   // onEnter: (e, done) => {
//   //   nextFrame(() => {
//   //     removeClass(e, 'date-picker-body-enter-from')
//   //     addClass(e, 'date-picker-body-enter-to')
//   //     setTimeout(done, duration)
//   //   })
//   // },
//   onLeave: (e, done) => {
//     console.log('onLeave:', e.className)
//     setTimeout(done, duration)
//     // const rect = e.getBoundingClientRect()
//     // console.dir(e)
//     // console.log('rect', rect)
//     // if (!e.parentElement) {
//     //   console.log('return')
//     //   return
//     // }
//     // console.log('pe', e.parentElement)
//     // const parentRect = e.parentElement.getBoundingClientRect()
//     // console.log('parentRect:', parentRect)
//     // ;(e as HTMLElement).style.top = (rect.top - parentRect.top) + 'px'

//     // addClass(e, 'date-picker-body-leave-from')
//     // addClass(e, 'date-picker-body-leave-active')
//     // nextFrame(() => {
//     //   removeClass(e, 'date-picker-body-leave-from')
//     //   addClass(e, 'date-picker-body-leave-to')
//     //   setTimeout(done, duration)
//     // })
//   },
//   // onAfterEnter (e) {
//   //   // e.classList.remove('date-picker-body-enter-active')
//   // },
//   // onAfterLeave (e) {
//   //   // e.classList.remove('date-picker-body-leave-active')
//   // },
// }, () => chilren)