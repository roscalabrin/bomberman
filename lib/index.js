require ('./styles')
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Grid = require('./grid')

const bomberGrid = new Grid(canvas)

bomberGrid.renderBlocks(context)
