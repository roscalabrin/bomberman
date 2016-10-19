class Map {
  constructor(game) {
    this.game = game
    this.canvas = game.canvas
    this.context = game.context
    this.blocks = []
    this.breakableBlocks = []
    this.bombs = []
  }

  drawBlocks() {
    this.blocks.forEach(block => block.draw('primarySprite'))
  }

  removeBomb(targetBomb) {
    this.bombs = this.bombs.filter(bomb => {
      return targetBomb.x !== bomb.x &&
        targetBomb.y !== bomb.y
    })
  }

  removeBreakableBlocks(targetBlocks) {
    this.breakableBlocks = this.breakableBlocks.filter( b => {
      const index = targetBlocks.findIndex( block => {
        return block.x === b.x && block.y === b.y
      })
      return index === -1
    })
  }
}

module.exports = Map
