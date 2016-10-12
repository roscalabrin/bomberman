const assert = require('chai').assert
const Player = require('./../lib/player')
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
  })

  context('property values', () => {
    const context = stub().of('fillRect').of('clearRect')
    const bomber = new Player(null, null, canvas, context)

    it('has starting default height and width', () => {
      assert.equal(bomber.height, 30)
      assert.equal(bomber.width, 50)
    })
  })

  context('move method', () => {
    const context = stub().of('fillRect').of('clearRect')
    const bomber = new Player(null, null, canvas, context)

    it('should call fillRect on canvas', () => {
      bomber.move()
      assert.equal(bomber.context.fillRect.calls.length, 1)
    })

    it('should pass its values to fillRect', () => {
      bomber.move()
      const fillRectParams = bomber.context.fillRect.calls[0]
      assert.equal(fillRectParams[0], bomber.x)
      assert.equal(fillRectParams[1], bomber.y)
      assert.equal(fillRectParams[2], bomber.width)
      assert.equal(fillRectParams[3], bomber.height)
    })
  })

  context('clear method', () => {
    const context = stub().of('fillRect').of('clearRect')
    const bomber = new Player(null, null, canvas, context)

    it('should call clearRect on canvas', () => {
      bomber.clear()
      const clearRectCalls = bomber.context.clearRect.calls
      assert.equal(clearRectCalls.length, 1)
    })

    it('should pass properties to clearRect', () => {
      bomber.clear()
      const clearRectParams = bomber.context.clearRect.calls[0]
      assert.equal(clearRectParams[0], bomber.x)
      assert.equal(clearRectParams[1], bomber.y)
      assert.equal(clearRectParams[2], bomber.width)
      assert.equal(clearRectParams[3], bomber.height)
    })
  })

  context('movement', () => {
    const context = stub().of('fillRect').of('clearRect')
    const bomber = new Player(null, null, canvas, context)

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
    const context = stub().of('fillRect').of('clearRect')
    it('"moveRight" increases x by one', () => {
      const bomber = new Player(30, 30, canvas, context)
      assert.equal(bomber.x, 30)

      bomber.moveRight()
      assert.equal(bomber.x, 31)
    })

    it('"moveLeft" decreases x by one', () => {
      const bomber = new Player(51, 30, canvas, context)
      assert.equal(bomber.x, 51)

      bomber.moveLeft()
      assert.equal(bomber.x, 50)
    })

    it('"moveUp" decreases y by one', () => {
      const bomber = new Player(30, 31, canvas, context)
      assert.equal(bomber.y, 31)

      bomber.moveUp()
      assert.equal(bomber.y, 30)
    })

    it('"moveDown" increases y by one', () => {
      const bomber = new Player(30, 30, canvas, context)
      assert.equal(bomber.y, 30)

      bomber.moveDown()
      assert.equal(bomber.y, 31)
    })
  })

  context('movement boundaries', () => {
    const context = stub().of('fillRect').of('clearRect')
    it('"moveRight" cannot move outside the canvas ', () => {
      const bomber = new Player(1470, 770, canvas, context)
      assert.equal(bomber.x, 1470)

      bomber.moveRight()
      assert.equal(bomber.x, 1470)
    })

    it('"moveLeft" cannot move outside the canvas ', () => {
      const bomber = new Player(50, 770, canvas, context)
      assert.equal(bomber.x, 50)

      bomber.moveLeft()
      assert.equal(bomber.x, 50)
    })

    it('"moveUp" cannot move outside the canvas ', () => {
      const bomber = new Player(30, 30, canvas, context)
      assert.equal(bomber.y, 30)

      bomber.moveUp()
      assert.equal(bomber.x, 30)
    })

    it('"moveDown" cannot move outside the canvas ', () => {
      const bomber = new Player(30, 740, canvas, context)
      assert.equal(bomber.y, 740)

      bomber.moveDown()
      assert.equal(bomber.y, 740)
    })
  })
})
