const assert = require('chai').assert
const Block = require('./../lib/block')

describe('Block', () => {
  it('should be a constructor', () => {
    const blocky = new Block()
    assert.instanceOf(blocky, Block)
  })

  describe('properties', () => {
    it('should have an x and a y property', () => {
      const blocky = new Block()
      assert.property(blocky, 'x')
      assert.property(blocky, 'y')
    })

    it('should have a width and a height property', () => {
      const blocky = new Block()
      assert.property(blocky, 'width')
      assert.property(blocky, 'height')
    })
  })

  describe('property values', () => {
    it('should have a default width and height', () => {
      const blocky = new Block()
      assert.equal(blocky.width, 70)
      assert.equal(blocky.height, 70)
    })

    it('should take an x and a y property as an argument', () => {
      const blocky = new Block(15, 25)
      assert.equal(blocky.x, 15)
      assert.equal(blocky.y, 25)
    })
  })
})
