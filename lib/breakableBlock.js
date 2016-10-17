const Block = require('./block')

class BreakableBlock extends Block {
  constructor(x, y, game) {
    super(x, y, game)
  }

  drawBreakable() {
    const blockSprite = new Image()
    blockSprite.src = (this.image)
    this.game.context.drawImage(
      blockSprite, /* image src */
      78, /* image X */
      240, /* image Y */
      16, /* image width */
      16, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = BreakableBlock
