const FireBlock = require('./fireBlock')

class SuperFireBlock extends FireBlock {
  constructor(x, y, game) {
    super(x, y, game)
    this.primarySprite = { x: 324, y: 103, width: 16, height: 16 }
    this.lateralSprite = { x: 308, y: 103, width: 16, height: 16 }
    this.verticalSprite = { x: 290, y: 103, width: 16, height: 16 }
  }
}

module.exports = SuperFireBlock
