import { defineComponent, h, TransitionGroup } from 'vue'

const Picker = defineComponent({
  name: 'x-picker',
  props: {
    landscape: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
    }
  },
  data () {
    return {
      // bodyWidth: -1,
      // bodyHeight: -1
    }
  },
  setup () {
    return {
      // bodyNode: null as null | HTMLElement
    }
  },
  computed: {
    // bodyStyles () : object {
    //   const style : { [key: string] : any } = {}
    //   if (this.bodyHeight > 0) style.height = this.bodyHeight + 'px'
    //   if (this.bodyWidth > 0) style.width = this.bodyWidth + 'px'
    //   return style
    // }
  },
  mounted () {
    // if (this.bodyNode) {
    //   const observer = new ResizeObserver((e) => {
    //     console.log(e)
    //     if (!this.bodyNode) {
    //       this.bodyWidth = -1
    //       this.bodyHeight = -1
    //       return
    //     }
    //     this.bodyWidth = this.bodyNode.clientWidth
    //     this.bodyHeight = this.bodyNode.clientHeight
    //   })
  
    //   observer.observe(this.bodyNode)
    // }
  },
  methods: {
    _renderTitle () {
      return h('div', { class: "x-picker-title black" }, this.$slots.title?.())
    },
    _renderBody () {
      // const view = h('div', {
      //   ref: (e) => this.bodyNode = e as HTMLElement
      // }, h(TransitionGroup, { name: 'fade-transition', duration: 10000 }, () => this.$slots.body?.()))

      return h('div', {
        class: "x-picker-body white",
        style: {
          width: typeof this.width === 'number' ? this.width + 'px' : undefined
        },
      }, this.$slots.body?.())
    },
  },
  render () {
    return h('div', {
      class: {
        "x-picker": true,
        "landscape": this.landscape
      }
    }, [
      this._renderTitle(),
      this._renderBody(),
    ])

    return (
      <div class="picker">
        <div class="title"></div>
        <div class="body"></div>
      </div>
    );
  }
})

export default Picker
