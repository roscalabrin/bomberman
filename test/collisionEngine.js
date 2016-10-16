const assert = require('chai').assert
const CollisionEngine = require('./../lib/helpers/collisionEngine')
const stub = require('./support/stub')
const Game = require('./../lib/game')
const Player = require('./../lib/player')
const Bomb = require('./../lib/bomb')
const FireBlock = require('./../lib/fireBlock')
const Block = require('./../lib/block')
const canvas = { width: 1470, height: 770 }

describe('CollisionEngine', () => {
  context('player cannot go through blocks', () => {
    const context = stub().of('fillRect').of('clearRect')
    const game = new Game(canvas, context)
    it('can detect if there is a block above', () => {
      const bomber = new Player(30, 740, game)
      assert.equal(bomber.y, 740)

      bomber.moveDown()
      assert.equal(bomber.y, 740)
    })

    it('can detect if there is a block below', () => {
      const bomber = new Player(30, 30, game)
      assert.equal(bomber.y, 30)

      bomber.moveUp()
      assert.equal(bomber.x, 30)
    })

    it('can detect if there is a block to the right', () => {
      const bomber = new Player(1470, 770, game)
      assert.equal(bomber.x, 1470)

      bomber.moveRight()
      assert.equal(bomber.x, 1470)

    })

    it('can detect if there is a block  to the left', () => {
      const bomber = new Player(0, 773, game)
      assert.equal(bomber.x, 0)

      bomber.moveLeft()
      assert.equal(bomber.x, 0)
    })
  })


  context('player cannot go through bomb', () => {
    const context = stub().of('fillRect').of('clearRect')
    const game = new Game(canvas, context)

    it('can detect if bomb is below', () => {
      const bomber = new Player(25, 25, game)
      bomber.plantBomb()
      const bomb = game.bombs[0]

      bomber.moveDown()
      assert.equal(bomber.y, 25)
    })

    it('can detect of bomb is to the right', () => {
      const bomb = new Bomb(75, 25, game)
      const bomber = new Player(null, 25, game)
      const bomberX = bomb.x - bomber.width
      bomber.x = bomberX
      game.bombs.push(bomb)

      bomber.moveRight()
      assert.equal(bomber.x, 40)
    })

    it('can detect if bomb is above', () => {
      const bomb = new Bomb(25, 25, game)
      const bomber = new Player(25, null, game)
      const bomberY = bomb.y + bomb.height
      bomber.y = bomberY
      game.bombs.push(bomb)

      bomber.moveUp()
      assert.equal(bomber.y, 40)
    })

    it('can detect if bomb is to left', () => {
      const bomb = new Bomb(25, 25, game)
      const bomber = new Player(null, 25, game)
      const bomberX = bomb.x + bomb.width
      bomber.x = bomberX
      game.bombs.push(bomb)

      bomber.moveLeft()
      assert.equal(bomber.x, 40)
    })
  })

  context('fire explosion cannot go through blocks', () => {
    const ce = new CollisionEngine()
    const context = stub().of('fillRect').of('clearRect')
    const game = new Game(canvas, context)
    it('can detect if there is a block above', () => {
      const block = new Block(25, 25, game)
      const fBlock = new FireBlock(25, null, game)
      const fBlockY = block.y + block.height
      fBlock.y = fBlockY
      const outcome = ce.blockAbove.call(fBlock, block)

      assert.equal(outcome, true)
    })

    it('can detect if there is a block below', () => {
      const block = new Block(25, 25, game)
      const fBlock = new FireBlock(25, null, game)
      const fBlockY = block.y - fBlock.height
      fBlock.y = fBlockY
      const outcome = ce.blockBelow.call(fBlock, block)

      assert.equal(outcome, true)
    })

    it('can detect if there is a block to the right', () => {
      const block = new Block(100, 25, game)
      const fBlock = new FireBlock(null, 25, game)
      const fBlockX = block.x - fBlock.width
      fBlock.x = fBlockX
      const outcome = ce.blockRight.call(fBlock, block)

      assert.equal(outcome, true)
    })

    it('can detect if there is a block to the left', () => {
      const block = new Block(100, 25, game)
      const fBlock = new FireBlock(null, 25, game)
      const fBlockX = block.x + block.width
      fBlock.x = fBlockX
      const outcome = ce.blockLeft.call(fBlock, block)

      assert.equal(outcome, true)
    })
  })
})
