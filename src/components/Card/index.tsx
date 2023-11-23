import { defineComponent, h, Transition, PropType, computed, ref, watch, withDirectives, vShow } from 'vue'
import expand from '../transitions/expand'
import { unitOn } from '../../utils'
import ProgressLinear from '../ProgressLinear'

const allowTyps = ['elevated', 'tonal', 'outlined', 'flat'] as const

const Card = defineComponent({
  emits: ['click'],

  name: 'x-card',

  props: {
    loading: Boolean,
    width: [Number, String],
    minWidth: [Number, String],
    maxWidth: [Number, String],
    title: String,
    subtitle: String,
    content: String,
    media: String,
    hover: Boolean,
    expand: {
      type: Boolean,
      default: true
    },
    type: {
      type: String as PropType<typeof allowTyps[number]>,
      default: allowTyps[0]
    }
  },

  setup(props, { slots }) {
    const expandHookY = expand(true)

    const size = computed(() => {
      return {
        width: typeof props.width === 'number' ? unitOn(props.width) : props.width,
        minWidth: typeof props.minWidth === 'number' ? unitOn(props.minWidth) : props.minWidth,
        maxWidth: typeof props.maxWidth === 'number' ? unitOn(props.maxWidth) : props.maxWidth,
      }
    })

    // todo: extract to component
    const _renderDivider = () => h('hr', { class: 'x-divider' })

    const _renderProgressLinear = () => {
      return h(Transition, { ...expandHookY }, () => {
        if (props.loading) {
          return h('div', { class: 'x-card-progress-linear' }, h(ProgressLinear, { indeterminate: true }))
        }
      })
    }

    const _renderHeader = () => {
      const child = slots.header?.()

      if (!child) return

      return h('div', { class: 'x-card-header' }, child)
    }

    const _renderMedia = () => {
      const child = slots.media?.() ?? (props.media && h('img', { src: props.media }))

      if (!child) return

      return h('div', { class: 'x-card-media' }, child)
    }

    const _renderTitle = () => {
      const child = slots.title?.() ?? props.title

      if (!child) return

      return h('div', { class: 'x-card-title' }, child)
    }

    const _renderSubtitle = () => {
      const child = slots.subtitle?.() ?? props.subtitle

      if (!child) return

      return h('div', { class: 'x-card-subtitle' }, child)
    }

    const _renderContent = () => {
      const child = slots.default?.() ?? props.content

      if (!child) return

      return h('div', { class: 'x-card-content' }, child)
    }

    const _renderBody = () => {
      return h(Transition, { ...expandHookY }, () => {
        const body = h('div', { class: 'x-card-body' }, [
          _renderTitle(),
          _renderSubtitle(),
          _renderContent(),
          slots.footer ? _renderDivider() : undefined,
        ])
        
        return withDirectives(body, [[vShow, props.expand]])
      }) 
    }

    const _renderFooter = () => {
      const child = slots.footer?.()

      if (!child) return

      return h('div', { class: 'x-card-footer' }, child)
    }

    const _renderUnderlay = () => {
      return h('span', { class: 'x-card-underlay' })
    }

    return () => {
      return h('div', {
        class: ['x-card', `x-card--${props.type}`, { 'x-card--hover': props.hover }],
        style: size.value,
      }, [
        _renderProgressLinear(),
        _renderHeader(),
        _renderMedia(),
        _renderBody(),
        _renderFooter(),
        _renderUnderlay()
      ])

      return <div class="card">
        <div class="loading"></div>

        <slot>header</slot>
        
        <slot>media</slot>
        <div class="expand">
          <div class="title">title</div>
          <div class="subtitle">subtitle</div>
          content
        </div>

        <slot>footer</slot>

        <span class="underlay"></span>
      </div>
    }
  },
})

export default Card