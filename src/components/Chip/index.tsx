import { defineComponent, h, Transition, PropType } from 'vue'
import Icon from "../Icon"
import expand from '../transitions/expand'

const allowTyps = ['tonal', 'elevated', 'outlined', 'text'] as const

const Chip = defineComponent({
  emits: ['close'],

  name: 'x-chip',

  props: {
    // 大小
    size: String,
    // 前图标
    prependIcon: String,
    // 后图标
    appendIcon: String,
    // 禁用
    disabled: Boolean,
    // 关闭按钮
    closable: Boolean,
    // 类型
    type: {
      type: String as PropType<typeof allowTyps[number]>,
      default: allowTyps[0]
    }
  },

  setup() {
    return { expandHook: expand() }
  },

  data() {
    return {}
  },

  computed: {
    classes() {
      return {
        ['x-chip--' + this.type]: true
      }
    }
  },

  methods: {
    onClose(e: MouseEvent) {
      e.stopPropagation()
      this.$emit('close')
    },

    _renderUnderlay() {
      return h('span', { class: "x-chip--underlay" })
    },
    _renderPrepend() {
      if (this.$slots.prepend) return this.$slots.prepend()

      return h(Transition, { ...this.expandHook }, () => {
        // width: 50px
        if (this.prependIcon) return h('span', { class: "x-chip--prepend" }, h(Icon, { type: this.prependIcon }))
      })
    },
    _renderAppend() {
      if (this.$slots.append) return this.$slots.append()

      return h(Transition, { ...this.expandHook }, () => {
        if (this.appendIcon) return h(Icon, { class: "x-chip--append", type: this.appendIcon })
      }) 
    },
    _renderClose() {
      return h(Transition, { ...this.expandHook }, () => {
        if (this.closable) return h(Icon, { class: 'x-chip--close', type: 'close-circle', onClick: this.onClose  })
      })
    }
  },

  render() {
    return h('span', { class: ["x-chip", this.classes] }, [
      this._renderUnderlay(),
      this._renderPrepend(),
      this.$slots.default?.(),
      this._renderAppend(),
      this._renderClose(),
    ])

    return <span class="chip">
      <span class="underlay"></span>
      <span class="prepend"></span>
      content
      <span class="append"></span>
      <span class="close"></span>
    </span>
  }
})

export default Chip