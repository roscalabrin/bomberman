class Timer {
  constructor(game) {
    this.game = game
    this.timeLeft = 100
    this.timeCounter = null
  }

  placeTimer() {
    const timerDisplay = document.getElementById('game-timer')
    timerDisplay.innerText = `Timer: ${this.timeLeft}`
  }

  setTimer() {
    this.timeCounter = setInterval(this.runTimer.bind(this), 1000)
  }

  runTimer() {
    this.timeLeft --
    document.getElementById('game-timer').innerText = `Timer: ${this.timeLeft}`
    if (this.timeLeft === 0) { 
      clearInterval(this.timeCounter)
      this.game.endGame('quit')
    }
  }
}

module.exports = Timer 
