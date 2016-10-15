const Player = require('./player')

class PlayerOne extends Player {
  constructor(game) {
    super(0, 0, game)
    this.bindControls()
  }

  bindControls() {
    document.addEventListener('keydown', this.direction.bind(this))
  }

  direction(e){
    if (e.keyCode === 39) {
      this.moveRight()
    }

    else if (e.keyCode === 37) {
      this.moveLeft()
    }

    else if (e.keyCode === 38) {
      this.moveUp()
    }

    else if (e.keyCode === 40) {
      this.moveDown()
    }

    else if (e.keyCode === 18) {
      this.plantBomb()
    }
  }
}

module.exports = PlayerOne
