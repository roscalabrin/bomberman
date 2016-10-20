const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')
const BreakableBlock = require('./breakableBlock')
const Timer = require('./timer')
const Score = require('./score')
const DefaultMap = require('./defaultMap')
const SmallMap = require('./smallMap')

class Game {
  constructor(canvas, context, level) {
    this.canvas = canvas
    this.context = context
    this.keys = []
    this.firstPlayer = null
    this.secondPlayer = null
    this.timer = new Timer()
    this.score = new Score()
    this.level = level
    this.map
    this.setLevel(this.level)
    this.play = true
    this.quitOption()
  }

  setLevel(level) {
    if (level === 'DefaultMap') {
      this.map = new DefaultMap(this)
    } else {
      this.map = new SmallMap(this)
    }
  }
  
  update(breakableCount) {
    if (this.timer.timeLeft === 100) this.map.drawBlocks()
    if (this.map.constructor.name === 'DefaultMap') {
      this.map.updateBreakables(breakableCount)
    }
    this.firstPlayer.draw('primarySprite')
    this.firstPlayer.keyPressCheck()
    this.secondPlayer.draw('primarySprite')
    this.secondPlayer.keyPressCheck()
  }

  configPlayers() {
    this.firstPlayer = new PlayerOne(null, null, this)
    this.secondPlayer = new PlayerTwo(null, null, this)
    //const mapName = this.map.constructor.name
    const mapName = this.level
    let coordsOne
    let coordsTwo
    if (mapName === 'DefaultMap') {
      coordsOne = this.getStartingLocations()['mapOne']['playerOne']
      coordsTwo = this.getStartingLocations()['mapOne']['playerTwo']
    }
    if (mapName === 'SmallMap') {
      coordsOne = this.getStartingLocations()['mapTwo']['playerOne']
      coordsTwo = this.getStartingLocations()['mapTwo']['playerTwo']
    }
    this.setStartingLocations(coordsOne, coordsTwo)
  }

  getStartingLocations() {
    return {
      mapOne: { playerOne: { x: 35, y: 35 }, playerTwo: { x: 1120, y: 560 } },
      mapTwo: { playerOne: { x: 280, y: 140 }, playerTwo: { x: 875, y: 455 } }
    }
  }

  setStartingLocations(firstPlayerCoords, secondPlayerCoords) {
    this.firstPlayer.x = firstPlayerCoords.x
    this.firstPlayer.y = firstPlayerCoords.y
    this.secondPlayer.x = secondPlayerCoords.x
    this.secondPlayer.y = secondPlayerCoords.y
  }

  quitOption() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.endGame('quit')
      }
    })
  }

  endGame (winner) {
    this.play = false
    clearInterval(this.timer.timeCounter)
    this.firstPlayer.clear()
    this.secondPlayer.clear()
    this.context.font= "60px Arial";
    if (winner === 'quit') {
      this.context.fillText("Game Over", 350, 250);
      this.context.fillText("Press SPACE BAR to Start a New Game", 350, 450);
    } else {
      this.context.fillText(`${winner} Wins!`, 350, 250);
      this.context.fillText("Press SPACE BAR to Start a New Game", 350, 450);
    }
    const gameBtn = document.getElementById("game-btn")
    gameBtn.innerText = "Play Again"
  }
}

module.exports = Game
