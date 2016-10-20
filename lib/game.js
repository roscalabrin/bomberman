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
    this.timer = new Timer(this)
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
    this.context.font= '80px Space Mono';
    document.getElementById('next-game').classList.remove('hidden')
    document.getElementById('quit-text').classList.add('hidden')
    if (winner === 'quit') {
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById('game-over').classList.remove('hidden')
      document.getElementById('game').classList.add('hidden')
    } else {
      this.context.fillStyle = 'red';
      document.getElementById('game').classList.add('end-game')
      this.context.fillText(`${winner} Wins!`, 250, 100);
    }
  }
}

module.exports = Game
