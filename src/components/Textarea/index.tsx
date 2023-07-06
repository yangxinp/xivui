import { Transition, computed, defineComponent, h, nextTick } from "vue";
import Input, { makeInputProps } from "../Input";

const Textarea = defineComponent({
  emits: ['update:value'],
  name: "x-textarea",
  props: {
    value: String,
    rows: {
      type: Number,
      default: 5,
    },
    maxRows: Number,
    autoGrow: Boolean,
    placeholder: String,
    ...makeInputProps(),
  },
  data() {
    return {
      isFocus: false,
      slotHeight: NaN,
    };
  },
  computed: {
    maxLen() {
      return this.$attrs.maxlength
    },
    iDisabled() {
      return this.disabled || this.loading
    },
    error() : boolean {
      return !!this.value
    },
    message() : string {
      return this.error ? 'Required' : ''
    },
  },
  mounted() {
    this._calculateHeight()
  },
  watch: {
    value() {
      nextTick(() => {
        if (this.autoGrow) this._calculateHeight()
      })
    }
  },
  methods: {
    _calculateHeight() {
      const textarea = this.$refs.textarea as HTMLTextAreaElement
      const style = getComputedStyle(textarea)
      const line_height = parseFloat(style.lineHeight)

      let padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
      let min_height = -1
      let height: number | undefined
      let max_height = Infinity

      if (this.rows) min_height = line_height * this.rows + padding
      if (this.maxRows) max_height = line_height * this.maxRows + padding

      if (this.autoGrow) {
        const sizer = this.$refs.textarea_sizer as HTMLTextAreaElement
        height = sizer.scrollHeight
      }

      if (height) {
        this.slotHeight = Math.max(Math.min(height, max_height), min_height)
      } else {
        if (min_height > 0) this.slotHeight = min_height
      }
    },
    focus() {
      (this.$refs.input as HTMLInputElement)?.focus()
    },
    blur() {
      (this.$refs.input as HTMLInputElement)?.blur()
    },
    onFocus(e: FocusEvent) {
      console.log('onFocus')
      if (!this.disabled) this.isFocus = true
    },
    onBlur(e: FocusEvent) {
      console.log('onBlur')
      this.isFocus = false
    },
    onInput(e: InputEvent) {
      this.$emit('update:value', (e.target as HTMLInputElement).value)
    },
    handleClick() {
      this.focus()
    },
    handleClear() {
      this.$emit('update:value', '')
    },
    _renderConuter() {
      return h(Transition, { name: "slide-y-reverse-transition", appear: true }, () => {
        if (this.isFocus && this.maxLen && !this.iDisabled) {
          return h('div', { class: 'x-input--counter' }, `${this.value?.length ?? 0} / ${this.maxLen}`)
        }
      })
    },
    _renderInput () {
      return [
        h('textarea', {
          class: 'x-textarea',
          value: this.value,
          disabled: this.iDisabled,
          placeholder: this.placeholder,
          ...this.$attrs,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onInput: this.onInput,
          ref: 'textarea'
        }),
        h('textarea', {
          class: 'x-textarea _sizer',
          value: this.value,
          readonly: true,
          'aria-hidden': true,
          ...this.$attrs,
          ref: 'textarea_sizer'
        })
      ]
    },
  },
  render() {
    return h(
      Input,
      {
        moveLabel: this.isFocus || !!this.value || !!this.placeholder,
        active: this.isFocus,
        ...this.$props,
        style: { '--textarea-slot-height': this.slotHeight ? this.slotHeight + 'px' : undefined },
        disabled: this.iDisabled,
        clearable: this.clearable && !!this.value,
        error: this.error,
        message: this.message,
        onClick: this.handleClick,
        'onClick:clear': this.handleClear
      },
      { default: this._renderInput, details: this._renderConuter }
    );

    return (
      <Input>
        <textarea></textarea>
      </Input>
    );
  },
});

export default Textarea;
