const Player = require('./player')

class PlayerTwo extends Player {
  constructor(game) {
    super(1400, 700, game)
    this.image = './../images/bomberman2_various_sheet.png'
  }

  drawSprite() {
    const bomberSprite = new Image()
    bomberSprite.src = (this.image)
    this.game.context.drawImage(
      bomberSprite, /* image src */
      210, /* image X */
      0, /* image Y */
      20, /* image width */
      21, /* image height */
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
      298, /* image X */
      56, /* image Y */
      22, /* image width */
      26, /* image height */
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
      240, /* image X */
      58, /* image Y */
      22, /* image width */
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
      268, /* image X */
      30, /* image Y */
      22, /* image width */
      24, /* image height */
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
      208, /* image X */
      29, /* image Y */
      20, /* image width */
      23, /* image height */
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update() {
    if (this.game.keys[68]) {
      this.moveRight()
    }

    else if (this.game.keys[65]) {
      this.moveLeft()
    }

    else if (this.game.keys[87]) {
      this.moveUp()
    }

    else if (this.game.keys[83]) {
      this.moveDown()
    }

    else if (this.game.keys[17]) {
      this.plantBomb()
    }
  }
}

module.exports = PlayerTwo
