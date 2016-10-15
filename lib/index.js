require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./game')

const game = new Game(canvas, context)
game.getPlayers()

function play() {
  if (game.blocks.length === 0) game.renderBlocks()
  game.firstPlayer.draw()
  game.secondPlayer.draw()
  requestAnimationFrame(play)
}

play()
