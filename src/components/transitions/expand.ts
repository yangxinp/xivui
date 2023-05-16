interface HTMLExpandElement extends HTMLElement {
  _initialStyle?: {
    overflow: string
    width: string
    height: string
  }
}

function expand (vertical = false) {
  // 在元素被插入到 DOM 之前被调用
  // 用这个来设置元素的 "enter-from" 状态
  const onBeforeEnter = (el: HTMLExpandElement) => {
    el._initialStyle = {
      overflow: el.style.overflow,
      width: el.style.width,
      height: el.style.height,
    }

    if (vertical) {
      el.style.height = '0'
    } else {
      el.style.width = '0'
    }
    el.style.overflow = 'hidden'
  }

  // 在元素被插入到 DOM 之后的下一帧被调用
  // 用这个来开始进入动画
  const onEnter = (el: HTMLExpandElement) => {
    console.log('onEnter')
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数

    requestAnimationFrame(() => {
      if (vertical) {
        el.style.height =  el._initialStyle?.height || (el.scrollHeight + 'px')
      } else {
        el.style.width = el._initialStyle?.width || (el.scrollWidth + 'px')
        console.log(el.style.width)
      }  
    })
  }

  // 当进入过渡完成时调用。
  const onAfterEnter = (el: HTMLExpandElement) => {
    resetStyle(el)
  }

  const onEnterCancelled = (el: HTMLExpandElement) => {
    resetStyle(el)
  }

  // 在 leave 钩子之前调用
  // 大多数时候，你应该只会用到 leave 钩子
  const onBeforeLeave = (el: HTMLExpandElement) => {
    el._initialStyle = {
      overflow: el.style.overflow,
      width: el.style.width,
      height: el.style.height,
    }

    if (vertical) {
      el.style.height =  el._initialStyle?.height || el.scrollHeight + 'px'
    } else {
      el.style.width = el._initialStyle?.width || el.scrollWidth + 'px'
    }
  }

  // 在离开过渡开始时调用
  // 用这个来开始离开动画
  const onLeave = (el: HTMLExpandElement) => {
    console.log('onLeave')
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    if (vertical) {
      el.style.height = '0'
    } else {
      el.style.width = '0'
    }
    el.style.overflow = 'hidden'
  }

  // 在离开过渡完成、
  // 且元素已从 DOM 中移除时调用
  const onAfterLeave = (el: HTMLExpandElement) => {
    resetStyle(el)
  }

  // 仅在 v-show 过渡中可用
  const onLeaveCancelled = (el: HTMLExpandElement) => {
    resetStyle(el)
  }

  const resetStyle = (el: HTMLExpandElement) => {
    console.log('resetStyle')
    if (!el._initialStyle) return

    el.style.width = el._initialStyle.width
    el.style.height = el._initialStyle.height
    el.style.overflow = el._initialStyle.overflow

    delete el._initialStyle
  }

  return {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled
  }
}

export default expand