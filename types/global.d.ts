interface HTMLElement {
  _clickOutside?: EventListener
  _scrollListener?: EventListener
  _resizeObserver?: ResizeObserver

  _ripple?: RippleOption

}

interface RippleOption {
  class?: string
  circle?: boolean
  center?: boolean
}