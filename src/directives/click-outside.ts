import { DirectiveBinding, ObjectDirective } from "vue"

export interface ClickOutsideBindingArgs {
  handler: (e: Event) => void
  include?: () => HTMLElement[]
}

export type ClickOutsideBindingValue = (() => void) | ClickOutsideBindingArgs

function directive(e: Event, el: HTMLElement, binding: DirectiveBinding<ClickOutsideBindingValue>) {
  // 如果是当前元素，则不执行
  const elements = ((typeof binding.value === 'object' && binding.value.include) || (() => []))()
  elements.push(el)

  if (elements.some((_) => _.contains(e.target as Node))) return

  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler

  // 如果是绑定元素外的元素，则执行
  handler(e)
}

const ClickOutside: ObjectDirective<HTMLElement> = {
  // 在插入时安装
  mounted (el, binding) {
    const onMouseUp = (e: Event) => directive(e, el, binding)
    el._clickOutside = onMouseUp
    document.addEventListener('mouseup', onMouseUp)
  },
  // 解绑
  beforeUnmount(el) {
    if (!el._clickOutside) return

    document.removeEventListener('mouseup', el._clickOutside)
    delete el._clickOutside
  }
}

export default ClickOutside