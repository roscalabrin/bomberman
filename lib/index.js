require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./game')

const match = new Game(canvas, context)

function play() {
  if (match.blocks.length === 0) match.renderBlocks()
  match.firstPlayer.draw()
  match.secondPlayer.draw()
  requestAnimationFrame(play)
}

play()
