import { ref, h, VNode } from 'vue'

export function layout () {
  const xx = ref(null)

  const renderControl = (children: VNode) => {
    const classes = { 'x-control--control': true }

    return h('div', { class: classes }, children)
  }

  const renderInput = (children: VNode) => {
    const classes = { 'x-input': true }

    return h('div', { class: classes }, children)
  }

  return {
    renderControl,
    renderInput
  }
}

export function decorator () {
  
}