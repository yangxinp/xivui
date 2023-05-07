import { defineComponent, h, ref, InjectionKey, CSSProperties, onMounted, onUnmounted, withDirectives, vShow, Transition } from "vue"
import { Ripple } from "../../directives/ripple"
import Icon from "../Icon"

export const TabsKey: InjectionKey<InstanceType<typeof Tabs>> = Symbol()

// BUG: emits: ['xx'] && this.$nextTick()
// https://github.com/vuejs/vue-next/pull/3608

// TIP: 看看是否能用纯 css 实现让 ink 等元素一起过渡位置
// 两侧留白间距
const BLANK = 52

const Tabs = defineComponent({
  emits: ['update:value'],
  name: 'x-tabs',
  props: {
    value: [String, Number],
    // 是否固定选项
    fixed: Boolean,
    // 激活项居中
    centered: Boolean,
    // 显示方向前后按钮
    showArrows: Boolean,
  },
  setup (props, ctx) {
    const tabsRef = ref<HTMLElement[]>([])
    const wrapperRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)

    const wrapperRect = ref({ width: 0, height: 0})
    const contentRect = ref({ width: 0, height: 0 })

    const observe = new ResizeObserver(() => {
      const wrapper = wrapperRef.value
      const content = contentRef.value

      wrapperRect.value = {
        width: wrapper ? wrapper.clientWidth : 0,
        height: wrapper ? wrapper.clientWidth : 0
      }
      contentRect.value = {
        width: content ? content.clientWidth : 0,
        height: content ? content.clientHeight : 0
      }
    })

    onMounted(() => {
      if (wrapperRef.value) observe.observe(wrapperRef.value)
      if (contentRef.value) observe.observe(contentRef.value)
    })

    onUnmounted(() => {
      observe.disconnect()
    })

    return { tabsRef, wrapperRef, contentRef, wrapperRect, contentRect }
  },
  data () {
    return {
      inkWidth: 0,
      inkOffset: 0,
      contentOffset: 0,
    }
  },
  provide() {
    return { [TabsKey as symbol]: this }
  },
  created() {
    // TIP: 不建议使用。provide 和 inject 启用依赖注入。这两者只能在使用当前活动实例的 setup() 期间被调用
    // https://v3.cn.vuejs.org/api/composition-api.html#provide-inject
    // provide(TabsKey, this)
  },
  watch: {
    value () {
      this.updateView()
    },
    wrapperRect () {
      this.updateView()
    },
    contentRect () {
      this.updateView()
    }
  },
  computed: {
    wrapperRealWidth () : number {
      return this.realWidthInWrapper(this.wrapperRect.width)
    },
    contentRealWidth () : number {
      return this.realWidthInContent(this.contentRect.width)
    },
    isOverflow () : boolean {
      if (this.contentRect.width == null || this.wrapperRect.width == null) {
        return false
      } else {
        return this.contentRect.width > this.wrapperRect.width
      }
    },
    offsetMax () : number {
      if (this.contentRect.width == null || this.wrapperRect.width == null) return 0
      return Math.max(this.contentRealWidth - this.wrapperRect.width, 0)
    },
    inkStyles () : CSSProperties {
      return {
        left: this.inkOffset + 'px',
        width: this.inkWidth + 'px',
      }
    },
    contentStyles () : CSSProperties  {
      const margin = this.isOverflow ? BLANK + 'px' : undefined

      return {
        marginLeft: margin,
        marginRight: margin,
        transform: `translateX(-${this.contentOffset}px)`
      }
    },
  },
  methods: {
    normalizeOffset (offset: number) {
      return Math.max(Math.min(offset, this.offsetMax), 0)
    },
    realOffsetInContent (offset: number) {
      // 内容溢出时，content 里的 offset 需要加上最左边的 margin
      return this.isOverflow ? BLANK + offset : offset
    },
    realWidthInWrapper (width: number) {
      // 内容溢出时，两边加上的 margin 默认未不可见。
      return this.isOverflow ? 2 * BLANK - width : width
    },
    realWidthInContent (width: number) {
      // 内容溢出时，两边加上的 margin 需要加在长度上。因为 margin 是不计算在 width 和 offset 里的。
      return this.isOverflow ? 2 * BLANK + width : width
    },
    prev () {
      this.contentOffset = this.normalizeOffset(this.contentOffset + this.wrapperRealWidth)
    },
    next () {
      this.contentOffset = this.normalizeOffset(this.contentOffset - this.wrapperRealWidth)
    },
    register (e: HTMLElement) {
      return this.tabsRef.push(e)
    },
    unregister (e: HTMLElement) {
      const idx = this.tabsRef.indexOf(e)
      if (idx > -1) {
        this.tabsRef.splice(idx, 1)
      }
    },
    updateVal (value: string | number) {
      this.$emit("update:value", value)
    },
    updateView () {
      const activeTabIdx = this.tabsRef.findIndex(ele => ele.dataset.value == this.value)

      // 未选中
      if (activeTabIdx === -1) {
        this.contentOffset = this.normalizeOffset(this.contentOffset)
        this.inkWidth = 0
        return
      }

      const activeTab = this.tabsRef[activeTabIdx]

      // ink 位置更新
      this.inkWidth = activeTab.clientWidth
      this.inkOffset = activeTab.offsetLeft

      // 激活项是否居中显示
      if (this.centered) {
        const centerOffset = (activeTab.clientWidth + this.wrapperRealWidth) / 2 + activeTab.offsetLeft 
        this.contentOffset = this.normalizeOffset(centerOffset)
        return
      }

      // 选中第一个
      if (activeTabIdx === 0) {
        this.contentOffset = 0
        return
      }

      // 选中最后一个
      if (activeTabIdx === this.tabsRef.length - 1) {
        this.contentOffset = this.offsetMax
        return
      }

      // 其他情况
      // 1. 如果前一个没有显示在 wrapper 里，则多位移前面一个元素的宽度
      // 2. 如果后一个没有显示在 wrapper 里，则少位移后面一个元素的宽度
      const prevTab = this.tabsRef[activeTabIdx - 1]
      const nextTab = this.tabsRef[activeTabIdx + 1]
      const prevTabOffset = this.realOffsetInContent(prevTab.offsetLeft)
      const nextTabOffset = this.realOffsetInContent(nextTab.offsetLeft)

      // 1.
      if (prevTabOffset < this.contentOffset) {
        this.contentOffset = this.normalizeOffset(prevTabOffset)
      }

      // 2.
      const nextTabVisibleMinOffset = nextTabOffset + nextTab.clientWidth - this.wrapperRect.width
      if (nextTabVisibleMinOffset > this.contentOffset) {
        this.contentOffset = this.normalizeOffset(nextTabVisibleMinOffset)
      }
    },
    _renderPrev () {
      return h(Transition, { name: 'fade-transition' }, () => {
        const button = h('div', { class: 'x-tabs-prev', onClick: this.prev }, h(Icon, { type: "chevron-left" }))
        return withDirectives(button, [[Ripple], [vShow, this.isOverflow && this.showArrows]])
      })
    },
    _renderNext () {
      return h(Transition, { name: 'fade-transition' }, () => {
        const button = h('div', { class: 'x-tabs-next', onClick: this.next }, h(Icon, { type: "chevron-right" }))
        return withDirectives(button, [[Ripple], [vShow, this.isOverflow && this.showArrows]])
      })
    },
    _renderInk () {
      return h('div', { class: 'x-tabs-ink', style: this.inkStyles })
    },
    _renderContent () {
      const slot = this.$slots.default?.() ?? []

      return h('div', {
        class: 'x-tabs-content',
        style: this.contentStyles,
        ref: 'contentRef'
      }, [this._renderInk(), ...slot])
    },
    _renderWrapper () {
      return h('div', { class: 'x-tabs-wrapper', ref: 'wrapperRef' }, [
        this._renderContent()
      ])
    },
  },
  render () {
    const classes = {
      'fixed': this.fixed,
      'is-overflow': this.isOverflow
    }

    return h('div', { class: ['x-tabs', classes] }, [
      this._renderPrev(),
      this._renderWrapper(),
      this._renderNext(),
    ])
  }
})

export default Tabs