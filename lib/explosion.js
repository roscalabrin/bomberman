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
    this.collisions = null
    this.map = game.map
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
    this.collisions = new CollisionEngine(fb)
    fb.draw('primarySprite')
    this.checkTopRect()
    this.checkLeftRect()
    this.checkRightRect()
    this.checkBottomRect()
    this.checkForPlayers(fb.x, fb.y, fb.width, fb.height)
    this.checkForDeadPlayers()
    setTimeout(this.clear.bind(this), 75)
  }

  checkForDeadPlayers() {
    const playerOne = this.game.firstPlayer
    const playerTwo = this.game.secondPlayer
    if (playerOne.alive === false)  {
      this.explosionKillsPlayer('Player Two')
    } else if (playerTwo.alive === false) {
      this.explosionKillsPlayer('Player One')
    }
  }

  explosionKillsPlayer(winner) {
    this.game.score.setFinalScore(winner, this.game.timer.timeLeft)
    this.game.score.update()
    this.game.endGame(winner)
  }

  checkForPlayers(x, y, width, height) {
    const playerOne = this.game.firstPlayer
    const playerTwo = this.game.secondPlayer
    if (((x <= playerOne.x) && (playerOne.x <= (x + width))) && ((y <= playerOne.y) && (playerOne.y <= (y + height)))) {
      playerOne.alive = false
    }
    if (((x <= playerTwo.x) && (playerTwo.x <= (x + width))) && ((y <= playerTwo.y) && (playerTwo.y <= (y + height)))) {
      playerTwo.alive = false
    }
  }

  checkTopRect() {
    if (this.y > 0) {
      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockAbove.bind(this.collisions))
      /* removing blocks altogether instead of clearing the rectangle,
       * existing blocks are automatically rerendered on loop.
       * Game removes blocks in batches */
      this.map.removeBreakableBlocks(breakableBlocks)
      if (this.collisions.checkForOpenBlock()['fire']['up']()) {
        const fBlock = new FireBlock(this.x, this.y - this.speed, this.game)
        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height)
        fBlock.draw('topSprite')
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }

  checkLeftRect() {
    if (this.x > 0) {
      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockLeft.bind(this.collisions))
      this.map.removeBreakableBlocks(breakableBlocks)
      if (this.collisions.checkForOpenBlock()['fire']['left']()) {
        const fBlock = new FireBlock(this.x - this.speed, this.y, this.game)
        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height)
        fBlock.draw('leftSprite')
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }

  checkRightRect() {
    if (this.x < this.game.canvas.width - this.width) {
      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockRight.bind(this.collisions))
      this.map.removeBreakableBlocks(breakableBlocks)
      if (this.collisions.checkForOpenBlock()['fire']['right']()) {
        const fBlock = new FireBlock(this.x + this.speed, this.y, this.game)
        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height)
        fBlock.draw('rightSprite')
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }

  checkBottomRect() {
    if (this.y < this.game.canvas.height - this.height) {
      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockBelow.bind(this.collisions))
      this.map.removeBreakableBlocks(breakableBlocks)
      if (this.collisions.checkForOpenBlock()['fire']['down']()) {
        const fBlock = new FireBlock(this.x, this.y + this.speed, this.game)
        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height)
        fBlock.draw('bottomSprite')
        setTimeout(fBlock.clear.bind(fBlock), 75)
      }
    }
    return this
  }
}

module.exports = Explosion
