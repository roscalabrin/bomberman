class CollisionEngine {
  rightCollide(block) {
    return (block.x - this.speed <= (this.x + this.width) && (this.x + this.width) <= block.x) &&
      ((block.y < this.y && this.y < block.y + block.height) ||
      (block.y < this.y + this.height && this.y + this.height < block.y + block.height))
  }

  leftCollide(block) {
    return (this.x <= (block.x + block.width + this.speed) && this.x >= (block.x + block.width)) &&
      ((block.y < this.y && this.y < block.y + block.height) ||
      (block.y < this.y + this.height && this.y + this.height < block.y + block.height))
  }

  upCollide(block) {
    return (this.y <= (block.y + block.height + this.speed) && this.y >= (block.y + block.height)) &&
      ((block.x < this.x && this.x < block.x + block.width) ||
      (block.x < this.x + this.width && this.x + this.width < block.x + block.width))
  }

  downCollide(block) {
    return ((this.y + this.height) <= block.y && (this.y + this.height) >= (block.y - this.speed)) &&
      ((block.x < this.x && this.x < block.x + block.width) ||
      (block.x < this.x + this.width && this.x + this.width < block.x + block.width))
  }

  blockAbove(block) {
    return (this.y === block.y + block.height) &&
      (this.x === block.x)
  }

  blockBelow(block) {
    return (this.y + this.height === block.y) &&
      (this.x === block.x)
  }

  blockLeft(block) {
    return (this.x === block.x + block.width) &&
      (this.y === block.y)
  }

  blockRight(block) {
    return (this.x + this.speed === block.x) &&
      (this.y === block.y)
  }

}

module.exports = CollisionEngine
