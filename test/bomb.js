const stub = require('./support/stub')
const assert = require('chai').assert
const Game = require('./../lib/game')
const Bomb = require('./../lib/bomb')
const canvas = { width: 1470, height: 770 }
const image = 'bomberman2_various_sheet.png'

describe('Bomb', () => {
  context('methods', () => {
    context('draw', () => {
      it('draws itself by filling the rectangle', () => {
        const context = stub().of('fillRect')
        const game = new Game(canvas, context)
        const bomby = new Bomb(30, 30, game, image)

        bomby.draw()
        assert.equal(context.fillRect.calls.length, 1)
        assert.equal(context.fillRect.calls[0][0], 30)
        assert.equal(context.fillRect.calls[0][1], 30)
      })
    })
  })
})
