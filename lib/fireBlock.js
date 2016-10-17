const Block = require('./block')

class FireBlock extends Block {
  constructor(x, y, game, image) {
    super(x, y, game)
    this.image = './../images/bomberman-miscellaneous.png'
  }

  drawFire(spriteX, spriteY, spriteWidth, spriteHeight) {
    const fireSprite = new Image()
    fireSprite.src = (this.image)
    this.game.context.drawImage(
      fireSprite, /* image src */
      spriteX, /* image X */
      spriteY, /* image Y */
      spriteWidth, /* image width */
      spriteHeight, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  drawFire() {

  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = FireBlock
