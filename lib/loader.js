const Game = require('./game')

class Loader {
  constructor(canvas, context) {
  this.game = new Game(canvas, context)
  this.loadGame()
  }

  loadGame() {
    this.game.configPlayers()
    this.game.firstPlayer.bindControls()
    this.game.secondPlayer.bindControls()
    this.game.map.loadBlocks()
    if (this.game.map.constructor.name === 'DefaultMap') this.game.map.loadBreakables()
    this.game.map.drawBlocks()
    this.startGame()
  }

  play() {
    if (this.game.play) {
      const breakables = this.game.map.breakableBlocks.length
      const classes = document.getElementById("game").classList
      classes.remove("hidden")
      const instructions = document.getElementById("instructions").classList
      instructions.add("hidden")
      this.game.update(breakables)
      requestAnimationFrame(this.play.bind(this))
    }
  }

  startGame() {
    this.game.map.drawBreakables()
    this.play()
    this.game.timer.placeTimer()
    this.game.timer.setTimer()
    this.game.score.setInitialScore()
    this.game.score.placeHighestScore()
  }
}

module.exports = Loader
