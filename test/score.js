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

    it('updates the score at the end of the game', () => {
      const score = new Score()
      assert.equal(score.firstPlayer, 0)
      assert.equal(score.secondPlayer, 0)

      score.setFinalScore('Player One', 90)
      assert.equal(score.firstPlayer, 90)
      assert.equal(score.secondPlayer, 0)
    })
  })
})
