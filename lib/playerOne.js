const Player = require('./player')

class PlayerOne extends Player {
  constructor(canvas, context) {
    super(30, 30, canvas, context)
  }
}

module.exports = PlayerOne
