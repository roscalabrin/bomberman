class Block {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.game = game
    this.image = './../images/bomberman-5-blocks.png'
  }

  draw() {
    const blockSprite = new Image()
    blockSprite.src = (this.image)
    this.game.context.drawImage(
      blockSprite, /* image src */
      146, /* image X */
      240, /* image Y */
      14, /* image width */
      14, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

module.exports = Block
