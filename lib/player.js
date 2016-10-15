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
  }

  centerX() {
    return this.x + (this.width / 2)
  }

  centerY() {
    return this.y + (this.height / 2)
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
    const bombY = this.centerY() + (this.height / 2)
    const bomb = new Bomb(this.centerX(), bombY, this.game)
    bomb.draw()
  }

  moveRight() {
    if (this.x < this.game.canvas.width - this.width) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.rightCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.x += this.speed
        this.move()
      }
    }
    return this
  }

  moveLeft() {
    if (this.x > 0) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.leftCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.x -= this.speed
        this.move()
      }
    }
    return this
  }

  moveUp() {
    if (this.y > 0) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.upCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.y -= this.speed
        this.move()
      }
    }
    return this
  }

  moveDown() {
    if (this.y < this.game.canvas.height - this.height) {
      const collidingBlocks = this.game.blocks.filter(this.collisions.downCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.y += this.speed
        this.move()
      }
    }
    return this
  }
}

module.exports = Player
