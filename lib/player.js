class Player {
  constructor(x = 30, y = 30, canvas) {
    this.x = x
    this.y = y
    this.height = 30
    this.width = 50
    this.canvas = canvas
  }

  moveRight() {
    while(this.x < this.canvas.width - this.width) {
      this.x++
    }
    return this
  }

  moveLeft() {
    while(this.x < 0 + this.width) {
      this.x--
    }
    return this  
  }

  moveUp() {
    while(this.y >= this.height) {
      this.y--
    }
    return this
  }

  moveDown() {
    while(this.y < this.canvas.height - this.height) {
      this.y++
    }
    return this
  }
}

module.exports = Player
