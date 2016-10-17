const Player = require('./player')

class PlayerOne extends Player {
  constructor(game) {
    super(0, 0, game)
    this.image = './../images/SBM2-Bomberman.gif'
  }

  drawSprite() {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      107, /* image X */
      2, /* image Y */
      16, /* image width */
      26, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  drawRight() {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      88, /* image X */
      3, /* image Y */
      19, /* image width */
      25, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  drawLeft() {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      174, /* image X */
      3, /* image Y */
      20, /* image width */
      25, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  drawUp() {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      212, /* image X */
      3, /* image Y */
      16, /* image width */
      25, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  drawDown() {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      505, /* image X */
      70, /* image Y */
      19, /* image width */
      28, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  keyPressCheck(){
    if (this.game.keys[39]) {
      this.moveRight()
    }

    else if (this.game.keys[37]) {
      this.moveLeft()
    }

    else if (this.game.keys[38]) {
      this.moveUp()
    }

    else if (this.game.keys[40]) {
      this.moveDown()
    }

    else if (this.game.keys[18]) {
      this.plantBomb()
    }
  }
}

module.exports = PlayerOne
