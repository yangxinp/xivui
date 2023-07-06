interface HTMLElement {
  _clickOutside?: EventListener

  _ripple?: RippleOption

}

interface RippleOption {
  class?: string
  circle?: boolean
  center?: boolean
}