<template>
  <svg :style="style" :class="classes" :viewBox="`0 0 ${boxSize} ${boxSize}`">
    <circle
      v-if="!indeterminate"
      class="x-progress-cirular--under"
      :cx="center"
      :cy="center"
      :r="Radius"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      fill="transparent"
    ></circle>
    <circle
      class="x-progress-cirular--upper"
      :cx="center"
      :cy="center"
      :r="Radius"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="strokeDashOffset"
      fill="transparent"
    ></circle>
  </svg>
</template>

<script>
// 原项目是 index.tsx，这个文件是根据用 .vue 格式写的。内容几乎一样

export default {
  name: "x-progress-circular",
  props: {
    // 不确定状态，滚圈圈
    indeterminate: Boolean,
    // 暂时没用到，时间太久了，不知道要做啥功能了
    rotate: {
      type: Number,
      default: 0,
    },
    // 不赋值则根据当前字体大小调整
    size: {
      type: Number,
    },
    // 不赋值则根据当前字体大小调整
    width: {
      type: Number,
    },
    // 0 ~ 100
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    Radius() {
      return 20;
    },
    _size() {
      return this.size ?? 32;
    },
    _width() {
      return this.width ?? 4;
    },
    style() {
      if (!this.size) return {};
      return { "font-size": this._size + "px" };
    },
    classes() {
      return {
        "x-progress-cirular": true,
        indeterminate: this.indeterminate,
      };
    },
    boxSize() {
      return (2 * this.Radius) / (1 - this._width / this._size);
    },
    center() {
      return this.boxSize / 2;
    },
    circumference() {
      return 2 * Math.PI * this.Radius;
    },
    strokeWidth() {
      return (this.boxSize / this._size) * this._width;
    },
    strokeDashOffset() {
      if (this.indeterminate) return 0;
      return ((100 - this.value) / 100) * this.circumference;
    },
  },
};
</script>

<style lang="scss">
@use "sass:math" as math;

$__color: #757575;

.x-progress-cirular {
  width: 1em;
  height: 1em;
  &.indeterminate {
    animation: progress-cirular-rotate 2s linear infinite;
    .x-progress-cirular--upper {
      animation: progress-circular-dash 2s ease-in-out infinite;
    }
  }

  &--upper {
    stroke: currentColor;
    transition: stroke-dashoffset 0.6s ease-in-out;
  }

  &--under {
    stroke: $__color;
  }
}

@keyframes progress-circular-dash {
  $radius: 20;
  $circumference: 2 * math.$pi * $radius;

  from {
    stroke-dasharray: 1 $circumference;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: $circumference * 3 / 4 $circumference;
    stroke-dashoffset: -$circumference / 4;
  }

  to {
    stroke-dasharray: $circumference * 3 / 4 $circumference;
    stroke-dashoffset: -$circumference;
  }
}

@keyframes progress-cirular-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
