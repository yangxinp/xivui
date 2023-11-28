import { ObjectDirective } from 'vue'

const DURATION = 300

// 计算
function calculate (el: HTMLElement, e: MouseEvent, value: RippleOption) {
  const rect = el.getBoundingClientRect()
  const width = el.clientWidth
  const height = el.clientHeight

  let scale = 0.3
  let radius = 0
  if (value.circle) {
    scale = 0.15
    radius = width / 2
  } else {
    radius = Math.sqrt(width ** 2 + height ** 2) / 2
  }

  // const scale = 0.15
  // const radius = Math.sqrt(width ** 2 + height ** 2) / 2

  const localX = e.clientX - rect.left
  const localY = e.clientY - rect.top
  const centerX = (width / 2) - radius
  const centerY = (height / 2) - radius

  const x = value.center ? centerX : (localX - radius)
  const y = value.center ? centerY : (localY - radius)

  return { scale, radius, centerX, centerY, x, y }
}

// 水滴
function drip (this: HTMLElement, e: MouseEvent) {
  if (!this._ripple) return

  const container = document.createElement('span')
  const water = document.createElement('span')

  container.className = 'x-ripple--container'
  container.appendChild(water)

  const { scale, radius, centerX, centerY, x, y } = calculate(this, e, this._ripple)

  const size = radius * 2 + 'px'
  water.className = 'x-ripple--water'
  water.style.width = size
  water.style.height = size
  water.style.transform = `translate(${x}px, ${y}px) scale3d(${scale}, ${scale}, ${scale})`
  water.style.opacity = '0'
  water.classList.add('enter')

  this.appendChild(container)

  // static 会影响定位-水波纹的扩散位置
  const computed = window.getComputedStyle(this)
  if (computed && computed.position === 'static') {
    this.style.position = 'relative'
    this.dataset.previousPosition = 'static'
  }

  water.dataset.time = String(Date.now())

  setTimeout(() => {
    water.classList.remove('enter')
    water.classList.add('in')
    water.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`
    water.style.opacity = '0.25'
  }, 0)
}

// 消除
function evaporate (this: HTMLElement, e: MouseEvent) {
  const ripples = this.getElementsByClassName('x-ripple--water')

  if (ripples.length === 0) return

  const water = ripples[ripples.length - 1] as HTMLElement
  const diff = Date.now() - Number(water.dataset.time)
  // 剩余的扩散事件，等待执行完
  const delay = Math.max(DURATION - diff , 0)

  setTimeout(() => {
    water.classList.remove('in')
    water.classList.add('out')
    water.style.opacity = '0'
    setTimeout(() => {
      // 还原 postion
      const ripples = this.getElementsByClassName('x-ripple--water')
      if (ripples.length === 1 && this.dataset.previousPosition) {
        this.style.position = this.dataset.previousPosition
        delete this.dataset.previousPosition
      }

      if (water.parentNode?.parentNode === this) this.removeChild(water.parentNode)
    }, DURATION)
  }, delay)
}

// 更新属性
function updateValue (el: HTMLElement, value?: RippleOption) {
  const def: RippleOption = {
    class: '',
    center: false,
    circle: false,
  }

  el._ripple = Object.assign(def, value)
}

export const Ripple: ObjectDirective<HTMLElement, RippleOption> = {
  mounted (el, binding, vnode, prevNode) {
    updateValue(el, binding.value)

    el.addEventListener('mousedown', drip, { passive: true })
    el.addEventListener('mouseleave', evaporate)
    el.addEventListener('mouseup', evaporate)
  },
  unmounted (el) {
    delete el._ripple

    el.removeEventListener('mousedown', drip)
    el.removeEventListener('mouseleave', evaporate)
    el.removeEventListener('mouseup', evaporate)
  },
}