const CollisionEngine = require('./helpers/collisionEngine')
const FireBlock = require('./fireBlock')

class Explosion {
  constructor(bombX, bombY, game) {
    this.bombX = bombX
    this.bombY = bombY
    this.width = 0
    this.height = 0
    this.game = game
    this.speed = 70
    this.collisions = new CollisionEngine()
  }

  get x() {
    let newX = parseInt(this.bombX)
    while(newX % 70 !== 0) {
      newX--
    }
    return newX
  }

  get y() {
    let newY = parseInt(this.bombY)
    while(newY % 70 !== 0) {
      newY--
    }
    return newY
  }

  fill() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height)
  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }

  fillPrimaryRect() {
    while(this.height < 70) {
      this.height += 35
      this.width += 35
    }
    const fb = new FireBlock(this.x, this.y, this.game)
    fb.drawFire(324, 85, 17, 17)
    this.checkTopRect()
    this.checkLeftRect()
    this.checkRightRect()
    this.checkBottomRect()
    setTimeout(this.clear.bind(this), 75)
  }

  checkTopRect() {
    if (this.y > 0) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.blockAbove.bind(this))
      const breakableBlocks = this.game.breakableBlocks.filter(this.collisions.blockAbove.bind(this))
      /* removing blocks altogether instead of clearing the rectangle,
       * existing blocks are automatically rerendered on loop.
       * Game removes blocks in batches */
      this.game.removeBreakableBlocks(breakableBlocks)
      if (collidingBlocks.length === 0) {
        const fBlock = new FireBlock(this.x, this.y - this.speed, this.game)
        fBlock.drawFire(222, 120, 16, 16)
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }

  checkLeftRect() {
    if (this.x > 0) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.blockLeft.bind(this))
      const breakableBlocks = this.game.breakableBlocks.filter(this.collisions.blockLeft.bind(this))
      this.game.removeBreakableBlocks(breakableBlocks)
      if (collidingBlocks.length === 0) {
        const fBlock = new FireBlock(this.x - this.speed, this.y, this.game)
        fBlock.drawFire(256, 120, 16, 16)
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }

  checkRightRect() {
    if (this.x < this.game.canvas.width - this.width) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.blockRight.bind(this))
      const breakableBlocks = this.game.breakableBlocks.filter(this.collisions.blockRight.bind(this))
      this.game.removeBreakableBlocks(breakableBlocks)
      if (collidingBlocks.length === 0) {
        const fBlock = new FireBlock(this.x + this.speed, this.y, this.game)
        fBlock.drawFire(273, 120, 16, 16)
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }

  checkBottomRect() {
    if (this.y < this.game.canvas.height - this.height) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.blockBelow.bind(this))
      const breakableBlocks = this.game.breakableBlocks.filter(this.collisions.blockBelow.bind(this))
      this.game.removeBreakableBlocks(breakableBlocks)
      if (collidingBlocks.length === 0) {
        const fBlock = new FireBlock(this.x, this.y + this.speed, this.game)
        fBlock.drawFire(239, 120, 16, 16)
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }
}

module.exports = Explosion
