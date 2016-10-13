const Player = require('./player')

class PlayerTwo extends Player {
  constructor(canvas, context) {
    super(1400, 700, canvas, context)
    this.bindControls()
  }

  bindControls() {
    document.addEventListener('keydown', this.direction.bind(this))
  }

  direction(e) {
    if (e.keyCode === 68) {
      this.moveRight()
    }

    else if (e.keyCode === 65) {
      this.moveLeft()
    }

    else if (e.keyCode === 87) {
      this.moveUp()
    }

    else if (e.keyCode === 83) {
      this.moveDown()
    }

    else if (e.keyCode === 17) {
      this.plantBomb()
    }
  }
}

module.exports = PlayerTwo
