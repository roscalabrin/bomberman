const Block = require('./block')
const PlayerOne = require('./playerOne')
const PlayerTwo = require('./playerTwo')
const BreakableBlock = require('./breakableBlock')
const Timer = require('./timer')
const Score = require('./score')
const DefaultMap = require('./defaultMap')
const SmallMap = require('./smallMap')

class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.keys = []
    this.firstPlayer = null
    this.secondPlayer = null
    this.timer = new Timer()
    this.score = new Score()
    this.map = new DefaultMap(this)
    this.play = true
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
    const mapName = this.map.constructor.name
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

  endGame (winner) {
    this.play = false
    clearInterval(this.timer.timeCounter)
    this.context.font= "60px Arial";
    if (winner === 'quit') {
      this.context.fillText("Game Over", 350, 250);
    } else {
      this.context.fillText(`${winner} Wins!`, 350, 250);
    }
  }
}

module.exports = Game
