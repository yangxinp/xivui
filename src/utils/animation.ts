class AnimationFrame {
  handleID ?: number

  request (callback: Function) {
    this.cancel()
    this.handleID = requestAnimationFrame((timer) => {
      callback(timer)
      this.handleID = undefined
    })
  }

  cancel () {
    if (this.handleID) {
      cancelAnimationFrame(this.handleID)
      this.handleID = undefined
    }
  }
}

export default AnimationFrame