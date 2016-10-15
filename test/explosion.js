const Game = require('./../lib/game')
const stub = require('./support/stub')
const assert = require('chai').assert
const Explosion = require('./../lib/explosion')
const canvas = { width: 1470, height: 770 }

describe('Explosion', () => {
  context('properties', () => {
    it('has an initial width', () => {
      const ex = new Explosion()
      assert.equal(ex.width, 0)
    })

    it('has an initial height', () => {
      const ex = new Explosion()
      assert.equal(ex.height, 0)
    })
  })

  context('fillPrimaryRect', () => {
    it('blows itself up in size', () => {
      const context = stub().of('fillRect')
      const game = new Game(canvas, context)
      const ex = new Explosion(0, 0, game)

      ex.fillPrimaryRect()

      assert.equal(ex.height, 70)
      assert.equal(ex.width, 70)
    })

    it('fills the rectangle', () => {
      const context = stub().of('fillRect')
      const game = new Game(canvas, context)
      const ex = new Explosion(0, 0, game)

      assert.equal(context.fillRect.calls.length, 0)
      ex.fillPrimaryRect()

      const maxWidth = context.fillRect.calls.slice(-1)[0][2]
      const maxHeight = context.fillRect.calls.slice(-1)[0][3]

      assert.isAbove(context.fillRect.calls.length, 3)
      assert.equal(maxHeight, 70)
      assert.equal(maxWidth, 70)
    })
  })

  context('clear', () => {
    it('clears the rectangle', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const ex = new Explosion(0, 0, game)

      ex.fillPrimaryRect()
      ex.clear()

      const minWidth = context.clearRect.calls.slice(-1)[0][0]
      const minHeight = context.clearRect.calls.slice(-1)[0][1]

      assert.equal(context.clearRect.calls.length, 1)
      assert.equal(minWidth, 0)
      assert.equal(minHeight, 0)
    })

    it('clears itself shortly after exploding', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const ex = new Explosion(0, 0, game)
      const clearCalls = context.clearRect.calls.legnth

      ex.fillPrimaryRect()

      setTimeout(assert.equal.bind(assert, clearCalls, 1), 100)
      setTimeout(assert.equal.bind(assert, ex.height, 0), 100)
      setTimeout(assert.equal.bind(assert, ex.width, 0), 100)
    })
  })
})
