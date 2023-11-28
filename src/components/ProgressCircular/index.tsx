import { defineComponent } from "vue";

// 固定半径，与样式 radius 统一
const Radius = 20;

const ProgressCircular = defineComponent({
  name: "x-progress-circular",
  props: {
    indeterminate: Boolean,
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
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    _size () : number {
      return this.size ?? 32
    },
    _width () : number {
      return this.width ?? 4
    },
    style(): object {
      if (!this.size) return {}
      return { 'font-size': this._size + 'px' }
    },
    classes(): object {
      return {
        "x-progress-circular": true,
        indeterminate: this.indeterminate,
      };
    },
    boxSize(): number {
      return (2 * Radius) / (1 - this._width / this._size);
    },
    circumference(): number {
      return 2 * Math.PI * Radius;
    },
    strokeWidth(): number {
      return (this.boxSize / this._size) * this._width;
    },
    strokeDashOffset(): number {
      if (this.indeterminate) return 0;
      return ((100 - this.value) / 100) * this.circumference;
    },
  },
  render() {
    const viewBox = `0 0 ${this.boxSize} ${this.boxSize}`;
    const center = this.boxSize / 2;

    const children = [
      this.indeterminate ? undefined : (
        <circle
          class="x-progress-circular--under"
          cx={center}
          cy={center}
          r={Radius}
          stroke-width={this.strokeWidth}
          stroke-dasharray={this.circumference}
          fill="transparent"
        ></circle>
      ),
      <circle
        class="x-progress-circular--upper"
        cx={center}
        cy={center}
        r={Radius}
        stroke-width={this.strokeWidth}
        stroke-dasharray={this.circumference}
        stroke-dashoffset={this.strokeDashOffset}
        fill="transparent"
      ></circle>,
    ];

    return (
      <svg style={this.style} class={this.classes} viewBox={viewBox}>
        {children}
      </svg>
    );
  },
});

export default ProgressCircular;
