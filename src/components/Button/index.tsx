import { defineComponent } from "vue";
import { Ripple } from "../../directives/ripple";
import { size } from "../../compositions/size";
import ProgressCircular from "../ProgressCircular";

// 94.4 78.2 64   48.7 35.5 min-width
// 52   44   36   28   20   height
// 20.8 17.6 14.4 11.2 8    padding
// 16   16   14   12   12   font-size

const Button = defineComponent({
  name: "x-button",
  directives: {
    Ripple,
  },
  props: {
    color: String,
    rounded: Boolean,
    circle: Boolean,
    text: Boolean,
    outlined: Boolean,
    disabled: Boolean,
    loading: Boolean,
    block: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
    ...size.prop,
  },
  setup(prop) {
    return { sizeClasses: size(prop) };
  },
  computed: {
    themeClasses(): object {
      if (!this.color) return {};
      const text = this.text || this.outlined;
      return {
        [this.color]: !text,
        "text-white": !text,
        ["text-" + this.color]: text,
      };
    },
    classes(): object {
      return {
        "x-button": true,
        // "elevation-2": true,
        rounded: this.rounded,
        outlined: this.outlined,
        disabled: this.disabled,
        loading: this.loading,
        circle: this.circle,
        text: this.text,
        block: this.block,
        ...this.sizeClasses,
        ...this.themeClasses,
      };
    },
  },
  render() {
    const loader = this.loading ? (
      <span class="x-button--loader">
        <ProgressCircular indeterminate />
      </span>
    ) : undefined;

    const Component = this.tag

    return (
      <Component
        v-ripple
        class={this.classes}
        disabled={this.disabled}
        {...this.$attrs}
      >
        <span class="x-button--container">
          {this.$slots.default && this.$slots.default()}
        </span>
        {loader}
      </Component>
    );
  },
});

export default Button;
