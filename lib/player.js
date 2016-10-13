class Player {
  constructor(x, y, canvas, context) {
    this.x = x
    this.y = y
    this.height = 70
    this.width = 70
    this.canvas = canvas
    this.context = context
    this.drawPlayer()
  }

  drawPlayer() {
    requestAnimationFrame(() => {
      this.context.fillRect(this.x, this.y, this.width, this.height)
    })
  }
  
  move() {
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }

  clear() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
  }

  moveRight() {
    if (this.x < this.canvas.width - this.width) {
      this.clear()
      this.x++
      this.move()
    }
    return this
  }

  moveLeft() {
    if (this.x > 0) {
      this.clear()
      this.x--
      this.move()
    }
    return this
  }

  moveUp() {
    if (this.y > 0) {
      this.clear()
      
      this.y--
      this.move()
    }
    return this
  }

  moveDown() {
    if (this.y < this.canvas.height - this.height) {
      this.clear()
      this.y++
      this.move()
    }
    return this
  }
}

module.exports = Player
