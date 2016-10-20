class Block {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.game = game
    this.image = 'assets/images/bomberman-5-blocks.png'
    this.primarySprite = { x: 146, y: 240, width: 14, height: 14 }
  }

  draw(sprite) {
    const blockSprite = new Image()
    blockSprite.src = (this.image)
    this.game.context.drawImage(
      blockSprite, /* image src */
      this[sprite].x,
      this[sprite].y,
      this[sprite].width,
      this[sprite].height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

module.exports = Block
