const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')
const Score = require('./score')

class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.blocks = []
    this.firstPlayer = null
    this.secondPlayer = null
    this.bombs = []
    this.score = new Score()
  }

  getPlayers() {
    this.firstPlayer = new PlayerOne(this)
    this.secondPlayer = new PlayerTwo(this)
  }

  renderBlocks() {
    this.loadBlocks()
    this.blocks.forEach(block => {
      block.draw()
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
      this.blocks.push(new Block(x, y, this))
      x += 140
    }
  }
}

module.exports = Game
