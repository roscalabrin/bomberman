const Player = require('./player')

class PlayerOne extends Player {
  constructor(x, y, game) {
    super(x, y, game)
    this.image = './../assets/images/SBM2-Bomberman.gif'
    this.alive = true
    this.primarySprite = { x: 107, y: 2, width: 16, height: 26 }
    this.rightSprite = { x: 88, y: 3, width: 19, height: 25 }
    this.leftSprite = { x: 174, y: 3, width: 20, height: 25 }
    this.upSprite = { x: 212, y: 3, width: 16, height: 25 }
    this.downSprite = { x: 505, y: 70, width: 19, height: 28 }
  }

  keyPressCheck(){
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
