import { defineComponent, h, withDirectives } from 'vue'
import { Ripple } from "../../directives/ripple"

const Radio = defineComponent({
  name: 'x-radio',
  data () {
    return {
      active: false
    }
  },
  props: {
    color: String,
    onClick: Function
  },
  methods: {
    handleClick () {
      console.log('radio click')
      this.active = !this.active
      this.$emit('click')
    },
    _renderCircle() {
      return h('div', {
        class: {
          "x-radio--circle": true,
          
          "active": this.active
        }
      })
    },
    _renderInput() {
      return h('input', { class: "x-radio--input" })
    },
    _renderRipple() {
      const VNode = h('div', { class: "x-radio--ripple" })
      return withDirectives(VNode, [[Ripple]])
    },
    _renderLabel() {
      return h('div', { class: "x-radio--label" }, 'Label')
    },
    _renderControl() {
      return h('div', {
        class: {
          "x-radio--control": true,
          [this.color ?? 'text-blue']: this.active,
        }
      }, [
        this._renderCircle(),
        this._renderInput(),
        this._renderRipple()
      ]) 
    }
  },
  render() {
    

    return h('div', {
      class: {
        "x-radio": true
      },
      onClick: this.handleClick,
    }, [
      this._renderControl(),
      this._renderLabel()
    ])
    return (
      <div class="radio">
        <div class="control">
          <div class="circle">::before</div>
          <input class="input"/>
          <div class="ripple"></div>
        </div>
        <label>label</label>
      </div>
    )
  }
})

export default Radio