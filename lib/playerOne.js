const Player = require('./player')

class PlayerOne extends Player {
  constructor(canvas, context) {
    super(0, 0, canvas, context)
    this.bindControls()
  }
  
  bindControls() {
    document.addEventListener('keydown', this.direction.bind(this))
  }
  
  direction(e){
    if (e.keyCode === 39) {
      this.moveRight()
    }

    else if (e.keyCode === 37) {
      this.moveLeft()
    }

    else if (e.keyCode === 38) {
      this.moveUp()
    }

    else if (e.keyCode === 40) {
      this.moveDown()
    }
  }
}

module.exports = PlayerOne
