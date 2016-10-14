class Bomb {
  constructor(x, y, context) {
    this.x = x
    this.y = y
    this.context = context
    this.height = 15
    this.width = 15
  }

  draw() {
    this.context.fillRect(this.x, this.y, this.width, this.height)
    this.startFuse()
  }

  startFuse() {
    setTimeout(this.bang.bind(this), 4000)
  }

  bang() {
    while(this.height < 150) {
      this.context.fillRect(this.x, this.y, this.width, this.height)
      this.height += 8.5
      this.width += 3
    }
    setTimeout(this.clear.bind(this), 75)
  }

  clear() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = Bomb
