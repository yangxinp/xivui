import type { DirectiveBinding, ObjectDirective } from "vue"

export interface ResizeBindingArgs {
  handler: (e: ResizeObserverEntry, el: HTMLElement) => void
}

export type ResizeBindingValue = ResizeBindingArgs['handler'] | ResizeBindingArgs

const Resize: ObjectDirective<HTMLElement, ResizeBindingValue> = {
  // 在插入时安装
  mounted (el, binding) {
    if (!el || !binding.value) return

    const listener = typeof binding.value === 'function' ? binding.value : binding.value.handler

    const observer = new ResizeObserver((e) => {
      if (e.length) listener(e[0], el)
    })

    observer.observe(el)

    el._resizeObserver = observer
  },
  // 解绑
  beforeUnmount(el) {
    if (el._resizeObserver) {
      el._resizeObserver.disconnect()
      el._resizeObserver = undefined
    }
  }
}

export default Resize