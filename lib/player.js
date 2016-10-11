class Player {
  constructor(x = 30, y = 30, canvas) {
    this.x = x
    this.y = y
    this.height = 30
    this.width = 50
    this.canvas = canvas
  }

  moveRight() {
    if (this.x < this.canvas.width - this.width) {
      this.x++
    }
    return this
  }

  moveLeft() {
    if (this.x > this.width) {
      this.x--
    }
    return this
  }

  moveUp() {
    if (this.y > this.height) {
      this.y--
    }
    return this
  }

  moveDown() {
    if (this.y < this.canvas.height - this.height) {
      this.y++
    }
    return this
  }
}

module.exports = Player
