import { defineComponent } from "vue";

const Icon = defineComponent({
  name: "x-icon",
  props: {
    type: String,
  },
  computed: {
    classes(): object {
      return {
        "x-icon": true,
        mdi: true,
        ["mdi-" + this.type]: true,
      };
    },
  },
  render() {
    return <i class={this.classes}></i>;
  },
});

export default Icon;
