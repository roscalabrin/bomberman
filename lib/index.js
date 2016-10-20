require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Loader = require('./loader')

const normalBtn = document.getElementById('game-normal-mode')
const speedBtn = document.getElementById('game-speed-mode')

normalBtn.addEventListener('click', () => {
  normalBtn.classList.add('hidden')
  speedBtn.classList.add('hidden')
  const playerOneScore = document.getElementById('player-one-score').classList
  playerOneScore.remove('hidden')
  const playerTwoScore = document.getElementById('player-two-score').classList
  playerTwoScore.remove('hidden')
  const quitText = document.getElementById('quit-text').classList
  quitText.remove('hidden')
  const bomberman = new Loader(canvas, context, 'DefaultMap')
  bomberman.startGame
})

speedBtn.addEventListener('click', () => {
  speedBtn.classList.add('hidden')
  normalBtn.classList.add('hidden')
  const playerOneScore = document.getElementById('player-one-score').classList
  playerOneScore.remove('hidden')
  const playerTwoScore = document.getElementById('player-two-score').classList
  playerTwoScore.remove('hidden')
  const quitText = document.getElementById('quit-text').classList
  quitText.remove('hidden')
  const bomberman = new Loader(canvas, context, 'SmallMap')
  bomberman.startGame
})

document.addEventListener('keydown', e => {
  if (e.keyCode === 32) {
    const bomberman = new Loader(canvas, context)
    bomberman.startGame
  }
})
