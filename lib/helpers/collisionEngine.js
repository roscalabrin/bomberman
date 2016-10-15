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
    return (this.x + this.width === block.x) &&
      (this.y === block.y)
  }

  bombAbove(bomb) {
    return ((bomb.y + bomb.height + this.speed) > this.y) &&
      ((bomb.y + bomb.height + this.speed) <= (this.y + this.height)) &&
      (((bomb.x + bomb.width) > this.x) && (bomb.x < (this.x + this.width)))
  }

  bombBelow(bomb) {
    return ((this.y + this.height + this.speed) > bomb.y) &&
      ((this.y + this.height + this.speed) <= (bomb.y + bomb.height)) &&
      (((bomb.x + bomb.width) > this.x) && (bomb.x < (this.x + this.width)))
  }

  bombRight(bomb) {
    return ((this.x + this.width + this.speed) >= bomb.x) &&
    ((this.x + this.width + this.speed) <= (bomb.x + bomb.width)) &&
    ((bomb.y + bomb.height > this.y) && (bomb.y < (this.y + this.height)))
  }

  bombLeft(bomb) {
    return ((bomb.x + bomb.width + this.speed) >= this.x) &&
    ((bomb.x + bomb.width + this.speed) <= (this.x + this.width)) &&
    ((bomb.y + bomb.height > this.y) && (bomb.y < (this.y + this.height)))
  }
}

module.exports = CollisionEngine
