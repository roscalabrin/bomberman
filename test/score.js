const Game = require('./../lib/game')
const stub = require('./support/stub')
const assert = require('chai').assert
const Score = require('./../lib/score')
const canvas = { width: 1470, height: 770 }

describe('Score', () => {
  context('properties', () => {
    it('has a initial score for each player', () => {
      const initialScore = new Score()
      assert.equal(initialScore.firstPlayer, 0)
      assert.equal(initialScore.secondPlayer, 0)
    })
  })
})
