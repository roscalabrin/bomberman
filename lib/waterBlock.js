const Block = require('./block')

class WaterBlock extends Block {
  constructor(x, y, game) {
    super(x, y, game)
    this.image = 'assets/images/bomberman-miscellaneous.png'
    this.primarySprite = { x: 137, y: 18, width: 15, height: 15 }
  }
}

module.exports = WaterBlock
