const CollisionEngine = require('./helpers/collisionEngine')
const Bomb = require('./bomb')

class Player {
  constructor(x, y, game) {
    this.x = x
    this.y = y
    this.height = 35
    this.width = 35
    this.speed = 3
    this.game = game
    this.collisions = new CollisionEngine()
    // this.bindControls()
  }

  get centerX() {
    return this.x + (this.width / 2)
  }

  get centerY() {
    return this.y + (this.height / 2)
  }

  bindControls() {
    document.addEventListener('keydown', e => {
      this.game.keys[e.keyCode] = true
    })

    document.addEventListener('keyup', e => {
      this.game.keys[e.keyCode] = false
    })
  }

  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height)
  }

  move() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height)
  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }

  plantBomb() {
    const bombY = this.centerY + (this.height / 2)
    const bomb = new Bomb(this.centerX, bombY, this.game)
    this.game.bombs.push(bomb)
    bomb.draw()
  }

  moveRight() {
    if (this.x < this.game.canvas.width - this.width) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.rightCollide.bind(this))
      const collidingBombs = this.game.bombs.filter(this.collisions.bombRight.bind(this))
      const collidingBreakables = this.game.breakableBlocks.filter(this.collisions.rightCollide.bind(this))
      const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
      if (possibleCollisions === 0) {
        this.clear()
        this.x += this.speed
        this.drawRight()
      }
    }
    return this
  }

  moveLeft() {
    if (this.x > 0) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.leftCollide.bind(this))
      const collidingBombs = this.game.bombs.filter(this.collisions.bombLeft.bind(this))
      const collidingBreakables = this.game.breakableBlocks.filter(this.collisions.leftCollide.bind(this))
      const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
      if (possibleCollisions === 0) {
        this.clear()
        this.x -= this.speed
        this.drawLeft()
      }
    }
    return this
  }

  moveUp() {
    if (this.y > 0) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.upCollide.bind(this))
      const collidingBombs = this.game.bombs.filter(this.collisions.bombAbove.bind(this))
      const collidingBreakables = this.game.breakableBlocks.filter(this.collisions.upCollide.bind(this))
      const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
      if (possibleCollisions === 0) {
        this.clear()
        this.y -= this.speed
        this.drawUp()
      }
    }
    return this
  }

  moveDown() {
    if (this.y < this.game.canvas.height - this.height) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.downCollide.bind(this))
      const collidingBombs = this.game.bombs.filter(this.collisions.bombBelow.bind(this))
      const collidingBreakables = this.game.breakableBlocks.filter(this.collisions.downCollide.bind(this))
      const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
      if (possibleCollisions === 0) {
        this.clear()
        this.y += this.speed
        this.drawDown()
      }
    }
    return this
  }
}

module.exports = Player
