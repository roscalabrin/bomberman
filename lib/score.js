class Score {
  constructor() {
    this.firstPlayerScore = 0
    this.secondPlayerScore = 0
  }

  setInitialScore() {
    const scoresDisplay = document.createElement("ul")
    scoresDisplay.className = "game-scores"
    const playerOneScore = document.createElement("li")
    playerOneScore.className = "player-one-score"
    const playerTwoScore = document.createElement("li")
    playerTwoScore.className = "player-two-score"
    const nodeOne = document.createTextNode(`Player One Score: ${this.firstPlayerScore}`)
    const nodeTwo = document.createTextNode(`Player Two Score: ${this.secondPlayerScore}`)
    playerOneScore.appendChild(nodeOne)
    playerTwoScore.appendChild(nodeTwo)
    scoresDisplay.appendChild(playerOneScore)
    scoresDisplay.appendChild(playerTwoScore)
    const element = document.getElementById("game-stats")
    element.appendChild(scoresDisplay)
  }
}

module.exports = Score
