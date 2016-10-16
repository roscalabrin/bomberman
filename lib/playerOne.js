const Player = require('./player')

class PlayerOne extends Player {
  constructor(game) {
    super(0, 0, game)
  }

  update(){
    if (this.game.keys[39]) {
      this.moveRight()
    }

    else if (this.game.keys[37]) {
      this.moveLeft()
    }

    else if (this.game.keys[38]) {
      this.moveUp()
    }

    else if (this.game.keys[40]) {
      this.moveDown()
    }

    else if (this.game.keys[18]) {
      this.plantBomb()
    }
  }
}

module.exports = PlayerOne
