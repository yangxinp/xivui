import { defineComponent, h, Transition, vShow, withDirectives } from 'vue'
import { Ripple } from '../../directives/ripple'
import AnimationFrame from './../../utils/animation'

enum Thumb {
  START = 'start',
  END = 'end'
}

function GetNumber (val: any, def?: number) {
  return typeof val === 'number' ? val : (def ?? 0)
}

// let _await: boolean = false
// let _callback: Function | undefined  = undefined

// function animation (callback?: Function) {
//   if (callback) _callback = callback
  
//   if (_await) return

//   if (!_await && _callback) {
//     _callback()
//     _callback = undefined
//     _await = true
//   }

//   setTimeout(() => {
//     if (_callback) animation()

//     _await = false
//   }, 1000 / 60)
// }

const Slider = defineComponent({
  name: 'x-slider',
  props: {
    value: {
      type: [Number, Array]
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 50,
    },
    range: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      // value: 0 as number | number[],
      elWidth: 0,
      active: '',
    }
  },
  setup() {
    return {
      mouse: { pageX: 0, pageY: 0 },
      mousedown: '',
      mousedownVal: { start: 0, end: 0 },
      animation: new AnimationFrame()
    }
  },
  computed: {
    start () : number {
      const def = this.min

      if (this.range) {
        if (!Array.isArray(this.value)) return def
        const start = Math.min(...this.value as number[])
        return Math.max(this.min, GetNumber(start, this.min))
      } else {
        return def
      }
    },
    end () : number {
      const def = this.max

      if (this.range) {
        if (!Array.isArray(this.value)) return def
        const end = Math.max(...this.value as number[])
        return Math.min(this.max, GetNumber(end, this.max))
      } else {
        return Math.min(this.max, GetNumber(this.value, def)) 
      }
    },
    startX () : number {
      return this.start / this.length * this.elWidth
    },
    endX () : number {
      return this.end / this.length * this.elWidth
    },
    length () : number {
      return this.max - this.min
    },
    showThumbLabel () : boolean {
      return Boolean(this.active)
    }
  },
  mounted () {
    const observe = new ResizeObserver((e) => {
      this.animation.request(() => {
        this.elWidth = (this.$el as HTMLElement).clientWidth
      })
    })
    observe.observe(this.$el)
  },
  beforeUnmount () {
    // observe 销毁
  },
  methods: {
    onThumbMouseDown (e: MouseEvent) {
      this.mouse = {
        pageX: e.pageX,
        pageY: e.pageY,
      }
      this.mousedownVal = {
        start: this.start,
        end: this.end
      }

      window.addEventListener('mousemove', this.onThumbMouseMove, { passive: true })
      window.addEventListener('mouseup', this.onThumbMouseUp, { passive: true, capture: true })
    },
    onThumbMouseMove (e: MouseEvent) {
      if (!this.mousedown) return
 
      this.animation.request(() => {
        if (!this.mousedown) return

        const offsetX = e.pageX - this.mouse.pageX
        // const offsetY = e.pageY - this.mouse.pageY
  
        const offsetVal = offsetX / this.elWidth * this.length
  
        if (this.range) {
          const activeVal = this.mousedownVal[this.mousedown === 'start' ? 'start' : 'end']
          const val = Math.round(Math.min(this.max, Math.max(this.min, offsetVal + activeVal)))
  
          if (this.mousedown === 'start') {
            if (val >= this.mousedownVal.end) {
              this.active = 'end'
              this.$emit('update:value', [this.mousedownVal.end, val])
              // this.value = [this.mousedownVal.end, val]
            } else {
              this.active = 'start'
              // this.value = [val, this.mousedownVal.end]
              this.$emit('update:value', [val, this.mousedownVal.end])
            }
          } else {
            if (val <= this.mousedownVal.start) {
              this.active = 'start'
              this.$emit('update:value', [val, this.mousedownVal.start])
              // this.value = [val, this.mousedownVal.start]
            } else {
              this.active = 'end'
              this.$emit('update:value', [this.mousedownVal.start, val])
              // this.value = [this.mousedownVal.start, val]
            }
          }
        } else {
          const val = Math.min(this.max, Math.max(this.min, offsetVal + this.mousedownVal.end))
          this.$emit('update:value', Math.round(val))
          // this.value = Math.round(val)
        }
      })
    },
    onThumbMouseUp (e: MouseEvent) {
      this.mousedown = ''
      this.active = ''

      console.log('removeEventListener')
      window.removeEventListener('mousemove', this.onThumbMouseMove)
      window.removeEventListener('mouseup', this.onThumbMouseUp)
    },
    _renderTrack () {
      const track = [
        h('div', { class: "x-slider--track-inactive" }),
        h('div', {
          class: "x-slider--track-active",
          style: {
            "left": (this.start / this.length * 100) + '%',
            "right": (1 - (this.end / this.length)) * 100 + '%',
          }
        }),
      ]
      
      return h('div', { class: 'x-slider--track' }, track)
    },
    // 拇指标签
    _renderThumbLabel (type: Thumb) {
      const value = type === Thumb.END ? this.end : this.start
      const slot =
        this.$slots['thumb-label'] ?
        this.$slots['thumb-label']({ value, type }) :
        h('span', value.toString())

      return h('div', { class: 'x-slider--thumb-label-box' }, [
        h('div', { class: 'x-slider--label' }, slot)
      ])
    },
    // 拇指
    _renderThumb (type: Thumb, offset: number) {
      const thumbKnob = h('div', { class: 'x-slider--thumb-knob' })
      const label = h(Transition, { name: 'fade' }, () => {
        return withDirectives(this._renderThumbLabel(type), [[vShow, this.showThumbLabel]])
      })

      const thumb = h('div', {
        class: 'x-slider--thumb',
        style: {
          "transform": `translateX(${offset}px)`
        },
        // TIP: onMouseDown 受Vue版本影响
        onMousedownPassive: (e: MouseEvent) => {
          this.active = type
          this.mousedown = type
          this.onThumbMouseDown(e)
        }
      }, [label, thumbKnob])

      return withDirectives(thumb, [[Ripple, { circle: true, center: true } as RippleOption]])
    }
  },
  render () {
    const thumbs = [this._renderThumb(Thumb.END, this.endX)]
    if (this.range) {
      thumbs.unshift(this._renderThumb(Thumb.START, this.startX))
    }

    return h('div', {
      class: 'x-slider'
    }, [
      this._renderTrack(),
      ...thumbs
    ])

    return (
      <div class="slider">
        {/* <input></input> */}
        <div class="track">
          <div class="track-inactive"></div>
          <div class="track-active"></div>
        </div>
        <div class="ticks">
          [<div class="tick"></div>]
        </div>
        [
          <div class="thumb">
            <div class="thumb-label-container">
              <div class="thumb-label"></div>
            </div>
            <div class="thumb-knob"></div>
          </div>
        ]
      </div>
    )
  }
})

export default Slider