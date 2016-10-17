const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')
const Timer = require('./timer')
const Score = require('./score')

class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.blocks = []
    this.bombs = []
    this.keys = []
    this.firstPlayer = null
    this.secondPlayer = null
    this.timer = new Timer()
    this.score = new Score()
    this.play = true
  }

  getPlayers() {
    this.firstPlayer = new PlayerOne(this)
    this.secondPlayer = new PlayerTwo(this)
  }

  drawBlocks() {
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

  removeBomb(targetBomb) {
    this.bombs = this.bombs.filter(bomb => {
      return targetBomb.x !== bomb.x &&
        targetBomb.y !== bomb.y
    })
  }

  endGame () {
    this.score.firstPlayer = this.timer.timeLeft
    this.score.secondPlayer = this.timer.timeLeft
    this.score.update()
    this.play = false
  }

  renderResult () {
    
  }
}
module.exports = Game
