class CollisionEngine {
  constructor(movingObject) {
    this.movingObject = movingObject
    this.map = movingObject.game.map
  }

  checkForOpenBlock() {
    return {
      playerToBlock: {
        right: this.playerCollisionsRight.bind(this),
        left: this.playerCollisionsLeft.bind(this),
        up: this.playerCollisionsUp.bind(this),
        down: this.playerCollisionsDown.bind(this)
      },
      fireToBlock: {
        right: this.fireCollisionsRight.bind(this),
        left: this.fireCollisionsLeft.bind(this),
        up: this.fireCollisionsUp.bind(this),
        down: this.fireCollisionsDown.bind(this)
      },
      superFireToBlock: {
        right: this.superFireCollisionsRight.bind(this),
        left: this.superFireCollisionsLeft.bind(this),
        above: this.superFireCollisionsTop.bind(this),
        below: this.superFireCollisionsBottom.bind(this)
      },
      bombToBlock: {
        deploy: this.bombDeploymentCollision.bind(this)
      }
    }
  }

//   fireToPlayer(x, y, width, height) {
//     return (((x <= this.movingObject.x) &&
//              (this.movingObject.x <= (x + width))) &&
//              ((y <= this.movingObject.y) &&
//              (this.movingObject.y <= (y + height))))
//   }

  bombDeploymentCollision() {
    this.movingObject.speed = 25
    const blocksBelow = this.map.blocks.filter(this.downCollide.bind(this))
    const breakablesBelow = this.map.breakableBlocks.filter(this.downCollide.bind(this))
    this.movingObject.speed = 3
    return (blocksBelow.length + breakablesBelow.length) === 0
  }

  superFireCollisionsRight() {
    const collidingBlocks = this.map.blocks.filter(this.blockWayRight.bind(this))
    return collidingBlocks.length === 0
  }

  superFireCollisionsLeft() {
    const collidingBlocks = this.map.blocks.filter(this.blockWayLeft.bind(this))
    return collidingBlocks.length === 0
  }

  superFireCollisionsTop() {
    const collidingBlocks = this.map.blocks.filter(this.blockWayAbove.bind(this))
    return collidingBlocks.length === 0
  }

  superFireCollisionsBottom() {
    const collidingBlocks = this.map.blocks.filter(this.blockWayBelow.bind(this))
    return collidingBlocks.length === 0
  }

  fireCollisionsRight() {
    const collidingBlocks = this.map.blocks.filter(this.blockRight.bind(this))
    return collidingBlocks.length === 0
  }

  fireCollisionsLeft() {
    const collidingBlocks = this.map.blocks.filter(this.blockLeft.bind(this))
    return collidingBlocks.length === 0
  }

  fireCollisionsUp() {
    const collidingBlocks = this.map.blocks.filter(this.blockAbove.bind(this))
    return collidingBlocks.length === 0
  }

  fireCollisionsDown() {
    const collidingBlocks = this.map.blocks.filter(this.blockBelow.bind(this))
    return collidingBlocks.length === 0
  }

  playerCollisionsRight() {
    const collidingBlocks = this.map.blocks.filter(this.rightCollide.bind(this))
    const collidingBombs = this.map.bombs.filter(this.bombRight.bind(this))
    const collidingBreakables = this.map.breakableBlocks.filter(this.rightCollide.bind(this))
    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
    return possibleCollisions === 0
  }

  playerCollisionsLeft() {
    const collidingBlocks = this.map.blocks.filter(this.leftCollide.bind(this))
    const collidingBombs = this.map.bombs.filter(this.bombLeft.bind(this))
    const collidingBreakables = this.map.breakableBlocks.filter(this.leftCollide.bind(this))
    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
    return possibleCollisions === 0
  }

  playerCollisionsUp() {
    const collidingBlocks = this.map.blocks.filter(this.upCollide.bind(this))
    const collidingBombs = this.map.bombs.filter(this.bombAbove.bind(this))
    const collidingBreakables = this.map.breakableBlocks.filter(this.upCollide.bind(this))
    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
    return possibleCollisions === 0
  }

  playerCollisionsDown() {
    const collidingBlocks = this.map.blocks.filter(this.downCollide.bind(this))
    const collidingBombs = this.map.bombs.filter(this.bombBelow.bind(this))
    const collidingBreakables = this.map.breakableBlocks.filter(this.downCollide.bind(this))
    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length
    return possibleCollisions === 0
  }


  rightCollide(block) {
    return (block.x - this.movingObject.speed <= (this.movingObject.x + this.movingObject.width) && (this.movingObject.x + this.movingObject.width) <= block.x) &&
      ((block.y < this.movingObject.y && this.movingObject.y < block.y + block.height) ||
      (block.y < this.movingObject.y + this.movingObject.height && this.movingObject.y + this.movingObject.height < block.y + block.height))
  }

  leftCollide(block) {
    return (this.movingObject.x <= (block.x + block.width + this.movingObject.speed) && this.movingObject.x >= (block.x + block.width)) &&
      ((block.y < this.movingObject.y && this.movingObject.y < block.y + block.height) ||
      (block.y < this.movingObject.y + this.movingObject.height && this.movingObject.y + this.movingObject.height < block.y + block.height))
  }

  upCollide(block) {
    return (this.movingObject.y <= (block.y + block.height + this.movingObject.speed) && this.movingObject.y >= (block.y + block.height)) &&
      ((block.x < this.movingObject.x && this.movingObject.x < block.x + block.width) ||
      (block.x < this.movingObject.x + this.movingObject.width && this.movingObject.x + this.movingObject.width < block.x + block.width))
  }

  downCollide(block) {
    return ((this.movingObject.y + this.movingObject.height) <= block.y && (this.movingObject.y + this.movingObject.height) >= (block.y - this.movingObject.speed)) &&
      ((block.x < this.movingObject.x && this.movingObject.x < block.x + block.width) ||
      (block.x < this.movingObject.x + this.movingObject.width && this.movingObject.x + this.movingObject.width < block.x + block.width))
  }

  blockAbove(block) {
    return (this.movingObject.y === block.y + block.height) &&
      (this.movingObject.x === block.x)
  }

  blockBelow(block) {
    return (this.movingObject.y + this.movingObject.height === block.y) &&
      (this.movingObject.x === block.x)
  }

  blockLeft(block) {
    return (this.movingObject.x === block.x + block.width) &&
      (this.movingObject.y === block.y)
  }

  blockRight(block) {
    return (this.movingObject.x + this.movingObject.width === block.x) &&
      (this.movingObject.y === block.y)
  }

  blockWayRight(block) {
    return (this.movingObject.x + (this.movingObject.width * 2) === block.x) &&
      (this.movingObject.y === block.y)
  }

  blockWayLeft(block) {
    return (this.movingObject.x - (this.movingObject.width * 2) === block.x) &&
      (this.movingObject.y === block.y)
  }

  blockWayAbove(block) {
    return (this.movingObject.y - (this.movingObject.height * 2) === block.y) &&
      (this.movingObject.x === block.x)
  }

  blockWayBelow(block) {
    return (this.movingObject.y + (this.movingObject.height * 2) === block.y) &&
      (this.movingObject.x === block.x)
  }

  bombAbove(bomb) {
    return ((bomb.y + bomb.height + this.movingObject.speed) > this.movingObject.y) &&
      ((bomb.y + bomb.height + this.movingObject.speed) <= (this.movingObject.y + this.movingObject.height)) &&
      (((bomb.x + bomb.width) > this.movingObject.x) && (bomb.x < (this.movingObject.x + this.movingObject.width)))
  }

  bombBelow(bomb) {
    return ((this.movingObject.y + this.movingObject.height + this.movingObject.speed) > bomb.y) &&
      ((this.movingObject.y + this.movingObject.height + this.movingObject.speed) <= (bomb.y + bomb.height)) &&
      (((bomb.x + bomb.width) > this.movingObject.x) && (bomb.x < (this.movingObject.x + this.movingObject.width)))
  }

  bombRight(bomb) {
    return ((this.movingObject.x + this.movingObject.width + this.movingObject.speed) >= bomb.x) &&
    ((this.movingObject.x + this.movingObject.width + this.movingObject.speed) <= (bomb.x + bomb.width)) &&
    ((bomb.y + bomb.height > this.movingObject.y) && (bomb.y < (this.movingObject.y + this.movingObject.height)))
  }

  bombLeft(bomb) {
    return ((bomb.x + bomb.width + this.movingObject.speed) >= this.movingObject.x) &&
    ((bomb.x + bomb.width + this.movingObject.speed) <= (this.movingObject.x + this.movingObject.width)) &&
    ((bomb.y + bomb.height > this.movingObject.y) && (bomb.y < (this.movingObject.y + this.movingObject.height)))
  }
}

module.exports = CollisionEngine
