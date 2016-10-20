require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Loader = require('./loader')

const gameBtn = document.getElementById('game-btn')

gameBtn.addEventListener('click', () => {
  const classes = gameBtn.classList
  classes.add('hidden')
  const playerOneScore = document.getElementById('player-one-score').classList
  playerOneScore.remove('hidden')
  const playerTwoScore = document.getElementById('player-two-score').classList
  playerTwoScore.remove('hidden')
  const quitText = document.getElementById('quit-text').classList
  quitText.remove('hidden')
  const bomberman = new Loader(canvas, context)
  bomberman.startGame
})

document.addEventListener('keydown', e => {
  if (e.keyCode === 32) {
    const bomberman = new Loader(canvas, context)
    bomberman.startGame
  }
})
