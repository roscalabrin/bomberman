const Bomb = require('./bomb')

class SuperBomb extends Bomb {
  constructor(x, y, game) {
    super(x, y, game)
    this.height = 35
    this.width = 35
    this.fuseTime = 1500
  }
}

module.exports = SuperBomb
