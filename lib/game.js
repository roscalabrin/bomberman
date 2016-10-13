const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')


class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.blocks = []
    this.firstPlayer = new PlayerOne(canvas, context)
    this.secondPlayer = new PlayerTwo(canvas, context)
  }

  renderBlocks() {
    this.loadBlocks()
    this.firstPlayer.blocks = this.blocks
    this.secondPlayer.blocks = this.blocks
    this.blocks.forEach(block => {
      this.context.fillRect(block.x, block.y, block.width, block.height)
    })
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
      this.blocks.push(new Block(x, y))
      x += 140
    }
  }
}

module.exports = Game