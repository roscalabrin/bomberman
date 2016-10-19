class Score {
  constructor() {
    this.firstPlayer = 0
    this.secondPlayer = 0
    this.firstPlayerNode
    this.secondPlayerNode
  }

  setInitialScore() {
    const scoresDisplay = document.createElement("ul")
    scoresDisplay.className = "game-scores"
    const element = document.getElementById("game-current-scores")
    element.appendChild(scoresDisplay)
    const playerOneScore = document.createElement("li")
    playerOneScore.className = "player-one-score"
    const playerTwoScore = document.createElement("li")
    playerTwoScore.className = "player-two-score"
    this.firstPlayerNode = document.createTextNode(`Player One Score: ${this.firstPlayer}`)
    this.secondPlayerNode = document.createTextNode(`Player Two Score: ${this.secondPlayer}`)
    playerOneScore.appendChild(this.firstPlayerNode)
    playerTwoScore.appendChild(this.secondPlayerNode)
    scoresDisplay.appendChild(playerOneScore)
    scoresDisplay.appendChild(playerTwoScore)
  }

  placeHighestScore() {
    const highestScore = document.createElement("p")
    highestScore.className = "highest-score"
    const node = document.createTextNode(`Highest Score: ${localStorage.getItem('highest-score')}`)
    highestScore.appendChild(node)
    const element = document.getElementById("game-stats")
    element.appendChild(highestScore)
    debugger
  }
  
  setFinalScore(winner, timeLeft) {
    if (timeLeft > localStorage.getItem('highest-score')) {
      localStorage.setItem('highest-score', timeLeft)
    } 
    if (winner === 'Player One') {
      this.firstPlayer += timeLeft
    } else if (winner === 'Player Two') {
      this.secondPlayer += timeLeft
    }
  }
  
  update() {
    this.firstPlayerNode.textContent = `Player One Score: ${this.firstPlayer}`
    this.secondPlayerNode.textContent = `Player Two Score: ${this.secondPlayer}`
  }
}

module.exports = Score
