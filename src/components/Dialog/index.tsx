import { defineComponent, h, Transition, vShow, withDirectives } from "vue";
import ClickOutside from "../../directives/click-outside";
import Overlay from "../_Overlay";

const hasScrollbar = (el: Element) => {
  const style = window.getComputedStyle(el);

  return (
    (["auto", "scroll"].includes(style.overflowY) &&
      el.scrollHeight > el.clientHeight) ||
    (["auto", "scroll"].includes(style.overflowX) &&
      el.scrollWidth > el.clientWidth)
  );
};

const shouldScollbar = (el: Element, e: WheelEvent): boolean => {
  if (el === document.body || el === document.documentElement) return false;

  if (e.deltaY) {
    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;

    const alreadyAtStart = el.scrollTop === 0;
    // TIP: 有时候 clientHeight 会多出 1px
    const alreadyAtEnd = el.scrollTop + el.clientHeight === el.scrollHeight;

    if (scrollingUp && !alreadyAtStart) return true;
    if (scrollingDown && !alreadyAtEnd) return true;
  }

  if (e.deltaX) {
    const scrollingLeft = e.deltaX > 0;
    const scrollingRight = e.deltaX < 0;

    const alreadyAtStart = el.scrollLeft === 0;
    const alreadyAtEnd = el.scrollLeft + el.clientWidth === el.scrollWidth;

    if (scrollingLeft && !alreadyAtStart) return true;
    if (scrollingRight && !alreadyAtEnd) return true;
  }

  return el.parentElement ? shouldScollbar(el.parentElement, e) : false;
};

const isElementInside = (el: Element | null, parent: Element): Boolean => {
  if (!el || el === document.body) return false;
  if (el === parent) return true;
  return isElementInside(el.parentElement, parent);
};

const Dialog = defineComponent({
  name: "x-dialog",

  props: {
    // 显示
    value: Boolean,
    // 标题
    title: String,
    // 显示遮罩
    modal: {
      type: Boolean,
      default: true,
    },
    // 最大宽度
    width: String,
    // 点击外部和按下esc不会关闭
    persistent: Boolean,
  },

  data() {
    return {
      animate: false,
      _animateTimout: -1,
    };
  },

  computed: {
    styles() {
      return {
        width: this.width,
      };
    },
  },

  beforeMount() {
    // if (this.$refs.content) {
    //   document.documentElement.appendChild(this.$refs.content as HTMLElement)
    // }
  },

  watch: { 
    value(nval) {
      if (nval) {
        window.addEventListener("keydown", this.keyboardListener);
        window.addEventListener("wheel", this.scrollListener, { passive: false });
      } else {
        window.removeEventListener("keydown", this.keyboardListener);
        window.removeEventListener("wheel", this.scrollListener);
      }
    },
  },

  methods: {
    clickOutside() {
      if (!this.persistent) {
        this.$emit("update:value", false);
      } else {
        this.animateTip();
      }
    },
    animateTip() {
      this.animate = true;
      this.$nextTick(() => {
        window.clearTimeout(this._animateTimout);
        this._animateTimout = window.setTimeout(
          () => (this.animate = false),
          150
        );
      });
    },
    keyboardListener(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (!this.persistent) {
          this.$emit("update:value", false);
        } else {
          this.animateTip();
        }
      }
    },
    scrollListener(e: WheelEvent) {
      // 只允许鼠标在滚动条弹窗中滚动，并且弹窗没滚动到底和头
      const overlayRef = this.$refs.overlay as InstanceType<typeof Overlay>

      // 在外面滚动，直接阻止
      if (
        e.target === overlayRef?.scrimRef ||
        e.target === document.body ||
        !isElementInside(e.target as Element, overlayRef?.contentRef!)
      )
        return e.preventDefault();

      // 内部，没有滚动轴或到底就阻止
      const path = e.composedPath();

      for (let i = 0; i < path.length; i++) {
        const el = path[i] as Element;

        if (el === document.documentElement) return e.preventDefault();

        if (hasScrollbar(el)) {
          return !shouldScollbar(el, e) ? e.preventDefault() : undefined;
        }
      }
    },
    _renderHeader() {
      if (this.$slots.header) return this.$slots.header();
      if (this.title) return h("div", { class: "x-dialog-header" }, this.title);
    },
    _renderBody() {
      return h("div", { class: "x-dialog-body" }, this.$slots.default?.());
    },
    _renderFooter() {
      if (this.$slots.footer) {
        return h("div", { class: "x-dialog-footer" }, this.$slots.footer());
      }
    },
    _renderDialog() {
      return h(Transition, { name: "fade-transition", appear: true }, () => {
        const dialog = h(
          "div",
          {
            class: ["x-dialog", { "x-dialog--animated": this.animate }],
            style: this.styles,
            ref: "content",
          },
          [this._renderHeader(), this._renderBody(), this._renderFooter()]
        );

        return withDirectives(dialog, [
          [vShow, this.value],
          [ClickOutside, this.clickOutside],
        ]);
      });
    },
    _renderScrim() {
      return h(Transition, { name: "fade-transition", appear: true }, () => {
        const scrim = h("div", { class: "x-scrim", ref: "scrim" });

        return withDirectives(scrim, [[vShow, this.value]]);
      });
    },
  },

  render() {
    return h(Overlay, {
      active: this.value,
      scrim: this.modal,
      class: ["x-dialog", { "x-dialog--animated": this.animate }],
      style: this.styles,
      clickOutside: this.clickOutside,
      ref: 'overlay'
    }, () => [this._renderHeader(), this._renderBody(), this._renderFooter()])

    // return h("div", { class: "x-overlay" }, [
    //   this.rendered && this.modal ? this._renderScrim() : undefined,
    //   this.rendered ? this._renderDialog() : undefined,
    // ]);

    // return <div class="overlay">
    //   <div class="scrim"></div>
    //   <div class="dialog">
    //     <div class="header"></div>
    //     <div class="body"></div>
    //     <div class="footer"></div>
    //   </div>
    // </div>
  },
});

export default Dialog;
