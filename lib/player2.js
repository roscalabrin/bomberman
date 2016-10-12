class Player2 {
  constructor(x, y, canvas, context) {
    this.x = x || 1390
    this.y = y || 710
    this.height = 30
    this.width = 50
    this.canvas = canvas
    this.context = context
  }

  move() {
    requestAnimationFrame(() => {
      this.context.fillRect(this.x, this.y, 
                            this.width, this.height)
    })
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
    if (this.x > this.width) {
      this.clear()
      this.x--
      this.move()
    }
    return this
  }

  moveUp() {
    if (this.y > this.height) {
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

module.exports = Player2
