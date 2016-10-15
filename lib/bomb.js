const Explosion = require('./explosion')

class Bomb {
  constructor(x, y, game) {
    this.x = x
    this.y = y
    this.game = game
    this.height = 15
    this.width = 15
  }

  get centerX() {
    return this.x + (this.width / 2)
  }

  get centerY() {
    return this.y + (this.height / 2)
  }

  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height)
    this.startFuse()
  }

  startFuse() {
    setTimeout(this.clear.bind(this), 3000)
  }

  clear() {
    const ex = new Explosion(this.centerX, this.centerY, this.game)
    this.game.removeBomb(this)
    ex.fillPrimaryRect()
  }
}

module.exports = Bomb
