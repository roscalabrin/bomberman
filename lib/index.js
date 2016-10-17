require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./game')

const game = new Game(canvas, context)
game.getPlayers()
game.loadBlocks()

function play() {
  const classes = document.getElementById("game").classList
  classes.remove("hidden")
  game.drawBlocks()
  game.firstPlayer.drawSprite()
  game.firstPlayer.update()
  game.secondPlayer.drawSprite()
  game.secondPlayer.update()
  requestAnimationFrame(play)
}

const gameBtn = document.getElementById("game-btn")
gameBtn.addEventListener('click', startGame)

function startGame(e) {
  e.target.innerText = "Quit Game"
  play()
  game.timer.placeTimer()
  game.timer.setTimer()
  game.score.setInitialScore()
  e.target.removeEventListener('click', startGame)
  e.target.addEventListener('click', function() {
    clearInterval(game.timer.timeCounter)
    gameOver()
  })
}

function gameOver() {
  document.getElementById("game").classList.add("hidden")
}
