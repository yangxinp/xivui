import { defineComponent, h, Transition, vShow, withDirectives } from 'vue'
import ClickOutside from '../../directives/click-outside'

const Dialog = defineComponent({
  name: 'x-dialog',

  props: {
    value: Boolean,
    title: String,
  },

  data() {
    return {
      rendered: false
    }
  },

  beforeMount() {
    // if (this.$refs.content) {
    //   document.documentElement.appendChild(this.$refs.content as HTMLElement)
    // }
  },

  mounted() {
    if (this.$el) {
      document.documentElement.appendChild(this.$el as HTMLElement)
    }
  },

  watch: {
    value (nval) {
      if (nval) this.rendered = true
    }
  },

  methods: {
    clickOutside() {
      this.$emit('update:value', false)
    },
    _renderHeader() {
      if (this.$slots.header) return this.$slots.header()

      return h('div', { class: "x-dialog-header" }, 'title')
    },
    _renderBody() {
      return h('div', { class: "x-dialog-body" }, this.$slots.default?.())
    },
    _renderFooter() {
      return h('div', { class: "x-dialog-footer" }, 'footer')
    },
    _renderDialog() {
      const dialog = h('div', { class: "x-dialog", ref: 'content' }, [
        this._renderHeader(),
        this._renderBody(),
        this._renderFooter()
      ])
      return h(Transition, {
        name: 'fade-transition',
        appear: true
      }, withDirectives(dialog, [
        [vShow, this.value],
        [ClickOutside, this.clickOutside]
      ]))
    },
    _renderScrim() {
      const scrim = h('div', { class: "x-scrim" })
      return h(Transition, {
        name: 'fade-transition',
        appear: true
      }, withDirectives(scrim, [[vShow, this.value]]))
    },
  },

  render() {
    return h('div', { class: "x-overlay" }, [
      this.rendered ? this._renderScrim() : undefined,
      this.rendered ? this._renderDialog() : undefined
    ])

    // return <div class="overlay">
    //   <div class="scrim"></div>
    //   <div class="dialog">
    //     <div class="header"></div>
    //     <div class="body"></div>
    //     <div class="footer"></div>
    //   </div>
    // </div>
  }
})

export default Dialog