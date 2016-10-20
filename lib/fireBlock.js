const Block = require('./block')

class FireBlock extends Block {
  constructor(x, y, game, image) {
    super(x, y, game)
    this.speed = this.height
    this.image = './../assets/images/bomberman-miscellaneous.png'
    this.primarySprite = { x: 324, y: 85, width: 17, height: 17 }
    this.rightSprite = { x: 273, y: 120, width: 16, height: 16 }
    this.leftSprite = { x: 256, y: 120, width: 16, height: 16 }
    this.topSprite = { x: 222, y: 120, width: 16, height: 16 }
    this.bottomSprite = { x: 239, y: 120, width: 16, height: 16 }
    this.farTopSprite = { x: 223, y: 69, width: 15, height: 15 }
    this.farBottomSprite = { x: 239, y: 69, width: 15, height: 15 }
    this.farLeftSprite = { x: 256 , y: 69, width: 15, height: 15 }
    this.farRightSprite = { x: 273, y: 69, width: 15, height: 15 }
  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = FireBlock
