require ('./styles')

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');


class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;    
  }
} 

const blocks = []

function mapGrid() {
  let x = 70
  while (x < canvas.width - 70) {
    let b = new Block(x, 70)
    blocks.push(b)
    x += 140
  }
  x = 70
  
  while (x < canvas.width - 70) {
    b = new Block(x, 210)
    blocks.push(b)
    x += 140
  }
  x = 70
  
  while (x < canvas.width - 70) {
    b = new Block(x, 350)
    blocks.push(b)
    x += 140
  }
  
  x = 70
  while (x < canvas.width - 70) {
    b = new Block(x, 490)
    blocks.push(b)
    x += 140
  }
  
  x = 70
  while (x < canvas.width - 70) {
    b = new Block(x, 630)
    blocks.push(b)
    x += 140
  }
  
  blocks.forEach(block => {
    requestAnimationFrame(() => {
      context.fillRect(block.x, block.y, block.width, block.height)
    })
  })
}

mapGrid()
