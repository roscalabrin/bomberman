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
    game.map.loadBlocks()
    it('can detect if there is a block above', () => {
      const bomber = new Player(70, 140, game)
      const openBlock = bomber.collisions.checkForOpenBlock()['player']['up']

      assert.equal(openBlock(), false)
    })

    it('can detect if there is a block below', () => {
      const bomber = new Player(70, null, game)
      const bomberY = 70 - bomber.height
      bomber.y = bomberY
      const openBlock = bomber.collisions.checkForOpenBlock()['player']['down']

      assert.equal(openBlock(), false)
    })

    it('can detect if there is a block to the right', () => {
      const bomber = new Player(null, 70, game)
      const bomberX = 70 - bomber.width
      bomber.x = bomberX
      const openBlock = bomber.collisions.checkForOpenBlock()['player']['right']

      assert.equal(openBlock(), false)
    })

    it('can detect if there is a block to the left', () => {
      const bomber = new Player(null, 70, game)
      const bomberX = 70 + bomber.map.blocks[0].width
      bomber.x = bomberX
      const openBlock = bomber.collisions.checkForOpenBlock()['player']['left']

      assert.equal(openBlock(), false)
    })
  })


  context('player cannot go through bomb', () => {

    it('can detect if bomb is below', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(25, 25, game)
      const bomb = new Bomb(25, bomber.y + bomber.height, game)
      bomber.map.bombs.push(bomb)
      const openArea = bomber.collisions.checkForOpenBlock()['player']['down']

      assert.equal(openArea(), false)
    })

    it('can detect of bomb is to the right', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomb = new Bomb(75, 25, game)
      const bomber = new Player(null, 25, game)
      const bomberX = bomb.x - bomber.width
      bomber.x = bomberX
      bomber.map.bombs.push(bomb)
      const openArea = bomber.collisions.checkForOpenBlock()['player']['right']

      assert.equal(openArea(), false)
    })

    it('can detect if bomb is above', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomb = new Bomb(25, 25, game)
      const bomber = new Player(25, null, game)
      const bomberY = bomb.y + bomb.height
      bomber.y = bomberY
      bomber.map.bombs.push(bomb)
      const openArea = bomber.collisions.checkForOpenBlock()['player']['up']

      assert.equal(openArea(), false)
    })

    it('can detect if bomb is to left', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomb = new Bomb(25, 25, game)
      const bomber = new Player(null, 25, game)
      const bomberX = bomb.x + bomb.width
      bomber.x = bomberX
      bomber.map.bombs.push(bomb)
      const openArea = bomber.collisions.checkForOpenBlock()['player']['left']

      assert.equal(openArea(), false)
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
