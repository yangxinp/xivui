import { Transition, defineComponent, h } from "vue";
import Input, { makeInputProps } from "../Input";

const TextField = defineComponent({
  emits: ['update:value'],
  name: "x-text-field",
  props: {
    value: String,
    type: {
      type: String,
      default: 'text',
    },
    // multipleLine: Boolean, // input 多行
    placeholder: String,
    ...makeInputProps(),
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    maxLen() {
      return this.$attrs.maxlength
    },
    iDisabled() {
      return this.disabled
    },
    error() {
      return !!this.message
    },
    message() {
      return this.errorMessage
    },
  },
  methods: {
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
      return h('input', {
        class: 'x-text-field',
        type: this.type,
        value: this.value,
        disabled: this.iDisabled,
        placeholder: this.placeholder,
        ...this.$attrs,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onInput: this.onInput,
        ref: 'input'
      }, undefined)
    },
  },
  render() {
    return h(
      Input,
      {
        moveLabel: this.isFocus || !!this.value || !!this.placeholder,
        active: this.isFocus,
        ...this.$props,
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
        <input></input>
      </Input>
    );
  },
});

export default TextField;
