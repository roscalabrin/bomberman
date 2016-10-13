class Player {
  constructor(x, y, canvas, context) {
    this.x = x
    this.y = y
    this.height = 35
    this.width = 35
    this.canvas = canvas
    this.context = context
    this.blocks = []
  }

  draw() {
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }

  move() {
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }

  clear() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
  }

  moveRight() {
    if (this.x < this.canvas.width - this.width) {
      const collidingBlocks = this.blocks.filter(this.rightCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.x++
        this.move()
      }
    }
    return this
  }

  rightCollide(block) {
    return (this.x + this.width) === block.x &&
      ((block.y < this.y && this.y < block.y + block.height) ||
      (block.y < this.y + this.height && this.y + this.height < block.y + block.height))
  }

  leftCollide(block) {
    return this.x === (block.x + block.width) &&
      ((block.y < this.y && this.y < block.y + block.height) ||
      (block.y < this.y + this.height && this.y + this.height < block.y + block.height))
  }

  downCollide(block) {
    return (this.y + this.height) === block.y &&
      ((block.x < this.x && this.x < block.x + block.width) ||
      (block.x < this.x + this.width && this.x + this.width < block.x + block.width))
  }

  upCollide(block) {
    return this.y === (block.y + block.height) &&
      ((block.x < this.x && this.x < block.x + block.width) ||
      (block.x < this.x + this.width && this.x + this.width < block.x + block.width))
  }

  moveLeft() {
    if (this.x > 0) {
      const collidingBlocks = this.blocks.filter(this.leftCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.x--
        this.move()
      }
    }
    return this
  }

  moveUp() {
    if (this.y > 0) {
      const collidingBlocks = this.blocks.filter(this.upCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.y--
        this.move()
      }
    }
    return this
  }

  moveDown() {
    if (this.y < this.canvas.height - this.height) {
      const collidingBlocks = this.blocks.filter(this.downCollide.bind(this))
      if (collidingBlocks.length === 0) {
        this.clear()
        this.y++
        this.move()
      }
    }
    return this
  }
}

module.exports = Player
