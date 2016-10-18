const Block = require('./block')
const Bomb = require('./bomb')
const BreakableBlock = require('./breakableBlock')

class Map {
  constructor(game) {
    this.canvas = game.canvas
    this.context = game.context
    this.blocks = []
    this.breakableBlocks = []
    this.bombs = []
  }

  drawBlocks() {
    this.blocks.forEach(block => block.draw('primarySprite'))
  }

  drawBreakables() {
    this.breakableBlocks.forEach(block => block.draw('primarySprite'))
  }

  loadBreakables() {
    let y = 0
    let x = 0
    while(y < this.canvas.height) {
      /* first check for starting player corners */
      if (y === 0 || y === (this.canvas.height - 70)) {
        this.loadBreakableRowPlayer(x + 70, y)
      }
      else {
        this.loadBreakableRowFull(x, y)
      }
      y += 70
    }
    this.removeCornerBlocks()
  }

  removeCornerBlocks() {
    /* remove corner blocks for players to avoid blasts */
    this.breakableBlocks = this.breakableBlocks.filter(b => {
      return (b.x !== 0 || b.y !== 70) &&
        (b.x !== b.width || b.y !== 0) &&
        (b.x !== 0 || b.y !== (this.canvas.height - (b.height * 2))) &&
        (b.x !== 70 || b.y !== (this.canvas.height - b.height)) &&
        (b.x !== (this.canvas.width - (b.height * 2)) || b.y !== 0) &&
        (b.y !== 70 || b.x !== (this.canvas.width - b.height)) &&
        (b.y !== (this.canvas.height - b.height) || b.x !== (this.canvas.width - (b.width * 2))) &&
        (b.y !== (this.canvas.height - (b.height * 2)) || b.x !== (this.canvas.width - b.width))
    })
  }

  loadBreakableRowFull(x, y) {
    while(x < this.canvas.width) {
      this.breakableBlocks.push(new BreakableBlock(x, y, this))
      /* check for existing immovable blocks first
       * by skipping every other row */
      const row = y / 70
      if (row % 2 === 0) {
        x += 70
      }
      else {
      /* skip every other column to not overwrite existing blocks */
        x += 140
      }
    }
  }

  loadBreakableRowPlayer(x, y) {
      /* player corners have no existing blocks */
    while(x < this.canvas.width - 70) {
      this.breakableBlocks.push(new BreakableBlock(x, y, this))
      x += 70
    }
  }

  loadBlocks() {
    let y = 70
    while(y < this.canvas.height - 70) {
      this.loadRow(y)
      y += 140
    }
  }

  loadRow(y) {
    let x = 70
    while(x < this.canvas.width - 70) {
      this.blocks.push(new Block(x, y, this))
      x += 140
    }
  }

  removeBreakableBlocks(targetBlocks) {
    this.breakableBlocks = this.breakableBlocks.filter( b => {
      const index = targetBlocks.findIndex( block => {
        return block.x === b.x && block.y === b.y
      })
      return index === -1
    })
  }

  removeBomb(targetBomb) {
    this.bombs = this.bombs.filter(bomb => {
      return targetBomb.x !== bomb.x &&
        targetBomb.y !== bomb.y
    })
  }
}

module.exports = Map
