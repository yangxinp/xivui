import type { DirectiveBinding, ObjectDirective } from 'vue'

export interface ScrollBindingArgs {
  handler: (e: Event, el: HTMLElement) => void
}

export type ScrollBindingValue = ScrollBindingArgs['handler'] | ScrollBindingArgs


function directive(e: Event, el: HTMLElement, binding: DirectiveBinding<ScrollBindingValue>) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler

  handler(e, el)
}

const Scroll: ObjectDirective<HTMLElement, ScrollBindingValue> = {
  mounted(el, binding) {
    if (!el || !binding.value) return

    const onScroll = (e: Event) => directive(e, el, binding)

    el._scrollListener = onScroll
    el.addEventListener('scroll', onScroll)
  },

  beforeUnmount(el) {
    if (el._scrollListener) {
      el.removeEventListener('scroll', el._scrollListener)
      el._scrollListener = undefined
    }
  }
}

export default Scroll