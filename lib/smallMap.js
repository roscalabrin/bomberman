const Map = require('./map')
const Block = require('./block')
const Bomb = require('./bomb')
const WaterBlock = require('./waterBlock')

class SmallMap extends Map {
  constructor(game) {
    super(game)
  }

  loadBlocks() {
    this.loadTopBorder()
    this.loadLeftBorder()
    this.loadBottomBorder()
    this.loadRightBorder()
    this.addCenterBlocks()
  }

  loadTopBorder() {
    let x = 0
    let y = 0
    while(y < 140) {
      this.blocks.push(new WaterBlock(x, y, this))
      x += 70
      if (x >= this.canvas.width) {
        x = 0
        y += 70
      }
    }
  }

  loadLeftBorder() {
    let x = 0
    let y = 140
    while(y < this.canvas.height) {
      this.blocks.push(new WaterBlock(x, y, this))
      x += 70
      if (x >= 280) {
        x = 0
        y += 70
      }
    }
  }

  loadBottomBorder() {
    let x = 280
    let y = this.canvas.height - 140
    while(y < this.canvas.height) {
      this.blocks.push(new WaterBlock(x, y, this))
      x += 70
      if (x >= this.canvas.width) {
        x = 280
        y += 70
      }
    }
  }

  loadRightBorder() {
    let y = 140
    let x = this.canvas.width - 280
    while(y <= this.canvas.height - 140) {
      this.blocks.push(new WaterBlock(x, y, this))
      x += 70
      if (x >= this.canvas.width) {
        x = this.canvas.width - 280
        y += 70
      }
    }
  }

  addCenterBlocks() {
    let x = 280
    let y = 140
    this.blocks.push(new Block((x + 70), (y + 70) , this))
    this.blocks.push(new Block((x + 490), (y + 70), this))
    this.blocks.push(new Block((x + 490), (y + 210), this))
    this.blocks.push(new Block((x + 70), (y + 210), this))
    this.blocks.push(new Block(x + (157.5 * 2) - 35, y + (87.5 * 2) - 35, this))


    this.blocks.push(new Block(x + 70, y, this))
    this.blocks.push(new Block(x + 70, y + 280, this))
    this.blocks.push(new Block(x + 490, y, this))
    this.blocks.push(new Block(x + 490, y + 280, this))


    this.blocks.push(new Block(x + (157.5 * 2) - 35, (y + (87.5 * 2) - 105), this))
    this.blocks.push(new Block(x + (157.5 * 2) - 35, y + (87.5 * 2) + 35, this))

    this.drawBlocks()
  }

  // drawBlocks() {
  //   this.blocks.forEach(block => block.draw('primarySprite'))
  // }
}

module.exports = SmallMap
