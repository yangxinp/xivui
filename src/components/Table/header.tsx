import { VNode, defineComponent, h, PropType, ref, watch, computed, shallowRef, watchEffect } from 'vue'
import { TableStoreDefualt, TableColumnData, FilterOption } from './_store'
import { unitOn } from '../../utils'
import { getScrollBarSize } from '../../utils/scrollbar-size'
import Icon from '../Icon'
import { Colgroup } from './colgroup'
import { CellRender } from './cell'
import { usePopper } from '../../compositions/popper'
import Overlay from '../_Overlay'
import { List, ListItem } from '../List'

// todo: extract
const Menu = defineComponent({
  emits: ['input'],

  props: {
    value: {
      type: Array as PropType<FilterOption[]>,
      default: () => []
    },
    options: {
      type: Array as PropType<FilterOption[]>,
      default: () => []
    },
  },

  setup(props, { emit, slots }) {
    const overlayRef = ref<InstanceType<typeof Overlay>>()

    const activetorRef = shallowRef<HTMLElement>()
    const contentRef = shallowRef<HTMLElement>()

    const { contentStyle, initPosition } = usePopper({
      contentEle: contentRef,
      activatorEle: activetorRef
    })

    const menu = ref(false)
    const iValue = ref<FilterOption[]>([])

    watch(() => overlayRef.value?.contentRef, (v) => contentRef.value = v)
    watch(() => props.value, () => menu.value && initPosition())
    watchEffect(() => iValue.value = [...props.value])

    function handleClick() {
      menu.value = true
    }

    function clickOutsideHandler() {
      menu.value = false
      
      emit('input', [...iValue.value])
    } 

    function isActive(item: FilterOption) {
      return iValue.value.findIndex(val => val === item || val.value === item.value)
    }

    function selected(item: FilterOption, idx?: number, activeIdx?: number) {
      if (activeIdx === undefined) activeIdx = isActive(item)

      const duplicate = [...iValue.value]
      if (activeIdx > -1) {
        duplicate.splice(activeIdx, 1)
      } else {
        duplicate.push(item)
      }
      iValue.value = duplicate
    }

    const _renderList = () => {
      return h(List, { small: true }, () => {
        if (!props.options.length) return [h(ListItem, { disabled: true }, 'no-data')]

        return props.options.map((item, idx) => {
          const activeIdx = isActive(item)

          return h(ListItem, {
            active: activeIdx > -1,
            onClick: () => selected(item, idx, activeIdx)
          }, () => item.label)
        })
      })
    }

    const _renderMenu = () => {
      return h(Overlay, {
        class: ['x-menu', 'text-black', 'white'],
        active: menu.value,
        style: contentStyle.value,
        absolute: true,
        clickOutside: {
          handler: clickOutsideHandler,
          include: () => activetorRef.value ? [activetorRef.value] : []
        },
        ref: overlayRef
      }, _renderList)
    }

    const _renderActivetor = () => {
      return h('span', { ref: activetorRef }, slots.default?.({ handleClick, menu }))
    }

    return () => {
      return [
        _renderActivetor(),
        _renderMenu()
      ]
    }
  }
})

const TableHeader = defineComponent({
  emits: ['sorter', 'filter'],

  name: 'x-table-header',

  props: {
    owned: Boolean,
    store: {
      type: Object as PropType<TableStoreDefualt>,
      required: true
    },
  },

  setup(props, { emit }) {
    const scrollBarSize = getScrollBarSize()
    const headerWrapper = ref<HTMLElement>()

    const { owned, store } = props
    const { columns, offset, scrollingX, scrollingY, columnsFixed } = store

    const repaired = computed(() => owned && scrollingY.value)

    if (store && owned) {
      watch(() => offset.value.left, (v) => {
        if (!headerWrapper.value) return
        headerWrapper.value.scrollLeft = v
      })
    }

    const onChangeSort = (column: TableColumnData) => {
      // todo: multiple sorder
      if (!column.sorter) return

      // clear before order
      store.sortedRule.forEach(item => {
        if (column !== item) item.order = undefined
      })
      store.sortedRule.clear()

      switch (column.order) {
        case 'ascend':
          column.order = 'descend'
          store.sortedRule.add(column)
          break
        case 'descend':
          column.order = undefined
          store.sortedRule.delete(column)
          break
        default:
          column.order = 'ascend'
          store.sortedRule.add(column)
      }

      column.sorter === 'remote' ? emit('sorter') : store.updateDataBySort()
    }

    const onChangeFilter = (column: TableColumnData, value: FilterOption[]) => {
      column.filterVal = value

      if (value && value.length) {
        store.filteredRule.add(column)
      } else {
        store.filteredRule.delete(column)
      }
      
      column.filter === 'remote' ? emit('filter') : store.updateDateByFilter()
    }

    const _renderSorterTrigger = (column: TableColumnData) => {
      return h(Icon, {
        class: ['x-table-icon', column.order],
        type: 'arrow-up',
        onClick: () => onChangeSort(column)
      })
    }

    const _renderFilterTrigger = (column: TableColumnData) => {
      return h(Menu, {
        value: column.filterVal,
        options: column.filters,
        onInput: (value) => onChangeFilter(column, value)
      }, {
        default: ({ handleClick, menu } : any) => {
          const hasFilter = !!column.filterVal?.length

          return h(Icon, {
            type: hasFilter ? 'filter': 'filter-outline',
            style: { fontSize: '14px' },
            class: ['x-table-icon', { active: menu.value || hasFilter }],
            onClick: handleClick
          })
        }
      })
    }

    const _renderColumnHeader = (column: TableColumnData) => {
      return h('span', [
        column.label,
        column.sorter ? _renderSorterTrigger(column) : undefined,
        column.filter ? _renderFilterTrigger(column) : undefined
      ])
    }

    const _renderTHead = () => {
      const shimRight = repaired.value ? scrollBarSize.value.width : 0

      const ths = columns.value.map((column, idx) => {
        const renderHeader = column.renderHeader ?? _renderColumnHeader
        const { side, offset } = columnsFixed.value[idx] ?? {}

        return CellRender({
          tag: 'th',
          column,
          side,
          offset: scrollingX.value ? offset : undefined,
          shimRight,
          children: renderHeader(column),
        })
      })

      if (repaired.value) {
        ths.push(h('th', { style: ['padding: 0', scrollingX.value ? 'position: sticky; right: 0px;' : ''] }))
      }

      return h('thead', { class: 'x-table-header' }, h('tr', ths))
    }

    // here is operation that body have vertical scrollbar in two table situation
    // -> every col -> min-width: 100px (default)
    // -> set last col -> min-width: 17 and width: 17
    // -> header table wrapper -> overflow: hidden
    //    body table wrapper -> overflow: auto
    const _renderWrapper = (container: VNode) => {
      const table = h('table', { class: 'x-table' }, [
        h(Colgroup, {
          columns: columns.value,
          auto: !store.data.value.length
        }, {
          default: () => {
            if (repaired.value) {
              return h('col', { style: { width: unitOn(scrollBarSize.value.width) } })
            }
          }
        }),
        container,
      ])
      
      return h('div', { class: 'x-table-wrapper-header', ref: headerWrapper }, table)
    }

    return () => owned ? _renderWrapper(_renderTHead()) : _renderTHead()
  }
})

export default TableHeader