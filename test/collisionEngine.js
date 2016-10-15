const assert = require('chai').assert
const CollisionEngine = require('./../lib/helpers/collisionEngine')
const stub = require('./support/stub')
const Game = require('./../lib/game')
const Player = require('./../lib/player')
const canvas = { width: 1470, height: 770 }

describe('CollisionEngine', () => {
  context('methods', () => {
    context('player collisions', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      it('can detect if immovable object is above', () => {
        const bomber = new Player(30, 740, game)
        assert.equal(bomber.y, 740)

        bomber.moveDown()
        assert.equal(bomber.y, 740)
      })

      it('can detect if immovable object is below', () => {

        const bomber = new Player(30, 30, game)
        assert.equal(bomber.y, 30)

        bomber.moveUp()
        assert.equal(bomber.x, 30)
      })

      it('can detect if immovable object is to the right', () => {
        const bomber = new Player(1470, 770, game)
        assert.equal(bomber.x, 1470)

        bomber.moveRight()
        assert.equal(bomber.x, 1470)

      })

      it('can detect if immovable object is to the left', () => {
        const bomber = new Player(0, 773, game)
        assert.equal(bomber.x, 0)

        bomber.moveLeft()
        assert.equal(bomber.x, 0)
      })
    })

    context('fire collisions', () => {
      /* ADD TESTS FOR EXPLOSION COLLISIONS */
    })
  })
})


