import { PropType, VNode, defineComponent, h, withDirectives, Transition, computed, watch, ref } from 'vue'
import { TableStoreDefualt, TableData } from './_store'
import Resize, { ResizeBindingValue } from '../../directives/resize'
import Scroll, { ScrollBindingValue } from '../../directives/scroll'
import ProgressLinear from '../ProgressLinear'
import expand from '../transitions/expand'
import AnimationFrame from '../../utils/animation'
import { Colgroup } from './colgroup'
import { CellRender } from './cell'

export const allowTableLayout = ['auto', 'fixed'] as const
export type TableLayout = typeof allowTableLayout[number]

const TableBody = defineComponent({
  name: 'x-table-body',

  props: {
    owned: Boolean,
    loading: Boolean,
    store: {
      type: Object as PropType<TableStoreDefualt>,
      required: true
    },
    layout: {
      type: String as PropType<TableLayout>,
      default: allowTableLayout[1]
    }
  },

  setup(props) {
    const wrapperRef = ref<HTMLElement>()

    const { data, columns, columnsFixed, scrollingX } = props.store
    const visibleData = computed(() => data.value.filter(item => !item.hide))
    const expandHookY = expand(true)
    const animation = new AnimationFrame()
    
    watch(() => props.layout, () => {
      if (props.layout === 'fixed' && wrapperRef.value) {
        props.store.updateColumnsRealWidth(wrapperRef.value.clientWidth)
      }
    })

    const _renderProgressLinear = () => {
      return h('tr', { class: 'space-occupation' }, h('td', {
        style: 'padding: 0;',
        colspan: columns.value.length,
      }, h(Transition, { ...expandHookY }, () => {
        if (props.loading) return h(ProgressLinear, { indeterminate: true })
      }),))
    }

    // table-layout: auto -> sync width
    const _renderHiddenObserver = () => {
      return h('tr', { class: 'hidden-observer' }, columns.value.map((col, idx) => {
        const observer: ResizeBindingValue = (e) => {
          col.realWidth = e.borderBoxSize[0].inlineSize
        }

        return withDirectives(h('td'), [[Resize, observer]])
      }))
    }

    const _renderNoData = () => {
      return h('tr', h('td', { colspan: columns.value.length, class: 'no-data' }, 'No data'))
    }

    const _renderRow = (data: TableData) => {
      let _renderExpand!: Function
      
      const { source, expand } = data

      const row = [h('tr', columns.value.map((column, idx) => {
        const { prop, renderCell, renderExpand } = column
        const { side, offset } = columnsFixed.value[idx] ?? {}

        if (renderExpand) _renderExpand = renderExpand

        return CellRender({
          tag: 'td',
          column,
          side,
          offset: scrollingX.value ? offset : undefined,
          children: renderCell({ source, data, prop, column })
        })
      }))]

      if (_renderExpand && expand) {
        row.push(h('tr', h('td', { colspan: columns.value.length }, _renderExpand(source))))
      }

      return row
    }

    const _renderTBody = () => {
      return h('tbody', { class: 'x-table-body' }, [
        props.layout === 'auto' && props.owned ? _renderHiddenObserver() : undefined,
        _renderProgressLinear(),
        ...visibleData.value.reduce((acc: VNode[], data) => {
          return acc.concat(_renderRow(data))
        }, []),
        !visibleData.value.length ? _renderNoData() : undefined
      ])
    }

    const _renderWrapper = (container: VNode) => {
      // table-layout: fixed -> except seted width cell, average share remaining space (min-width amount)
      // table-layout: atuo  -> min-width -> √; width -> auto; max-width auto;
      //               min-width -> min-width
      //               width     -> min-width + width + max-width(td)
      //               max-width -> auto
      const wrapper = h('div', { class: 'x-table-wrapper-body', ref: wrapperRef }, h('table', {
        class: ['x-table', props.layout === 'auto' ? 'auto' : ''],
      }, [
        h(Colgroup, { columns: columns.value, auto: props.layout === 'auto' }),
        container,
      ]))

      const onScroll: ScrollBindingValue = (_, el) => {
        animation.request(() => {  
          props.store.updateOffset(el)
          props.store.updateScrollingXY(el)
          props.store.updateColumnsFixed()
          if (props.layout === 'fixed') {
            props.store.updateColumnsRealWidth(el.clientWidth)
          }
        })
      }

      return withDirectives(wrapper, [[Scroll, onScroll], [Resize, onScroll]])
    } 

    return () => props.owned ? _renderWrapper(_renderTBody()) : _renderTBody()
  }
})

export default TableBody