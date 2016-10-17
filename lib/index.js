require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./game')

const game = new Game(canvas, context)
game.getPlayers()
game.loadBlocks()
game.loadBreakables()

function play() {
  const classes = document.getElementById("game").classList
  const breakables = game.breakableBlocks.length
  classes.remove("hidden")
  game.update()
  requestAnimationFrame(play)
}

const gameBtn = document.getElementById("game-btn")
gameBtn.addEventListener('click', startGame)

function startGame(e) {
  e.target.innerText = "Quit Game"
  game.drawBreakables()
  play()
  game.score.placeTimer()
  game.score.setTimer()
  e.target.removeEventListener('click', startGame)
  e.target.addEventListener('click', function() {
    clearInterval(game.score.timeCounter)
    console.log(game.score.timeLeft)
  })
}

function drawBreakables(breakables) {
  if (game.breakableBlocks.length !== breakables) {
    game.drawBreakables()
  }
}
