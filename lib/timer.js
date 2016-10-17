class Timer {
  constructor() {
    this.timeLeft = 10
    this.timeCounter = null
  }

  placeTimer() {
    const timerDisplay = document.createElement("p")
    timerDisplay.className = "game-timer"
    const node = document.createTextNode(`Timer: ${this.timeLeft}`)
    timerDisplay.appendChild(node)
    const element = document.getElementById("game-stats")
    element.appendChild(timerDisplay)
  }

  setTimer() {
    this.timeCounter = setInterval(this.runTimer.bind(this), 1000)
  }

  runTimer() {
    this.timeLeft --
    document.getElementsByClassName("game-timer")[0].innerText = `Timer: ${this.timeLeft}`
    if (this.timeLeft <= 0) { 
      clearInterval(this.timeCounter)
    }
  }

}

module.exports = Timer 
