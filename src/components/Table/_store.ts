import { Ref, ref, InjectionKey, ComputedRef, computed } from "vue";
import { getScrollBarSize } from "../../utils/scrollbar-size";

export type TableStoreDefualt = TableStore<any>
export type ScrollingState = 'top' | 'middle' | 'bottom' | undefined

export const allowFixed = ['left', 'right'] as const
export type Fixed = typeof allowFixed[number]

export const allowOrder = ['ascend', 'descend'] as const
export type Order = typeof allowOrder[number]

export const allowAlign = ['left', 'center', 'right'] as const
export type Align = typeof allowAlign[number]

export interface TableColumnFixedData {
  side: boolean;
  offset: number;
}

export interface FilterOption<T = any> {
  label: string
  value: T
}

export interface TableColumnData<T = any> {
  id: Symbol,
  label: string,
  prop: string,
  type?: string,
  align?: Align,
  // layout
  width?: number,
  minWidth: number,
  maxWidth?: number,
  realWidth: number,
  ellipsis: boolean
  fixed?: Fixed,
  // sort
  order?: Order,
  sorter?: Function | 'remote',
  // filter
  filters?: FilterOption[]
  filterVal?: FilterOption[],
  filter?: Function | 'remote',
  // content
  renderCell: (params: { source: T, prop: string, data: TableData, column: TableColumnData<T>}) => any
  renderHeader?: (column: TableColumnData<T>) => any
  renderExpand?: (source: T) => any
}

export interface TableData<T extends object = any> {
  source: T
  hide: boolean
  select: boolean
  expand: boolean
}

export interface Rule<T = any> {
  column: TableColumnData,
  value: T
}

export const TABLE_STORE_KEY: InjectionKey<TableStoreDefualt> = Symbol()

function calculateScrollingState(offset: number, viewport: number, content: number): ScrollingState {
  if (content <= viewport) return
  if (offset <= 0) return 'top'
  if (offset >= content - viewport) return 'bottom'
  return 'middle'
}

export class TableStore<T extends object = any> {
  _data: Ref<TableData<T>[]>
  _columns: Ref<TableColumnData<T>[]>

  data: Ref<TableData<T>[]>
  columns: ComputedRef<TableColumnData<T>[]>
  columnsFixed: Ref<TableColumnFixedData[]>

  sortedRule: Set<TableColumnData>
  filteredRule: Set<TableColumnData>

  offset: Ref<{ top: number; left: number }>
  scrollingX: Ref<ScrollingState>
  scrollingY: Ref<ScrollingState>

  constructor() {
    this._data = ref([])
    this._columns = ref([])

    this.data = ref([])
    this.offset = ref({ top: 0, left: 0 })

    this.columns = computed(() => {
      const top = [], middle = [], bottom = []

      for (const col of this._columns.value) {
        if (col.fixed === 'left') {
          top.push(col); continue;
        }
        if (col.fixed === 'right') {
          bottom.push(col); continue;
        }
        middle.push(col)
      }

      return [...top, ...middle, ...bottom]
    })

    this.columnsFixed = ref([])

    this.sortedRule = new Set()
    this.filteredRule = new Set()

    this.scrollingX = ref()
    this.scrollingY = ref()
  }

  setData(data: T[]) {
    this._data.value = data.map(item => {
      return {
        source: item,
        hide: false,
        select: false,
        expand: false
      }
    })

    this.data.value = [...this._data.value]

    if (this.sortedRule.size) {
      this.updateDataBySort()
    }

    if (this.filteredRule.size) {
      this.updateDateByFilter()
    }
  }

  updateDataBySort() {
    if (!this.sortedRule.size) {
      this.data.value = [...this._data.value]
      return
    }

    // todo: 假设只有一个，多余的条件后期实现 从后往前
    for (const col of this.sortedRule) {
      const { order, prop, sorter } = col

      if (!order) continue

      if (typeof sorter === 'function') {
        this.data.value.sort((a, b) => {
          const result = sorter(a.source, b.source, prop)
          return order === 'ascend' ? result : -result
        })
      }
    }
  }

  updateDateByFilter() {
    if (!this.filteredRule.size) {
      this.data.value.forEach(item => item.hide = false)
      return
    }

    for (const item of this.data.value) {
      let hide = false

      for (const column of this.filteredRule) {
        const { prop, filterVal, filter } = column
        if (!filterVal || !filterVal.length || typeof filter !== 'function') continue
        hide = !filter(item.source, prop, filterVal)
        if (hide) break
      }

      item.hide = hide
    }
  }

  updateOffset(ele: HTMLElement) {
    this.offset.value.top = ele.scrollTop
    this.offset.value.left = ele.scrollLeft
  }

  updateColumnsFixed() {
    const value: TableColumnFixedData[] = this.columns.value.map(_ => ({
      side: false,
      offset: -1
    }))

    let i = 0, left = 0, right = 0, length = this.columns.value.length;

    for (i = 0; i < length; i++) {
      const column = this.columns.value[i]

      if (column.fixed !== 'left') break
      value[i].offset = left
      left += column.realWidth
    }

    if (i > 0) value[i - 1].side = true

    for (i = length - 1; i >= 0; i--) {
      const column = this.columns.value[i]

      if (column.fixed !== 'right') break
      value[i].offset = right
      right += column.realWidth
    }

    if (i < length - 1) value[i + 1].side = true

    this.columnsFixed.value = value
  }

  updateColumnsRealWidth(width: number) {
    width-- // clientWidth 1.4 -> 1, 1.5 -> 2

    if (this.scrollingY.value) width -= getScrollBarSize().value.width

    let constWidth = 0
    let constMinWidth = 0
    let autoAmount = 0

    for (const item of this.columns.value) {
      if (item.width) {
        constWidth += item.width
      } else {
        constMinWidth += item.minWidth
        autoAmount ++
      }
    }

    let surplus = width - constWidth - constMinWidth

    if (surplus <= 0) {
      this.columns.value.forEach(item => {
        item.realWidth = item.width || item.minWidth
      })
      return
    }

    [...this.columns.value]
      .sort((a, b) => (b.maxWidth || 0) - (a.maxWidth || 0))
      .forEach((item) => {
        if (item.width) return item.realWidth = item.width

        let extraWidth = surplus / autoAmount

        if (item.maxWidth) {
          extraWidth = Math.min(item.maxWidth - item.minWidth, extraWidth)
        }

        item.realWidth = item.minWidth + extraWidth
        surplus -= extraWidth
        autoAmount --
      })
  }

  updateScrollingXY(ele: HTMLElement) {
    const {
      scrollTop, scrollLeft, scrollWidth, scrollHeight, clientWidth, clientHeight
    } = ele

    // predicted scrollingX
    if (!this.columns.value.some((item) => item.realWidth > 0)) {
      let surplus = clientWidth

      for (const item of this.columns.value) {
        if (item.width) {
          surplus -= item.width
        } else {
          surplus -= item.minWidth
        }
      }

      this.scrollingX.value = surplus < 0 ? 'top' : undefined
    } else {
      this.scrollingX.value = calculateScrollingState(scrollLeft, clientWidth, scrollWidth)
    }

    this.scrollingY.value = calculateScrollingState(scrollTop, clientHeight, scrollHeight)
  }
}