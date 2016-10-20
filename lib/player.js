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
    this.map = game.map
    this.collisions = new CollisionEngine(this)
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

  draw(sprite) {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      this[sprite].x, /* image X */
      this[sprite].y, /* image Y */
      this[sprite].width, /* image width */
      this[sprite].height, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  clear() {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
  }

  plantBomb() {
    const bombY = this.centerY + (this.height / 2)
    const bomb = new Bomb(this.centerX, bombY, this.game)
    this.map.bombs.push(bomb)
    this.verifyCleanBombDeployment(bomb)
  }

  verifyCleanBombDeployment(bomb) {
    if (this.collisions.checkForOpenBlock()['bomb']['deploy']()) {
      bomb.draw()
    }
    else {
      this.adjustForBombDeployment(bomb)
    }
  }

  adjustForBombDeployment(bomb) {
    this.game.context.clearRect(this.x, this.y, this.width, this.height)
    this.y -= bomb.height
    bomb.y = this.centerY + (this.height / 2)
    bomb.draw()
  }

  moveRight() {
    if (this.x < this.game.canvas.width - this.width) {
      if (this.collisions.checkForOpenBlock()['player']['right']()) {
        this.clear()
        this.x += this.speed
        this.draw('rightSprite')
      }
    }
    return this
  }

  moveLeft() {
    if (this.x > this.speed) {
      if (this.collisions.checkForOpenBlock()['player']['left']()) {
        this.clear()
        this.x -= this.speed
        this.draw('leftSprite')
      }
    }
    return this
  }

  moveUp() {
    if (this.y > this.speed) {
      if (this.collisions.checkForOpenBlock()['player']['up']()) {
        this.clear()
        this.y -= this.speed
        this.draw('upSprite')
      }
    }
    return this
  }

  moveDown() {
    if (this.y < this.game.canvas.height - this.height) {
      if (this.collisions.checkForOpenBlock()['player']['down']()) {
        this.clear()
        this.y += this.speed
        this.draw('downSprite')
      }
    }
    return this
  }
}

module.exports = Player
