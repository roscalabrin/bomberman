const SuperFireBlock = require('./superFireBlock')
const Explosion = require('./explosion')
const CollisionEngine = require('./helpers/collisionEngine')

class SuperExplosion extends Explosion {
  fillPrimaryRect() {
    while(this.height < 70) {
      this.height += 35
      this.width += 35
    }
    const sfb = new SuperFireBlock(this.x, this.y, this.game)
    this.collisions = new CollisionEngine(sfb)
    sfb.draw('primarySprite')
    this.checkTopRect()
    this.checkLeftRect()
    this.checkRightRect()
    this.checkBottomRect()
    this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
    this.checkForDeadPlayers()
    setTimeout(this.clear.bind(this), 75)
  }

  checkTopRect() {
    if (this.y > 140) {
      if (this.collisions.checkForOpenBlock()['fireToBlock']['up']()) {
        const sfb = new SuperFireBlock(this.x, this.y - this.speed, this.game)
        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
        sfb.draw('verticalSprite')
        this.checkAdditionalTopRect()
        setTimeout(sfb.clear.bind(sfb), 75)
      }
    }
    return this
  }

  checkLeftRect() {
    if (this.x > 280) {
      if (this.collisions.checkForOpenBlock()['fireToBlock']['left']()) {
        const sfb = new SuperFireBlock(this.x - this.speed, this.y, this.game)
        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
        sfb.draw('lateralSprite')
        this.checkAdditionalLeftRect()
        setTimeout(sfb.clear.bind(sfb), 75)
      }
    }
    return this
  }

  checkRightRect() {
    if (this.x < (this.game.canvas.width - 280) - this.width) {
      if (this.collisions.checkForOpenBlock()['fireToBlock']['right']()) {
        const sfb = new SuperFireBlock(this.x + this.speed, this.y, this.game)
        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
        sfb.draw('lateralSprite')
        this.checkAdditionalRightRect()
        setTimeout(sfb.clear.bind(sfb), 75)
      }
    }
    return this
  }

  checkBottomRect() {
    if (this.y < (this.game.canvas.height - 140) - this.height) {
      if (this.collisions.checkForOpenBlock()['fireToBlock']['down']()) {
        const sfb = new SuperFireBlock(this.x, this.y + this.speed, this.game)
        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
        sfb.draw('verticalSprite')
        this.checkAdditionalBottomRect()
        setTimeout(sfb.clear.bind(sfb), 75)
      }
    }
    return this
  }

  checkAdditionalTopRect() {
    if (this.collisions.checkForOpenBlock()['superFireToBlock']['above']()) {
      const sfb = new SuperFireBlock(this.x, this.y - (this.speed * 2), this.game)
      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
      sfb.draw('verticalSprite')
      setTimeout(sfb.clear.bind(sfb), 75)
    }
  }

  checkAdditionalLeftRect() {
    if (this.collisions.checkForOpenBlock()['superFireToBlock']['left']()) {
      const sfb = new SuperFireBlock(this.x - (this.speed * 2), this.y, this.game)
      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
      sfb.draw('lateralSprite')
      setTimeout(sfb.clear.bind(sfb), 75)
    }
  }

  checkAdditionalRightRect() {
    if (this.collisions.checkForOpenBlock()['superFireToBlock']['right']()) {
      const sfb = new SuperFireBlock(this.x + (this.speed * 2), this.y, this.game)
      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
      sfb.draw('lateralSprite')
      setTimeout(sfb.clear.bind(sfb), 75)
    }
  }

  checkAdditionalBottomRect() {
    if (this.collisions.checkForOpenBlock()['superFireToBlock']['below']()) {
      const sfb = new SuperFireBlock(this.x, this.y + (this.speed * 2), this.game)
      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height)
      sfb.draw('verticalSprite')
      setTimeout(sfb.clear.bind(sfb), 75)
    }
  }
}

module.exports = SuperExplosion
