require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./game')

const game = new Game(canvas, context)
game.getPlayers()
game.firstPlayer.bindControls()
game.secondPlayer.bindControls()
game.map.loadBlocks()
game.map.loadBreakables()

function play() {
  if (game.play) {
    const breakables = game.map.breakableBlocks.length
    const classes = document.getElementById("game").classList
    classes.remove("hidden")
    game.update(breakables)
    requestAnimationFrame(play)
  }
}

const gameBtn = document.getElementById("game-btn")
gameBtn.addEventListener('click', startGame)

function startGame(e) {
  e.target.innerText = "Quit Game"
  // game.map.drawBreakables()
  play()
  game.timer.placeTimer()
  game.timer.setTimer()
  game.score.setInitialScore()
  game.score.placeHighestScore()
  e.target.removeEventListener('click', startGame)
  e.target.addEventListener('click', function() {
    clearInterval(game.timer.timeCounter)
    game.endGame("quit")
  })
}

function gameOver() {
  document.getElementById("game").classList.add("hidden")
}
