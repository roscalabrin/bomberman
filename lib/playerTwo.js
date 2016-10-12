const Player = require('./player')

class PlayerTwo extends Player {
  constructor(canvas, context) {
    super(1390, 710, canvas, context)
  }
}

module.exports = PlayerTwo
