import { defineComponent, h } from "vue";
import Icon from "../Icon"

enum IconPos {
  Prefix,
  Suffix,
  PrefixOuter,
  SuffixOuter
}

const Input = defineComponent({
  name: "x-input",
  props: {
    label: String,
    labelRemove: Boolean,
    active: Boolean,
    outlined: Boolean,
    filled: Boolean,
    prefixIcon: String,
    prefixOuterIcon: String,
    suffixIcon: String,
    suffixOuterIcon: String,
    onClick: Function,
  },
  data() {
    return {

    };
  },
  computed: {
    labelClasses(): object {
      return {
        "x-label": true,
        _remove: this.labelRemove,
        _active: this.active,
      };
    },
    inputClasses(): object {
      return {
        "x-input": true,
        "text-blue": this.active,
        _underline: !this.outlined,
        _outlined: this.outlined,
        _filled: this.filled,
        _active: this.active,
      };
    },
    legendStyle(): object {
      return { width: this.active ? "44px" : "0px" };
    },
  },
  methods: {
    handleClick() {
      console.log('button click')
      this.$emit('click')
    },
    _renderIcon (pos: IconPos) {
      switch (pos) {
        case IconPos.Prefix:
          return h(Icon, { type: this.prefixIcon, class: 'prefix-icon'  })
        case IconPos.Suffix:
          return h(Icon, { type: this.suffixIcon, class: 'suffix-icon' })
        case IconPos.PrefixOuter:
          return h(Icon, { type: this.prefixOuterIcon, class: 'prefix-outer-icon' })
        case IconPos.SuffixOuter:
          return h(Icon, { type: this.suffixOuterIcon, class: 'suffix-outer-icon' })
      }
    },
    _renderFieldset () {
      return h('fieldset', [h('legend', { style: this.legendStyle })])
    },
    _renderLabel () {
      return h('label', { class: this.labelClasses }, this.label)
    },
    _renderSlot () {
      const slot = this.$slots.default
      const children = [this._renderLabel(), slot && slot()]

      return h('div', { class: 'x-input--slot' }, children)
    },
    _renderError () {
      return h('div', { class: 'x-input--bottom' }, '')
    },
    _renderContent () {
      const children = [this._renderSlot()]

      if (this.outlined) {
        children.unshift(this._renderFieldset())
      }
      if (this.prefixIcon) {
        children.unshift(this._renderIcon(IconPos.Prefix))
      }
      if (this.suffixIcon) {
        children.push(this._renderIcon(IconPos.Suffix))
      }

      return h('div', { class: 'x-input--content' }, children)
    },
    _renderControl () {
      return h('div', { class: 'x-input--control' }, [this._renderContent(), this._renderError()])
    },
  },
  render() {
    const children = [this._renderControl()]
    if (this.prefixOuterIcon) {
      children.unshift(this._renderIcon(IconPos.PrefixOuter))
    }

    if (this.suffixOuterIcon) {
      children.push(this._renderIcon(IconPos.SuffixOuter))
    }

    return h('div', {
      class: this.inputClasses,
      onClick: this.handleClick,
    }, children)

    return (
      <div class="input">
        <Icon />
        <div class="control">
          <div class="content">
            <Icon />
            <fieldset><legend></legend></fieldset>
            <div class="slot">
              <label></label>
              <slot></slot>
            </div>
            <Icon />
          </div>
          <div class="error">
            error
          </div>
        </div>
        <Icon />
      </div>
    )
  },
});

export default Input;
