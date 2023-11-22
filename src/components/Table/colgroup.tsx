import { PropType, defineComponent, h } from 'vue'
import { TableColumnData } from './_store'
import { unitOn } from '../../utils'

export const Colgroup = defineComponent({
  props: {
    columns: {
      type: Array as PropType<TableColumnData[]>,
      required: true
    },
    auto: Boolean
  },

  setup(props, { slots }) {
    return () => {
      const auto = props.auto

      const cols = props.columns.map(column => {
        if (auto) {
          return h('col', {
            style: {
              width: unitOn(column.width),
              minWidth: unitOn(column.minWidth),
              maxWidth: unitOn(column.maxWidth)
            }
          })
        }

        return h('col', {
          style: {
            width: unitOn(column.realWidth),
          }
        })
      })

      if (slots.default) cols.push(...slots.default())

      return h('colgroup', cols)
    }
  }
})