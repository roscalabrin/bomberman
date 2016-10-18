const Block = require('./block')

class BreakableBlock extends Block {
  constructor(x, y, game) {
    super(x, y, game)
    this.primarySprite = { x: 78, y: 240, width: 16, height: 16 }
  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = BreakableBlock
