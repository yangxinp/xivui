import { readonly, ref } from 'vue'

const size = ref({ width: -1, height: -1 })

const _size = readonly(size) // type lost, try to upgrade the vue

export function getScrollBarSize(fresh?: boolean) {
  if (fresh || size.value.width < 0 || size.value.height < 0) {
    const inner = document.createElement('div')
    const outer = document.createElement('div')
  
    inner.style.width = '100%'
    inner.style.height = '100%'
  
    outer.style.width = '100px'
    outer.style.height = '100px'
    outer.style.overflow = 'scroll'
    outer.style.pointerEvents = 'none'
    outer.style.visibility = 'hidden'
    outer.style.position = 'absolute'
  
    outer.appendChild(inner)
    document.body.appendChild(outer)
  
    size.value = {
      width: outer.offsetWidth - inner.offsetWidth,
      height: outer.offsetHeight - inner.offsetHeight
    }
  }

  return _size
}

