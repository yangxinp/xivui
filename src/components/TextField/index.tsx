import { defineComponent, h } from "vue";
import Input from "../Input";

const TextField = defineComponent({
  name: "x-text-field",
  data() {
    return {
      remove: false,
      active: false,
    };
  },
  methods: {
    handleClick() {
      this.remove = !this.remove;
      this.active = !this.active;
    },
    _renderInput () {
      return h('input', {
        class: {
          'x-text-field': true
        }
      }, undefined)
    },
  },
  render() {
    return h(
      Input,
      {
        label: "Regular",
        labelRemove: this.remove,
        active: this.active,
        outlined: false,
        filled: true,
        prefixIcon: "account-circle",
        prefixOuterIcon: "account-circle",
        suffixIcon: "account-circle",
        suffixOuterIcon: "account-circle",
        onClick: this.handleClick,
      },
      { default: this._renderInput }
    );

    return (
      <Input>
        <input></input>
      </Input>
    );
  },
});

export default TextField;
