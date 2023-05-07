import { defineComponent, h, inject, withDirectives } from "vue"
import { Ripple } from "../../directives/ripple";
import { TabsKey } from "./tabs"

export type TabIns = InstanceType<typeof Tab>

let uid = 0

const Tab = defineComponent({
  name: 'x-tab',
  props: {
    name: [String, Number]
  },
  setup () {
    return { tabs: inject(TabsKey) }
  },
  data () {
    return {
      id: uid++,
    }
  },
  computed: {
    isActive (): boolean {
      return this.tabs?.value === (this.name ?? this.id)
    }
  },
  mounted () {
    if (this.tabs) {
      this.tabs.register(this.$el)
    }
  },
  beforeUnmount () {
    this.tabs?.unregister(this.$el)
  },
  methods: {
    emitClick (e: PointerEvent) {
      // this.tabs?.updateTab(e)
      this.tabs?.updateVal(this.name ?? this.id)
    },
  },
  render () {
    const vnode = h('div', {
      class: "x-tab",
      'data-value': this.name ?? this.id,
      ariaSelected: this.isActive,
      onClick: this.emitClick
    }, this.$slots.default?.())

    return withDirectives(vnode, [[Ripple]])
  }
})

export default Tab