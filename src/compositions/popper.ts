import { Ref, computed, nextTick, onBeforeMount, onBeforeUnmount, ref, watch } from "vue";
import AnimationFrame from "../utils/animation";

export interface PopperData {
  contentEle: Ref<HTMLElement | undefined>;
  activatorEle: Ref<HTMLElement | undefined>;
}

export interface PopperOption {
  inheritWidth?: boolean;
}

export function usePopper(data: PopperData, option?: PopperOption) {
  const top = ref(0);
  const left = ref(0);
  const bottom = ref(0);
  const activateWidth = ref(0);
  const inheritWidth = ref(option?.inheritWidth ?? false);

  const animation = new AnimationFrame();

  const contentStyle = computed(() => ({
    top: top.value ? `${top.value}px` : "",
    left: `${left.value}px`,
    bottom: bottom.value ? `${bottom.value}px` : "",
    minWidth: inheritWidth.value ? `${activateWidth.value}px` : "",
  }));

  const observe = new ResizeObserver(() => {
    initPosition();
  });

  // 位置初始化
  const _initPosition = () => {
    if (!data.activatorEle.value) {
      return console.warn('Current activatorEle does not exist, and the location cannot be initialized')
    }
    if (!data.contentEle.value) {
      return console.warn('Current contentEle does not exist, and the location cannot be initialized')
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const contentWidth = data.contentEle.value.clientWidth;
    const contentHeight = data.contentEle.value.clientHeight;

    const activateRect = data.activatorEle.value.getBoundingClientRect();

    // 计算垂直方向位置
    if (windowHeight - activateRect.bottom - 20 <= contentHeight) {
      // 上
      top.value = 0;
      bottom.value = windowHeight - activateRect.top - window.scrollY; // - window.scrollY -> x-overlay:absolute
    } else {
      // 下
      bottom.value = 0;
      top.value = activateRect.top + activateRect.height + window.scrollY; // + window.scrollY -> x-overlay:absolute
    }

    // 计算水平方向位置
    if (windowWidth - activateRect.left >= contentWidth) {
      // 右
      left.value = activateRect.left + window.scrollX;
    } else {
      // 左
      left.value = activateRect.right - contentWidth + window.scrollX;
    }

    activateWidth.value = activateRect.width;
  };

  function initPosition() {
    animation.request(_initPosition);
  }

  watch(data.contentEle, (nVal, oVal) => {
    if (oVal) observe.unobserve(oVal);
    if (nVal) observe.observe(nVal);
  });

  watch([data.activatorEle, data.contentEle], () => {
    nextTick(() => initPosition())
  })

  onBeforeMount(() => {
    initPosition();
  });

  onBeforeUnmount(() => {
    observe.disconnect();
    animation.cancel();
  });

  return {
    contentStyle,
    initPosition,
  };
}
