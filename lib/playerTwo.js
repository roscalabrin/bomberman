const Player = require('./player')

class PlayerTwo extends Player {
  constructor(x, y, game) {
    super(x, y, game)
    this.image = './../assets/images/bomberman2_various_sheet.png'
    this.alive === true
    this.primarySprite = { x: 210, y: 0, width: 20, height: 21 }
    this.rightSprite = { x: 298, y: 56, width: 22, height: 26 }
    this.leftSprite = { x: 240, y: 58, width: 22, height: 25 }
    this.upSprite = { x: 268, y: 30, width: 22, height: 24 }
    this.downSprite = { x: 208, y: 29, width: 20, height: 23 }
  }

  keyPressCheck() {
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
