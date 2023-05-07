import { defineComponent, h } from 'vue'
import Button from '../Button'

const Dictionaries = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

const DatePickerMonth = defineComponent({
  name: 'x-date-picker-month',
  methods: {
    _renderTBody () {
      const trs = []
      const row = 3
      const col = 12 / row

      for (let c = 0; c < col; c++) {
        const start = c * row
        const tds = []
        for (let r = 0; r < row; r++) {
          const idx = start + r
          const label = Dictionaries[idx]
          tds.push(h('td', 
          {
            style: 'width: 33.33333%',
          },
          h(Button, {
            text: false,
            rounded: true,
            style: {
              width: '100%'
            },
          }, () => label)))
        }
        trs.push(h('tr', tds))
      }

      return h('tbody', trs)
    },
  },
  render () {
    const table = h('table', this._renderTBody())
    return h('div', { class: "x-date-picker-month" }, table)
  }
})

export default DatePickerMonth