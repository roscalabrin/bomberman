const Player = require('./player')

class PlayerTwo extends Player {
  constructor(game) {
    super(1400, 700, game)
  }

  update() {
    if (this.game.keys[68]) {
      this.moveRight()
    }

    else if (this.game.keys[65]) {
      this.moveLeft()
    }

    else if (this.game.keys[87]) {
      this.moveUp()
    }

    else if (this.game.keys[83]) {
      this.moveDown()
    }

    else if (this.game.keys[17]) {
      this.plantBomb()
    }
  }
}

module.exports = PlayerTwo
