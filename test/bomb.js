const stub = require('./support/stub')
const assert = require('chai').assert
const Bomb = require('./../lib/bomb')

describe('Bomb', () => {
  context('methods', () => {
    context('draw', () => {
      it('draws itself by filling the rectangle', () => {
        const context = stub().of('fillRect')
        const bomby = new Bomb(30, 30, context)


        bomby.draw()
        assert.equal(context.fillRect.calls.length, 1)
        assert.equal(context.fillRect.calls[0][0], 30)
        assert.equal(context.fillRect.calls[0][1], 30)
      })
    })

    context('bang', () => {
      it('blows itself up in size', () => {
        const context = stub().of('fillRect')
        const bomby = new Bomb(30, 30, context)

        assert.equal(bomby.height, 15)
        bomby.bang()
        assert.isAbove(bomby.height, 150)
      })

      it('fills the rectangle many times', () => {
        const context = stub().of('fillRect')
        const bomby = new Bomb(30, 30, context)

        assert.equal(context.fillRect.calls.length, 0)
        bomby.bang()
        assert.isAbove(context.fillRect.calls.length, 15)
        assert.equal(context.fillRect.calls[0][0], 30)
        assert.equal(context.fillRect.calls[0][1], 30)
      })
    })

    context('clear', () => {
      it('clears the rectangle', () => {
        const context = stub().of('clearRect')
        const bomby = new Bomb(30, 30, context)
        bomby.clear()

        assert.equal(context.clearRect.calls.length, 1)
      })
    })
  })
})
