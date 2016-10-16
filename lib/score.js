class Score {
  constructor() {
    this.timeLeft = 10
    this.timeCounter = null
  }

  placeTimer() {
    const timer = document.createElement("p")
    timer.className = "game-timer"
    const node = document.createTextNode(this.timeLeft)
    timer.appendChild(node)
    const element = document.getElementById("game-stats")
    element.appendChild(timer)
  }

  setTimer() {
    this.timeCounter = setInterval(this.runTimer.bind(this), 1000)
  }

  runTimer() {
    this.timeLeft --
    document.getElementsByClassName("game-timer")[0].innerText = this.timeLeft
    if (this.timeLeft <= 0) { 
      clearInterval(this.timeCounter)
    }
  }

}

module.exports = Score
