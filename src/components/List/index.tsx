import { computed, defineComponent, h, withDirectives } from "vue"
import { Ripple } from "../../directives/ripple"

export const ListItem = defineComponent({
  emits: {
    click: (e: MouseEvent) => true
  },

  props: {
    underline: Boolean,
    active: Boolean,
    disabled: Boolean,
  },

  setup(props, { slots, emit }) {
    const classes = computed(() => {
      return [
        'x-list-item',
        {
          'active': props.active,
          'disabled': props.disabled
        } 
      ]
    })

    function onClick(e: MouseEvent) {
      if (!props.disabled) emit('click', e)
    }

    function _render() {
      const el = h('div', {
        class: classes.value,
        onClick
      }, [
        h('span', { class: 'x-list-item_overlay' }),
        props.underline ? h('span', { class: 'x-list-item_underlay' }) : undefined,
        slots.default?.()
      ])

      return withDirectives(el, [[Ripple]])
    }

    return _render
  }
})

export const List = defineComponent({
  props: {
    small: Boolean
  },

  setup(props, { slots }) {
    function onFocusin (e: Event) {
      console.log(e)
    }

    function onFocusout (e: Event) {
      console.log(e)
    }

    function onFocus(e: Event) {
      console.log(e)
    }

    return () => h('div', {
      class: ['x-list', { 'x-list--small': props.small }],
      onFocusin,
      onFocusout,
      onFocus
    }, slots.default?.())
  }
})