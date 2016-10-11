class Player {
  constructor(x, y) {
    this.x = 30
    this.y = 30
    this.height = 30
    this.width = 50
  }

  moveRight() {
    this.x++
    return this
  }

  moveLeft() {
    this.x--
    return this
  }

  moveUp() {
    this.y--
    return this
  }


  moveDown() {
    this.y++
    return this
  }
}

module.exports = Player
