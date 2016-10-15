class Block {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.game = game
  }

  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height)
  }
}

module.exports = Block
