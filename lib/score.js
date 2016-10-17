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
    const element = document.getElementById("game-stats")
    element.appendChild(scoresDisplay)
  }

  update() {
    this.firstPlayerNode.textContent = `Player One Score: ${this.firstPlayer}`
    this.secondPlayerNode.textContent = `Player Two Score: ${this.secondPlayer}`
  }
}

module.exports = Score
