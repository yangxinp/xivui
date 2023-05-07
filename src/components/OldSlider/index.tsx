import { defineComponent, h, VNode, } from 'vue'
import AnimationFrame from './../../utils/animation'

function GetNumber (val: any, def?: number) {
  return typeof val === 'number' ? val : (def ?? 0)
}

const Slider = defineComponent({
  name: 'x-old-slider',
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
      default: 200,
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
      trackNode: null as null | HTMLElement,
      trackWidth: 0,
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
        return GetNumber(start, def)
      } else {
        return GetNumber(this.value, def)
      }
    },
    end () : number {
      const def = this.max

      if (this.range) {
        if (!Array.isArray(this.value)) return def
        const end = Math.max(...this.value as number[])
        return GetNumber(end, def)
      } else {
        return def
      }
    },
    length () : number {
      return this.max - this.min
    }
  },
  created () {

  },
  methods: {
    onThumbMouseDown (e: MouseEvent) {
      if (!this.trackNode) throw new Error('未正确渲染函数')
      this.trackWidth = this.trackNode.clientWidth

      this.mouse = {
        pageX: e.pageX,
        pageY: e.pageY,
      }
      this.mousedownVal = {
        start: this.start,
        end: this.end
      }

      window.addEventListener('mousemove', this.onThumbMouseMove)
      window.addEventListener('mouseup', this.onThumbMouseUp)
    },
    onThumbMouseMove(e: MouseEvent) {
      if (!this.mousedown) return

      this.animation.request(() => {
        if (!this.mousedown) return

        const offsetX = e.pageX - this.mouse.pageX
        const offsetY = e.pageY - this.mouse.pageY
  
        const offsetVal = offsetX / this.trackWidth * this.length
  
        if (this.range) {
          const activeVal = this.mousedownVal[this.mousedown === 'start' ? 'start' : 'end']
          const val = Math.round(Math.min(this.max, Math.max(this.min, offsetVal + activeVal)))
  
          if (this.mousedown === 'start') {
            if (val >= this.mousedownVal.end) {
              this.active = 'end'
              this.$emit('update:value', [this.mousedownVal.end, val])
            } else {
              this.active = 'start'
              this.$emit('update:value', [val, this.mousedownVal.end])
            }
          } else {
            if (val <= this.mousedownVal.start) {
              this.active = 'start'
              this.$emit('update:value', [val, this.mousedownVal.start])
            } else {
              this.active = 'end'
              this.$emit('update:value', [this.mousedownVal.start, val])
            }
          }
        } else {
          const val = Math.min(this.max, Math.max(this.min, offsetVal + this.mousedownVal.start))
          this.$emit('update:value', Math.round(val))
        }
      })
    },
    onThumbMouseUp(e: MouseEvent) {
      this.mousedown = ''
      this.active = ''

      console.log('removeEventListener')
      window.removeEventListener('mousemove', this.onThumbMouseMove)
      window.removeEventListener('mouseup', this.onThumbMouseUp)
    },
    _renderTrackItem({ type, offset, scale } : { type: 'left' | 'center' | 'right', offset?: number, scale: number }) {
      return h('div', {
        class: { "x-old-slider--track": true },
        style: {
          'transform': (offset ? `translateX(${offset * 100}%) ` : '') + `scaleX(${scale})`,
          'transform-origin': `center ${type}`
        }
      })
    },
    _renderTrack() {
      const startRate = this.start / this.length

      const track = [this._renderTrackItem({ type: 'left', scale: startRate })]

      if (this.range) {
        const endRate = this.end / this.length
        const centerOffset = (startRate + endRate - 1) / 2
        track.push(this._renderTrackItem({ type: 'center', scale: endRate - startRate, offset: centerOffset }))
        track.push(this._renderTrackItem({ type: 'right', scale: 1 - endRate }))
      } else {
        track.push(this._renderTrackItem({ type: 'right', scale: 1 - startRate }))
      }

      return h('div', {
        class: { "x-old-slider--track-container": true },
        ref: (e) => { this.trackNode = e as HTMLElement } 
      }, track)
    },
    _renderTickItem () {
      return h('div', { class: { 'x-old-slider--tick': true } })
    },
    _renderTick() {
      const ticks: VNode[] = []

      return h('div', {
        class: {
          "x-old-slider--ticks-container": true
        }
      }, ticks)
    },
    _renderThumbItem (pre: number, type: 'start' | 'end', children: VNode[] | string) {
      const thumbLabel = h('div', { class: "x-old-slider--thumb-label" }, children)
      const thumbLabelContainer = h('div', { class: "x-old-slider--thumb-label-container" }, thumbLabel)
      const thumb = h('div', { class: "x-old-slider--thumb" })

      return h('div', {
        class: {
          "x-old-slider--thumb-container": true,
          [type]: true,
          'active': type === this.active,
        },
        style: {
          left: pre + '%'
        },
        onMouseDown: (e: MouseEvent) => {
          this.active = type
          this.mousedown = type
          this.onThumbMouseDown(e)
        },
      }, [thumb, thumbLabelContainer])
    },
    _renderThumb () {
      const thumb = [this._renderThumbItem(this.start / this.length * 100, 'start', this.start.toString())]

      if (this.range) {
        thumb.push(this._renderThumbItem(this.end / this.length * 100, 'end', this.end.toString()))
      }

      return thumb
    }
  },
  render() {
    return h('div', {
      class: {
        "x-old-slider": true
      }
    }, [
      this._renderTrack(),
      this._renderTick(),
      ...this._renderThumb(),
    ])

    return (
      <div class="slider">
        {/* <input></input> */}
        <div class="track-container">
          [<div class="track"></div>]
        </div>
        <div class="ticks-container">
          [<div class="tick"></div>]
        </div>
        [
          <div class="thumb-container">
            <div class="thumb">:after</div>
            <div class="thumb-label-container">
              <div class="thumb-label"></div>
            </div>
          </div>
        ]
      </div>
    )
  }
})

export default Slider