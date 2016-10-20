const Explosion = require('./explosion')
const SuperExplosion = require('./superExplosion')

class Bomb {
  constructor(x, y, game) {
    this.x = x
    this.y = y
    this.game = game
    this.map = game.map
    this.height = 25
    this.width = 25
    this.fuseTime = 3000
    this.image = 'assets/images/bomberman2_various_sheet.png'
  }

  get centerX() {
    return this.x + (this.width / 2)
  }

  get centerY() {
    return this.y + (this.height / 2)
  }

  draw() {
    const bombSprite = new Image()
    bombSprite.src = (this.image)
    this.game.context.drawImage(
      bombSprite, /* image src */
      240, /* image X */
      92, /* image Y */
      19, /* image width */
      18, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.startFuse()
  }

  startFuse() {
    setTimeout(this.clear.bind(this), this.fuseTime)
  }

  clear() {
    let ex;
    if (this.map.constructor.name === 'SmallMap') {
      ex = new SuperExplosion(this.centerX, this.centerY, this.game)
    }
    else {
      ex = new Explosion(this.centerX, this.centerY, this.game)
    }
    this.map.removeBomb(this)
    ex.fillPrimaryRect()
  }
}

module.exports = Bomb
