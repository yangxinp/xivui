interface HTMLElement {
  _clickOutside?: EventListenerOrEventListenerObject

  _ripple?: RippleOption

}

interface RippleOption {
  class?: string
  circle?: boolean
  center?: boolean
}