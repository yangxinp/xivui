import { computed, defineComponent, ExtractPropTypes, h, onBeforeUnmount, onMounted, PropType, ref, TransitionGroup, VNodeChild } from "vue";
import Button from '../Button'
import Icon from "../Icon";

const allowVariants = ['elevation', 'tonal', 'outlined'] as const
type Variant = typeof allowVariants[number]

type SnackbarPropsType = Partial<ExtractPropTypes<typeof SnackbarProps>>

const SnackbarProps = {
  color: String,
  close: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'elevation'
  },
  rounded: Boolean,
  vertical: Boolean,
  duration: Number,
  maxWidth: [Number, String],
  minWidth: [Number, String]
}

const Snackbar = defineComponent({
  name: 'x-snackbar',

  emits: ['close'],

  props: SnackbarProps,

  setup(props, { emit, slots }) {
    const classes = computed(() => {
      const calc = [
        'x-snackbar',
        {
          'x-snackbar-rounded': props.rounded,
          'x-snackbar-vertical': props.vertical,
        }
      ]

      if (props.variant) calc.push('x-snackbar-' + props.variant)

      if (props.color) calc.push('text-' + props.color)

      return calc
    })

    let timer: number

    onMounted(() => {
      if (props.duration) {
        timer = setTimeout(() => {
          emit('close')
        }, props.duration)
      }
    })

    onBeforeUnmount(() => {
      if (timer) clearTimeout(timer)
    })

    const _renderDefaultClose = () => {
      return h(Button, {
        circle: true,
        text: true,
        onClick: () => emit('close'),
      }, h(Icon, { type: 'close' }))
    }

    const _renderContent = () => {
      return h('div', { class: 'x-snackbar-content' }, slots.default?.())
    }

    const _renderAction = () => {
      return h('div', { class: 'x-snackbar-action' }, (props.close && _renderDefaultClose()) || slots.action?.())
    }

    return () => {
      return h('div', { class: classes.value }, [
        _renderContent(),
        _renderAction(),
      ])
    }
  }
})

export type SnackbarsInstance = InstanceType<typeof Snackbars>

export interface SnackbarConfig extends Omit<SnackbarPropsType, 'close'> {
  key?: any
  close?: boolean | ((close: () => void) => any)
  content: string | number | (() => any)
}

export const Snackbars = defineComponent({
  name: 'x-snackbars',

  setup() {
    const bars = ref<SnackbarConfig[]>([])

    const add = (options: Partial<SnackbarConfig>) => {
      const current = {
        ...options,
        key: options.key ?? Symbol(),
        content: options.content ?? '',
      }

      bars.value.push(current)

      return { key: current.key, close: () => remove(current.key) }
    }

    const remove = (key: string) => {
      const idx = bars.value.findIndex(b => b.key === key)
      if (idx > -1) bars.value.splice(idx, 1)
    }

    const _renderBars = () => {
      return bars.value.map(item => {
        const _close = () => remove(item.key)
        const _renderClose = item.close

        const context = h(Snackbar, {
          ...item,
          content: undefined,
          close: item.close === true,
          onClose: _close,
        }, {
          default: () => {
            if (typeof item.content === 'function') {
              return item.content()
            } else {
              return item.content
            }
          },
          action: typeof _renderClose === 'function'
            ? () => _renderClose(_close)
            : undefined,
        })

        // 包一层，不影响 position
        return h('div', { key: item.key, class: 'x-snackbars-item' }, context)
      })
    }

    // https://github.com/vuejs/vue/issues/11654
    // https://github.com/vuejs/vue/issues/9713
    const _render = () => {
      return h(TransitionGroup, {
        tag: 'div',
        class: 'x-snackbars',
        name: "x-snackbars-transition",
        onBeforeLeave: (el) => {
          if (el instanceof HTMLElement) {
            const { marginTop, width, height} = window.getComputedStyle(el)

            el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`
            // el.style.right = '0px'
            el.style.width = width
            el.style.height = height
          }
        },
      }, () => _renderBars())
    }

    return { add, remove, _render }
  },

  render() {
    return this._render()
  }
})

export default Snackbar