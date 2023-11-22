import { PropType, computed, defineComponent, h, provide, toRefs, watchEffect, withDirectives } from 'vue'
import TableHeader from './header'
import TableBody, { TableLayout, allowTableLayout } from './body'
import { Colgroup } from './colgroup'
import { TableStore, TABLE_STORE_KEY } from './_store'
import Scroll, { ScrollBindingValue } from '../../directives/scroll'
import Resize, { ResizeBindingValue } from '../../directives/resize'
import { TableColumn, TableColumnPropsTypes, createTableColumnData } from './column'
import AnimationFrame from '../../utils/animation'


export { TableColumn as TableColumn }

export const Table = defineComponent({
  emits: ['change'],
  
  name: 'x-table',

  props: {
    columns: {
      type: Array as PropType<TableColumnPropsTypes[]>,
      default: () => ([])
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => ([])
    },
    loading: Boolean,
    border: Boolean,
    dense: Boolean,
    ellipsis: Boolean,
    maxHeight: [String, Number], // default: auto
    width: [String, Number], // default: auto
    layout: {
      type: String as PropType<TableLayout>,
      default: allowTableLayout[1]
    },
    hideHeader: Boolean, // -> body
    fixedHeader: Boolean, // fixed header -> twice piece -> header & body
  },
  setup(props, { slots, emit }) {
    const animation = new AnimationFrame()

    const store = new TableStore()
    provide(TABLE_STORE_KEY, store)

    const { data } = toRefs(props)

    // watch(() => data.value, callback) or watch(data, callback)  -> data.push() x
    // watch(data.value, callback) -> data = [...] x
    watchEffect(() => {
      store.setData(data.value) // item.xx change -> no callback -> perfect
    })

    watchEffect(() => {
      store._columns.value = props.columns.map(item => {
        return createTableColumnData(item, slots)
      })
    })

    const classes = computed(() => {
      return [
        'x-table-wrapper',
        props.border ? 'x-table-border' : '',
        store.scrollingX ? 'x-table-scrolling-' + store.scrollingX.value : ''
      ]
    })

    const styles = computed(() => {
      return {
        width: props.width,
        maxHeight: props.maxHeight
      }
    })

    const onChange = () => {
      emit('change', store.sortedRule, store.filteredRule)
    }

    const _redner = () => {
      /**
       * <table> = <warpper>[<colgroup>, <thead>, <tbody>]
       * <table> = <warpper>[<warpper>[<header>], <warpper>[<body>]]
       * */ 

      const container = [
        // Ought to render instance instead of variable that function return
        // const variable = slots.default?.() <- TableColumn
        h('div', { style: 'display: none;' }, slots.default?.()),
        !props.hideHeader ? h(TableHeader, { owned: props.fixedHeader, store, onSorter: onChange, onFilter: onChange }) : undefined,
        h(TableBody, { owned: props.fixedHeader, store, loading: props.loading, layout: props.layout }),
      ]

      if (props.fixedHeader) {
        return h('div', { class: classes.value, style: styles.value }, container)
      } else {
        container.splice(1, 0, h(Colgroup, { columns: store.columns.value, auto: props.layout === 'auto' }))

        const table = h('div', {
          style: styles.value,
          class: [...classes.value, 'x-table-wrapper-scroll'],
        },  h('table', { class: ['x-table', { auto: props.layout === 'auto' }] }, container))

        const onScroll: ScrollBindingValue = (_, el) => {
          animation.request(() => {
            store.updateOffset(el)
            store.updateScrollingXY(el) // depend update width
            store.updateColumnsFixed()
            store.updateColumnsRealWidth(el.clientWidth) // depend scroll
          })
        }
  
        return withDirectives(table, [[Scroll, onScroll], [Resize, onScroll]])
      }
    }

    return { store, _redner }
  },

  render() {
    return this._redner()
  }
})