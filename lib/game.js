const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')
const BreakableBlock = require('./breakableBlock')
const Timer = require('./timer')
const Score = require('./score')
const Map = require('./map')

class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.keys = []
    this.firstPlayer = null
    this.secondPlayer = null
    this.timer = new Timer()
    this.score = new Score()
    this.map = new Map(this)
    this.play = true
  }

  update(breakableCount) {
    if (this.timer.timeLeft === 100) this.map.drawBlocks()
    if (breakableCount !== this.map.breakableBlocks.length || this.timer.timeLeft === 100) {
      this.map.drawBreakables()
    }
    this.firstPlayer.draw('primarySprite')
    this.firstPlayer.keyPressCheck()
    this.secondPlayer.draw('primarySprite')
    this.secondPlayer.keyPressCheck()
  }

  getPlayers() {
    this.firstPlayer = new PlayerOne(this)
    this.secondPlayer = new PlayerTwo(this)
  }

  quitGame () {
    this.score.firstPlayer += 0
    this.score.secondPlayer += 0
    this.score.update()
    this.play = false
    this.context.font= "60px Arial";
    this.context.fillText("Game Over", 490, 250);
    const gameBtn = document.getElementById("game-btn")
    gameBtn.innerText = "Start Game"
  }

  endGame (winner) {
    this.play = false
    clearInterval(this.timer.timeCounter)
    this.context.font= "60px Arial";
    if (winner === 'quit') {
      this.context.fillText("Game Over", 490, 250);
    } else {
      this.context.fillText(`${winner} Wins!`, 490, 250);
    }
    const gameBtn = document.getElementById("game-btn")
    gameBtn.innerText = "Start Game"
  }
}
module.exports = Game
