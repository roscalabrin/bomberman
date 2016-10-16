require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./game')

const game = new Game(canvas, context)
game.getPlayers()

function play() {
  const classes = document.getElementById("game").classList
  classes.remove("hidden")
  if (game.blocks.length === 0) game.renderBlocks()
  game.firstPlayer.draw()
  game.firstPlayer.update()
  game.secondPlayer.draw()
  game.secondPlayer.update()
  requestAnimationFrame(play)
}

const gameBtn = document.getElementById("game-btn")
gameBtn.addEventListener('click', startGame)

function startGame(e) {
  e.target.innerText = "Quit Game"
  play()
  game.score.placeTimer()
  game.score.setTimer()
  e.target.removeEventListener('click', startGame)
  e.target.addEventListener('click', function() {
    clearInterval(game.score.timeCounter)
    console.log(game.score.timeLeft)
  })
}
