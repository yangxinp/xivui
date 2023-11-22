import { ExtractPropTypes, PropType, defineComponent, h, inject, onBeforeUnmount, Slots, watch, watchEffect } from 'vue'
import { TABLE_STORE_KEY, TableColumnData, FilterOption, Fixed, Align } from './_store'
import { unitOff } from '../../utils'
import Icon from '../Icon'
import Button from '../Button'

export type TableColumnPropsTypes = Partial<ExtractPropTypes<typeof TableColumnProps>>

export const defaultSorter = (prev: any, next: any, prop: string) => {
  return prev[prop] - next[prop]
}

export const defaultFilter = (source: any, prop: string, filters: FilterOption[]) => {
  return filters.map(item => item.value).indexOf(source[prop]) > -1
}

export const defaultRenderCell: TableColumnData['renderCell'] = ({ source, prop, data, column }) => {
  return h('div', { class: ['cell', { ellipsis: column.ellipsis }] }, source[prop])
}

export const defaultRenderExpandTrigger: TableColumnData['renderCell'] = ({ source, prop, data, column }) => {
  return h(Button, {
    text: true,
    circle: true,
    onClick: () => data.expand = !data.expand
  }, h(Icon, { type: data.expand ? 'chevron-down': 'chevron-right' }))
}

export const defaultRenderExpand: TableColumnData['renderExpand'] = (source) => {
  return h('span')
}

export const defaultRenderHeader: TableColumnData['renderHeader'] = (column) => {
  return h('span', {}, [
    column.label,
    column.sorter ? h(Icon, { class: column.order, type: 'arrow-up' }) : undefined,
    column.filter ? h(Icon, { type: 'filter-outline' }) : undefined
  ])
}

export const TableColumnProps = {
  label: String,
  prop: String,
  align: String as PropType<Align>,
  type: String,
  width: [String, Number],
  minWidth: {
    type: [String, Number],
    default: '80px'
  },
  maxWidth: [String, Number],
  ellipsis: Boolean,
  fixed: {
    type: [Boolean, String] as PropType<boolean | Fixed>,
    default: false
  },
  // sortOrder: String as PropType<Order>,
  sorter: [Boolean, String, Function],
  filters: [Array, Boolean] as PropType<FilterOption[] | boolean>,
  filter: [Boolean, String, Function]
}

export function createTableColumnData(props: TableColumnPropsTypes, slots: Slots) : TableColumnData {
  if (!props.prop) console.warn('column prop required')

  const store = inject(TABLE_STORE_KEY)

  const isExpand = props.type === 'expand'

  const renderCell = isExpand
    ? slots.expand ?? slots[`expand.${props.prop}`] ?? defaultRenderExpandTrigger
    : slots.default ?? slots[`cell.${props.prop}`] ?? defaultRenderCell

  const renderHeader = slots.header ?? slots[`header.${props.prop}`]

  const renderExpand = isExpand ? slots.default ?? defaultRenderExpand : undefined

  const column: TableColumnData = {
    id: Symbol(),
    label: props.label || '',
    prop: props.prop || '',
    type: props.type,
    align: props.align,
    width: unitOff(props.width),
    minWidth: unitOff(props.minWidth) || 80,
    maxWidth: unitOff(props.maxWidth),
    realWidth: -1,
    filters: Array.isArray(props.filters) ? props.filters : undefined,
    ellipsis: props.ellipsis || false,
    renderCell,
    renderHeader,
    renderExpand,
  }

  // fixed
  if (typeof props.fixed === 'boolean') {
    column.fixed = props.fixed ? 'left' : undefined
  } else {
    column.fixed = props.fixed
  }

  // sorter
  if (typeof props.sorter === 'string') {
    column.sorter = 'remote'
  } else if(typeof props.sorter === 'function') {
    column.sorter = props.sorter
  } else if (props.sorter === true) {
    column.sorter = defaultSorter
  }

  // filter
  if (typeof props.filter === 'string') {
    column.filter = 'remote'
  } else if(typeof props.filter === 'function') {
    column.filter = props.filter
  } else if (props.filter === true) {
    column.filter = defaultFilter
  }

  watchEffect(() => {
    if (!store || !column.filter) return column.filters = undefined
    // open filter
    if (Array.isArray(props.filters)) {
      column.filters = props.filters
    } else {
      const set = new Set<any>()

      store._data.value.forEach((item) => {
        set.add(item.source[column.prop])
      })

      column.filters = [...set].map(value => ({ label: value, value }))
    }
  })

  return column
}

export const TableColumn = defineComponent({
  name: 'x-table-column',

  emits: ['change'],
  props: TableColumnProps,

  setup(props, { slots }) {
    const store = inject(TABLE_STORE_KEY)

    if (!store) {
      console.warn('store of parent table do not found!')
      return
    }

    const column = createTableColumnData(props, slots)
    
    store._columns.value.push(column)

    watch([props, slots], () => {
      Object.assign(column, createTableColumnData(props, slots), { id: column.id })
    })

    onBeforeUnmount(() => {
      const idx = store._columns.value.indexOf(column)
      if (idx > -1) store._columns.value.splice(idx, 1)
    })
  },

  render() {
    return h('div')
  }
})