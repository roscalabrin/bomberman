const assert = require('chai').assert
const Player = require('./../lib/player')
const Game = require('./../lib/game')
const stub = require('./support/stub')
const canvas = { width: 1470, height: 770 }


describe('Player', () => {
  context('properties', () => {
    it('has x and y properties', () => {
      const bomberman = new Player()
      assert.property(bomberman, 'x')
      assert.property(bomberman, 'y')
    })

    it('has height and width properties', () => {
      const bomber = new Player()
      assert.property(bomber, 'height')
      assert.property(bomber, 'width')
    })

    it('has a speed property', () => {
      const bomber = new Player()
      assert.property(bomber, 'speed')
    })
  })

  context('property values', () => {
    const bomber = new Player(null, null)

    it('has starting default height and width', () => {
      assert.equal(bomber.height, 35)
      assert.equal(bomber.width, 35)
    })

    it('has a starting default speed', () => {
      assert.equal(bomber.speed, 3)
    })
  })

  context('move method', () => {

    it('should call fillRect on canvas', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(null, null, game)
      bomber.move()
      assert.equal(game.context.fillRect.calls.length, 1)
    })

    it('should pass its values to fillRect', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(null, null, game)
      bomber.move()
      const fillRectParams = game.context.fillRect.calls[0]
      assert.equal(fillRectParams[0], bomber.x)
      assert.equal(fillRectParams[1], bomber.y)
      assert.equal(fillRectParams[2], bomber.width)
      assert.equal(fillRectParams[3], bomber.height)
    })
  })

  context('clear method', () => {

    it('should call clearRect on canvas', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(null, null, game)
      bomber.clear()
      const clearRectCalls = game.context.clearRect.calls
      assert.equal(clearRectCalls.length, 1)
    })

    it('should pass properties to clearRect', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(null, null, game)
      bomber.clear()
      const clearRectParams = game.context.clearRect.calls[0]
      assert.equal(clearRectParams[0], bomber.x)
      assert.equal(clearRectParams[1], bomber.y)
      assert.equal(clearRectParams[2], bomber.width)
      assert.equal(clearRectParams[3], bomber.height)
    })
  })

  context('movement', () => {
    const context = stub().of('fillRect').of('clearRect')
    const game = new Game(canvas, context)
    const bomber = new Player(null, null, game)

    it('has a function called "moveRight"', () => {
      assert.isFunction(bomber.moveRight)
    })

    it('has a function called "moveLeft"', () => {
      assert.isFunction(bomber.moveLeft)
    })

    it('has a function called "moveUp"', () => {
      assert.isFunction(bomber.moveUp)
    })

    it('has a function called "moveDown"', () => {
      assert.isFunction(bomber.moveDown)
    })
  })

  context('movement results', () => {
    it('"moveRight" increases x by speed', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(30, 30, game)
      assert.equal(bomber.x, 30)

      bomber.speed = 7
      bomber.moveRight()
      assert.equal(bomber.x, 37)
    })

    it('"moveLeft" decreases x by speed', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(51, 30, game)
      assert.equal(bomber.x, 51)

      bomber.moveLeft()
      assert.equal(bomber.x, 48)
    })

    it('"moveUp" decreases y by speed', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(30, 31, game)
      assert.equal(bomber.y, 31)

      bomber.speed = 4
      bomber.moveUp()
      assert.equal(bomber.y, 27)
    })

    it('"moveDown" increases y by speed', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(30, 30, game)
      assert.equal(bomber.y, 30)

      bomber.speed = 1
      bomber.moveDown()
      assert.equal(bomber.y, 31)
    })
  })

  context('planting bombs', () => {
    it('can plant a bomb', () => {
      const context = stub().of('fillRect').of('clearRect')
      const game = new Game(canvas, context)
      const bomber = new Player(30, 30, game)

      assert.equal(game.bombs.length, 0)

      bomber.plantBomb()

      assert.equal(game.bombs.length, 1)
      assert.equal(context.fillRect.calls.length, 1)
    })
  })
})
