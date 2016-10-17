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
    game.loadBlocks()
    const ce = new CollisionEngine(game)
    it('can detect if there is a block above', () => {
      const bomber = new Player(70, 140, game)
      const blocksAbove = game.blocks.filter(ce.upCollide.bind(bomber))

      assert.isAbove(blocksAbove.length, 0)
    })

    it('can detect if there is a block below', () => {
      const bomber = new Player(70, null, game)
      const bomberY = 70 - bomber.height
      bomber.y = bomberY
      const blocksBelow = game.blocks.filter(ce.downCollide.bind(bomber))

      assert.isAbove(blocksBelow.length, 0)
    })

    it('can detect if there is a block to the right', () => {
      const bomber = new Player(null, 70, game)
      const bomberX = 70 - bomber.width
      bomber.x = bomberX
      const blocksRight = game.blocks.filter(ce.rightCollide.bind(bomber))

      assert.isAbove(blocksRight.length, 0)
    })

    it('can detect if there is a block to the left', () => {
      const bomber = new Player(null, 70, game)
      const bomberX = 70 + game.blocks[0].width
      bomber.x = bomberX
      const blocksLeft = game.blocks.filter(ce.leftCollide.bind(bomber))

      assert.isAbove(blocksLeft.length, 0)
    })
  })


  context('player cannot go through bomb', () => {

    it('can detect if bomb is below', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const ce = new CollisionEngine(game)
      const bomber = new Player(25, 25, game)
      const bomb = new Bomb(25, bomber.y + bomber.height, game)
      game.bombs.push(bomb)
      const bombsBelow = game.bombs.filter(ce.bombBelow.bind(bomber))

      assert.equal(bombsBelow.length, 1)
    })

    it('can detect of bomb is to the right', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const ce = new CollisionEngine(game)
      const bomb = new Bomb(75, 25, game)
      const bomber = new Player(null, 25, game)
      const bomberX = bomb.x - bomber.width
      bomber.x = bomberX
      game.bombs.push(bomb)
      const bombRight = game.bombs.filter(ce.bombRight.bind(bomber))

      assert.equal(bombRight.length, 1)
    })

    it('can detect if bomb is above', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const ce = new CollisionEngine(game)
      const bomb = new Bomb(25, 25, game)
      const bomber = new Player(25, null, game)
      const bomberY = bomb.y + bomb.height
      bomber.y = bomberY
      game.bombs.push(bomb)
      const bombsAbove = game.bombs.filter(ce.bombAbove.bind(bomber))

      assert.equal(bombsAbove.length, 1)
    })

    it('can detect if bomb is to left', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const ce = new CollisionEngine(game)
      const bomb = new Bomb(25, 25, game)
      const bomber = new Player(null, 25, game)
      const bomberX = bomb.x + bomb.width
      bomber.x = bomberX
      game.bombs.push(bomb)
      const bombLeft = game.bombs.filter(ce.bombLeft.bind(bomber))

      assert.equal(bombLeft.length, 1)
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
