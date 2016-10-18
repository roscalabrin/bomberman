const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')
const BreakableBlock = require('./breakableBlock')
const Timer = require('./timer')
const Score = require('./score')

class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.blocks = []
    this.breakableBlocks = []
    this.bombs = []
    this.keys = []
    this.firstPlayer = null
    this.secondPlayer = null
    this.timer = new Timer()
    this.score = new Score()
    this.play = true
  }

  update(breakableCount) {
    if (this.timer.timeLeft === 100) this.drawBlocks()
    if (breakableCount !== this.breakableBlocks.length || this.timer.timeLeft === 100) {
      this.drawBreakables()
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
