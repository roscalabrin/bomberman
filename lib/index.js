require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Grid = require('./grid')

const bomberGrid = new Grid(canvas, context)

bomberGrid.renderBlocks()
bomberGrid.drawPlayer()

document.addEventListener('keydown', movePlayerOne)

function movePlayerOne(e) {
  if (e.keyCode === 39) {
    bomberGrid.firstPlayer.moveRight()
  }

  else if (e.keyCode === 37) {
    bomberGrid.firstPlayer.moveLeft()
  }

  else if (e.keyCode === 38) {
    bomberGrid.firstPlayer.moveUp()
  }

  else if (e.keyCode === 40) {
    bomberGrid.firstPlayer.moveDown()
  }
}
