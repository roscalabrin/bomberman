class Score {
  constructor() {
    this.firstPlayer = 0
    this.secondPlayer = 0
    this.firstPlayerNode
    this.secondPlayerNode
  }

  setInitialScore() {
    const playerOneScore = document.getElementById("player-one-score")
    playerOneScore.innerText = `Player One Score: ${this.firstPlayer}`
    const playerTwoScore = document.getElementById("player-two-score")
    playerTwoScore.innerText = `Player Two Score: ${this.secondPlayer}`
  }

  placeHighestScore() {
    const highestScore = document.getElementById("highest-score")
    highestScore.innerText = `Highest Score: ${localStorage.getItem('highest-score')}`
  }
  
  setFinalScore(winner, timeLeft) {
    if (timeLeft > localStorage.getItem('highest-score')) {
      localStorage.setItem('highest-score', timeLeft)
      this.placeHighestScore()
    } 
    if (winner === 'Player One') {
      this.firstPlayer = timeLeft
    } else if (winner === 'Player Two') {
      this.secondPlayer = timeLeft
    }
  }
  
  update() {
    const playerOneScore = document.getElementById("player-one-score")
    playerOneScore.innerText = `Player One Score: ${this.firstPlayer}`
    const playerTwoScore = document.getElementById("player-two-score")
    playerTwoScore.innerText = `Player Two Score: ${this.secondPlayer}`
  }
}

module.exports = Score
