const Block = require('./block')

class Grid {
  constructor(canvas) {
    this.canvas = canvas
    this.blocks = []
  }

  renderBlocks(context) {
    this.loadBlocks()
    this.blocks.forEach(block => {
      requestAnimationFrame(() => {
        context.fillRect(block.x, block.y, block.width, block.height)
      })
    })
  }

  loadBlocks() {
    let y = 70
    while(y < this.canvas.height - 70) {
      this.loadRow(y)
      y += 140
    }
  }

  loadRow(y) {
    let x = 70
    while(x < this.canvas.width - 70) {
      this.blocks.push(new Block(x, y))
      x += 140
    }
  }
}

module.exports = Grid
