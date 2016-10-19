require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Loader = require('./loader')

new Loader(canvas, context)

/*document.addEventListener('keydown', e => {
  if (e.keyCode === 32) {
    const bomberman = new Loader(canvas, context)
  }
})*/
