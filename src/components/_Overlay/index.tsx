import {
  defineComponent,
  h,
  Transition,
  withDirectives,
  vShow,
  Teleport,
  ref,
  shallowRef,
  watch,
  PropType,
} from "vue";
import ClickOutside, { ClickOutsideBindingValue } from "../../directives/click-outside";
import { makeComponentProps } from "../../compositions/component";

const Overlay = defineComponent({
  name: "Overlay",

  props: {
    active: Boolean,
    scrim: Boolean,
    absolute: Boolean,
    scrimTransition: {
      type: String,
      default: 'fade-transition'
    },
    contentTransition: {
      type: String,
      default: 'fade-transition'
    },
    clickOutside: {
      type: [Function, Object] as PropType<ClickOutsideBindingValue>,
      default: () => ({})
    },
    ...makeComponentProps(),
  },

  setup(props, { slots }) {
    const rendered = ref(false)
    const scrimRef = ref<HTMLDivElement>()
    const contentRef = ref<HTMLDivElement>()
    const teleportTarget = shallowRef(document.body)

    watch(() => props.active, () => rendered.value = true)

    const __renderScrim = () => {
      const scrim = h("div", { class: "x-scrim", ref: scrimRef });
      return withDirectives(scrim, [[vShow, props.active]]);
    }
    const _renderScrim = () => {
      if (!props.scrimTransition) return __renderScrim()
      return h(Transition, { name: props.scrimTransition, appear: true }, __renderScrim);
    }

    const __renderContent = () => {
      const content = h("div", {
          class: ["x-overlay--content", props.class],
          style: props.style,
          ref: contentRef
        }, slots.default?.()
      );

      return withDirectives(content, [
        [vShow, props.active],
        [ClickOutside, props.clickOutside],
      ]);
    }

    const _renderContent = () => {
      if (!props.contentTransition) return __renderContent()
      return h(Transition, { name: props.contentTransition, appear: true }, __renderContent);
    }

    return {
      scrimRef,
      contentRef,
      render: () => {
        return h(Teleport, { to: teleportTarget.value }, h("div", {
          class: ["x-overlay", { 'x-overlay--absolute': props.absolute }]
        }, [
          rendered.value && props.scrim ? _renderScrim() : undefined,
          rendered.value ? _renderContent() : undefined,
        ]));

        return (
          <Teleport to={ teleportTarget.value }>
            <div class="overlay">
              <div class="scrim"></div>
              <slot></slot>
            </div>
          </Teleport>
        );
      }
    }
  },

  render() {
    return this.render()
  }
});

export default Overlay;
