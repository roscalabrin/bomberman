const Block = require('./block')

class FireBlock extends Block {
  constructor(x, y, game) {
    super(x, y, game)
  }

  drawFire() {

  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = FireBlock
