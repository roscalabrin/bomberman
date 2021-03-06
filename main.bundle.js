/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');
	const Loader = __webpack_require__(1);

	const normalBtn = document.getElementById('game-normal-mode');
	const speedBtn = document.getElementById('game-speed-mode');

	normalBtn.addEventListener('click', () => {
	  gamePrep('DefaultMap');
	});

	speedBtn.addEventListener('click', () => {
	  gamePrep('SmallMap');
	});

	function gamePrep(level) {
	  normalBtn.classList.add('hidden');
	  speedBtn.classList.add('hidden');
	  const playerOneScore = document.getElementById('player-one-score').classList;
	  playerOneScore.remove('hidden');
	  const playerTwoScore = document.getElementById('player-two-score').classList;
	  playerTwoScore.remove('hidden');
	  const quitText = document.getElementById('quit-text').classList;
	  quitText.remove('hidden');
	  const bomberman = new Loader(canvas, context, level);
	  bomberman.startGame;
	}

	document.addEventListener('keydown', e => {
	  document.getElementById('game-over').classList.add('hidden');
	  document.getElementById('game').classList.remove('end-game');
	  document.getElementById('next-game').classList.add('hidden');
	  if (e.keyCode === 49) {
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    const bomberman = new Loader(canvas, context, 'DefaultMap');
	    bomberman.startGame;
	  } else if (e.keyCode === 50) {
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    const bomberman = new Loader(canvas, context, 'SmallMap');
	    bomberman.startGame;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	class Loader {
	  constructor(canvas, context, level) {
	    this.game = new Game(canvas, context, level);
	    this.loadGame();
	  }

	  loadGame() {
	    this.game.configPlayers();
	    this.game.firstPlayer.bindControls();
	    this.game.secondPlayer.bindControls();
	    this.game.map.loadBlocks();
	    if (this.game.level === 'DefaultMap') this.game.map.loadBreakables();
	    this.game.map.drawBlocks();
	    this.startGame();
	  }

	  play() {
	    if (this.game.play) {
	      const breakables = this.game.map.breakableBlocks.length;
	      const classes = document.getElementById("game").classList;
	      classes.remove("hidden");
	      const instructions = document.getElementById("instructions").classList;
	      instructions.add("hidden");
	      this.game.update(breakables);
	      requestAnimationFrame(this.play.bind(this));
	    }
	  }

	  startGame() {
	    if (this.game.level === 'DefaultMap') this.game.map.drawBreakables();
	    this.play();
	    this.game.timer.placeTimer();
	    this.game.timer.setTimer();
	    this.game.score.setInitialScore();
	    this.game.score.placeHighestScore();
	  }
	}

	module.exports = Loader;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');
	const Block = __webpack_require__(3);
	const PlayerOne = __webpack_require__(4);
	const PlayerTwo = __webpack_require__(13);
	const BreakableBlock = __webpack_require__(14);
	const Timer = __webpack_require__(15);
	const Score = __webpack_require__(16);
	const DefaultMap = __webpack_require__(17);
	const SmallMap = __webpack_require__(19);

	class Game {
	  constructor(canvas, context, level) {
	    this.canvas = canvas;
	    this.context = context;
	    this.keys = [];
	    this.firstPlayer = null;
	    this.secondPlayer = null;
	    this.timer = new Timer(this);
	    this.score = new Score();
	    this.level = level;
	    this.map;
	    this.setLevel(this.level);
	    this.play = true;
	    this.quitOption();
	  }

	  setLevel(level) {
	    if (level === 'DefaultMap') {
	      this.map = new DefaultMap(this);
	    } else {
	      this.map = new SmallMap(this);
	    }
	  }

	  update(breakableCount) {
	    if (this.timer.timeLeft === 100) this.map.drawBlocks();
	    if (this.map.constructor.name === 'DefaultMap') {
	      this.map.updateBreakables(breakableCount);
	    }
	    this.firstPlayer.draw('primarySprite');
	    this.firstPlayer.keyPressCheck();
	    this.secondPlayer.draw('primarySprite');
	    this.secondPlayer.keyPressCheck();
	  }

	  configPlayers() {
	    this.firstPlayer = new PlayerOne(null, null, this);
	    this.secondPlayer = new PlayerTwo(null, null, this);
	    const mapName = this.level;
	    let coordsOne;
	    let coordsTwo;
	    if (mapName === 'DefaultMap') {
	      coordsOne = this.getStartingLocations()['mapOne']['playerOne'];
	      coordsTwo = this.getStartingLocations()['mapOne']['playerTwo'];
	    }
	    if (mapName === 'SmallMap') {
	      coordsOne = this.getStartingLocations()['mapTwo']['playerOne'];
	      coordsTwo = this.getStartingLocations()['mapTwo']['playerTwo'];
	    }
	    this.setStartingLocations(coordsOne, coordsTwo);
	  }

	  getStartingLocations() {
	    return {
	      mapOne: { playerOne: { x: 35, y: 35 }, playerTwo: { x: 1120, y: 560 } },
	      mapTwo: { playerOne: { x: 280, y: 140 }, playerTwo: { x: 875, y: 455 } }
	    };
	  }

	  setStartingLocations(firstPlayerCoords, secondPlayerCoords) {
	    this.firstPlayer.x = firstPlayerCoords.x;
	    this.firstPlayer.y = firstPlayerCoords.y;
	    this.secondPlayer.x = secondPlayerCoords.x;
	    this.secondPlayer.y = secondPlayerCoords.y;
	  }

	  quitOption() {
	    document.addEventListener('keydown', e => {
	      if (e.keyCode === 27) {
	        this.endGame('quit');
	      }
	    });
	  }

	  endGame(winner) {
	    this.play = false;
	    clearInterval(this.timer.timeCounter);
	    this.firstPlayer.clear();
	    this.secondPlayer.clear();
	    this.context.font = '80px Space Mono';
	    document.getElementById('next-game').classList.remove('hidden');
	    document.getElementById('quit-text').classList.add('hidden');
	    if (winner === 'quit') {
	      this.context.clearRect(0, 0, canvas.width, canvas.height);
	      document.getElementById('game-over').classList.remove('hidden');
	      document.getElementById('game').classList.add('hidden');
	    } else {
	      this.context.fillStyle = 'red';
	      document.getElementById('game').classList.add('end-game');
	      this.context.fillText(`${ winner } Wins!`, 250, 100);
	    }
	  }
	}

	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	class Block {
	  constructor(x, y, game) {
	    this.x = x;
	    this.y = y;
	    this.width = 70;
	    this.height = 70;
	    this.game = game;
	    this.image = 'assets/images/bomberman-5-blocks.png';
	    this.primarySprite = { x: 146, y: 240, width: 14, height: 14 };
	  }

	  draw(sprite) {
	    const blockSprite = new Image();
	    blockSprite.src = this.image;
	    this.game.context.drawImage(blockSprite, /* image src */
	    this[sprite].x, this[sprite].y, this[sprite].width, this[sprite].height, this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = Block;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(5);

	class PlayerOne extends Player {
	  constructor(x, y, game) {
	    super(x, y, game);
	    this.image = 'assets/images/SBM2-Bomberman.gif';
	    this.alive = true;
	    this.primarySprite = { x: 107, y: 2, width: 16, height: 26 };
	    this.rightSprite = { x: 88, y: 3, width: 19, height: 25 };
	    this.leftSprite = { x: 174, y: 3, width: 20, height: 25 };
	    this.upSprite = { x: 212, y: 3, width: 16, height: 25 };
	    this.downSprite = { x: 505, y: 70, width: 19, height: 28 };
	  }

	  keyPressCheck() {
	    if (this.game.keys[39]) {
	      this.moveRight();
	    } else if (this.game.keys[37]) {
	      this.moveLeft();
	    } else if (this.game.keys[38]) {
	      this.moveUp();
	    } else if (this.game.keys[40]) {
	      this.moveDown();
	    } else if (this.game.keys[18]) {
	      this.plantBomb();
	    }
	  }
	}

	module.exports = PlayerOne;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const CollisionEngine = __webpack_require__(6);
	const Bomb = __webpack_require__(7);
	const SuperBomb = __webpack_require__(12);

	class Player {
	  constructor(x, y, game) {
	    this.x = x;
	    this.y = y;
	    this.height = 35;
	    this.width = 35;
	    this.speed = 3;
	    this.game = game;
	    this.map = game.map;
	    this.collisions = new CollisionEngine(this);
	  }

	  get centerX() {
	    return this.x + this.width / 2;
	  }

	  get centerY() {
	    return this.y + this.height / 2;
	  }

	  bindControls() {
	    document.addEventListener('keydown', e => {
	      this.game.keys[e.keyCode] = true;
	    });

	    document.addEventListener('keyup', e => {
	      this.game.keys[e.keyCode] = false;
	    });
	  }

	  draw(sprite) {
	    const bomberSprite = new Image();
	    bomberSprite.src = this.image;
	    this.game.context.drawImage(bomberSprite, /* image src */
	    this[sprite].x, /* image X */
	    this[sprite].y, /* image Y */
	    this[sprite].width, /* image width */
	    this[sprite].height, /* image height */
	    this.x, this.y, this.width, this.height);
	  }

	  clear() {
	    this.game.context.clearRect(this.x, this.y, this.width, this.height);
	  }

	  plantBomb() {
	    const bombY = this.centerY + this.height / 2;
	    let bomb;
	    if (this.map.constructor.name === 'SmallMap') {
	      bomb = new SuperBomb(this.centerX, bombY, this.game);
	    } else {
	      bomb = new Bomb(this.centerX, bombY, this.game);
	    }
	    this.map.bombs.push(bomb);
	    this.verifyCleanBombDeployment(bomb);
	  }

	  verifyCleanBombDeployment(bomb) {
	    if (this.collisions.checkForOpenBlock()['bombToBlock']['deploy']()) {
	      bomb.draw();
	    } else {
	      this.adjustForBombDeployment(bomb);
	    }
	  }

	  adjustForBombDeployment(bomb) {
	    this.game.context.clearRect(this.x, this.y, this.width, this.height);
	    this.y -= bomb.height;
	    bomb.y = this.centerY + this.height / 2;
	    bomb.draw();
	  }

	  moveRight() {
	    if (this.x < this.game.canvas.width - this.width) {
	      if (this.collisions.checkForOpenBlock()['playerToBlock']['right']()) {
	        this.clear();
	        this.x += this.speed;
	        this.draw('rightSprite');
	      }
	    }
	    return this;
	  }

	  moveLeft() {
	    if (this.x > this.speed) {
	      if (this.collisions.checkForOpenBlock()['playerToBlock']['left']()) {
	        this.clear();
	        this.x -= this.speed;
	        this.draw('leftSprite');
	      }
	    }
	    return this;
	  }

	  moveUp() {
	    if (this.y > this.speed) {
	      if (this.collisions.checkForOpenBlock()['playerToBlock']['up']()) {
	        this.clear();
	        this.y -= this.speed;
	        this.draw('upSprite');
	      }
	    }
	    return this;
	  }

	  moveDown() {
	    if (this.y < this.game.canvas.height - this.height) {
	      if (this.collisions.checkForOpenBlock()['playerToBlock']['down']()) {
	        this.clear();
	        this.y += this.speed;
	        this.draw('downSprite');
	      }
	    }
	    return this;
	  }
	}

	module.exports = Player;

/***/ },
/* 6 */
/***/ function(module, exports) {

	class CollisionEngine {
	  constructor(movingObject) {
	    this.movingObject = movingObject;
	    this.map = movingObject.game.map;
	  }

	  checkForOpenBlock() {
	    return {
	      playerToBlock: {
	        right: this.playerCollisionsRight.bind(this),
	        left: this.playerCollisionsLeft.bind(this),
	        up: this.playerCollisionsUp.bind(this),
	        down: this.playerCollisionsDown.bind(this)
	      },
	      fireToBlock: {
	        right: this.fireCollisionsRight.bind(this),
	        left: this.fireCollisionsLeft.bind(this),
	        up: this.fireCollisionsUp.bind(this),
	        down: this.fireCollisionsDown.bind(this)
	      },
	      superFireToBlock: {
	        right: this.superFireCollisionsRight.bind(this),
	        left: this.superFireCollisionsLeft.bind(this),
	        above: this.superFireCollisionsTop.bind(this),
	        below: this.superFireCollisionsBottom.bind(this)
	      },
	      bombToBlock: {
	        deploy: this.bombDeploymentCollision.bind(this)
	      }
	    };
	  }

	  //   fireToPlayer(x, y, width, height) {
	  //     return (((x <= this.movingObject.x) &&
	  //              (this.movingObject.x <= (x + width))) &&
	  //              ((y <= this.movingObject.y) &&
	  //              (this.movingObject.y <= (y + height))))
	  //   }

	  bombDeploymentCollision() {
	    this.movingObject.speed = 25;
	    const blocksBelow = this.map.blocks.filter(this.downCollide.bind(this));
	    const breakablesBelow = this.map.breakableBlocks.filter(this.downCollide.bind(this));
	    this.movingObject.speed = 3;
	    return blocksBelow.length + breakablesBelow.length === 0;
	  }

	  superFireCollisionsRight() {
	    const collidingBlocks = this.map.blocks.filter(this.blockWayRight.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  superFireCollisionsLeft() {
	    const collidingBlocks = this.map.blocks.filter(this.blockWayLeft.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  superFireCollisionsTop() {
	    const collidingBlocks = this.map.blocks.filter(this.blockWayAbove.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  superFireCollisionsBottom() {
	    const collidingBlocks = this.map.blocks.filter(this.blockWayBelow.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  fireCollisionsRight() {
	    const collidingBlocks = this.map.blocks.filter(this.blockRight.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  fireCollisionsLeft() {
	    const collidingBlocks = this.map.blocks.filter(this.blockLeft.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  fireCollisionsUp() {
	    const collidingBlocks = this.map.blocks.filter(this.blockAbove.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  fireCollisionsDown() {
	    const collidingBlocks = this.map.blocks.filter(this.blockBelow.bind(this));
	    return collidingBlocks.length === 0;
	  }

	  playerCollisionsRight() {
	    const collidingBlocks = this.map.blocks.filter(this.rightCollide.bind(this));
	    const collidingBombs = this.map.bombs.filter(this.bombRight.bind(this));
	    const collidingBreakables = this.map.breakableBlocks.filter(this.rightCollide.bind(this));
	    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length;
	    return possibleCollisions === 0;
	  }

	  playerCollisionsLeft() {
	    const collidingBlocks = this.map.blocks.filter(this.leftCollide.bind(this));
	    const collidingBombs = this.map.bombs.filter(this.bombLeft.bind(this));
	    const collidingBreakables = this.map.breakableBlocks.filter(this.leftCollide.bind(this));
	    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length;
	    return possibleCollisions === 0;
	  }

	  playerCollisionsUp() {
	    const collidingBlocks = this.map.blocks.filter(this.upCollide.bind(this));
	    const collidingBombs = this.map.bombs.filter(this.bombAbove.bind(this));
	    const collidingBreakables = this.map.breakableBlocks.filter(this.upCollide.bind(this));
	    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length;
	    return possibleCollisions === 0;
	  }

	  playerCollisionsDown() {
	    const collidingBlocks = this.map.blocks.filter(this.downCollide.bind(this));
	    const collidingBombs = this.map.bombs.filter(this.bombBelow.bind(this));
	    const collidingBreakables = this.map.breakableBlocks.filter(this.downCollide.bind(this));
	    const possibleCollisions = collidingBlocks.length + collidingBombs.length + collidingBreakables.length;
	    return possibleCollisions === 0;
	  }

	  rightCollide(block) {
	    return block.x - this.movingObject.speed <= this.movingObject.x + this.movingObject.width && this.movingObject.x + this.movingObject.width <= block.x && (block.y < this.movingObject.y && this.movingObject.y < block.y + block.height || block.y < this.movingObject.y + this.movingObject.height && this.movingObject.y + this.movingObject.height < block.y + block.height);
	  }

	  leftCollide(block) {
	    return this.movingObject.x <= block.x + block.width + this.movingObject.speed && this.movingObject.x >= block.x + block.width && (block.y < this.movingObject.y && this.movingObject.y < block.y + block.height || block.y < this.movingObject.y + this.movingObject.height && this.movingObject.y + this.movingObject.height < block.y + block.height);
	  }

	  upCollide(block) {
	    return this.movingObject.y <= block.y + block.height + this.movingObject.speed && this.movingObject.y >= block.y + block.height && (block.x < this.movingObject.x && this.movingObject.x < block.x + block.width || block.x < this.movingObject.x + this.movingObject.width && this.movingObject.x + this.movingObject.width < block.x + block.width);
	  }

	  downCollide(block) {
	    return this.movingObject.y + this.movingObject.height <= block.y && this.movingObject.y + this.movingObject.height >= block.y - this.movingObject.speed && (block.x < this.movingObject.x && this.movingObject.x < block.x + block.width || block.x < this.movingObject.x + this.movingObject.width && this.movingObject.x + this.movingObject.width < block.x + block.width);
	  }

	  blockAbove(block) {
	    return this.movingObject.y === block.y + block.height && this.movingObject.x === block.x;
	  }

	  blockBelow(block) {
	    return this.movingObject.y + this.movingObject.height === block.y && this.movingObject.x === block.x;
	  }

	  blockLeft(block) {
	    return this.movingObject.x === block.x + block.width && this.movingObject.y === block.y;
	  }

	  blockRight(block) {
	    return this.movingObject.x + this.movingObject.width === block.x && this.movingObject.y === block.y;
	  }

	  blockWayRight(block) {
	    return this.movingObject.x + this.movingObject.width * 2 === block.x && this.movingObject.y === block.y;
	  }

	  blockWayLeft(block) {
	    return this.movingObject.x - this.movingObject.width * 2 === block.x && this.movingObject.y === block.y;
	  }

	  blockWayAbove(block) {
	    return this.movingObject.y - this.movingObject.height * 2 === block.y && this.movingObject.x === block.x;
	  }

	  blockWayBelow(block) {
	    return this.movingObject.y + this.movingObject.height * 2 === block.y && this.movingObject.x === block.x;
	  }

	  bombAbove(bomb) {
	    return bomb.y + bomb.height + this.movingObject.speed > this.movingObject.y && bomb.y + bomb.height + this.movingObject.speed <= this.movingObject.y + this.movingObject.height && bomb.x + bomb.width > this.movingObject.x && bomb.x < this.movingObject.x + this.movingObject.width;
	  }

	  bombBelow(bomb) {
	    return this.movingObject.y + this.movingObject.height + this.movingObject.speed > bomb.y && this.movingObject.y + this.movingObject.height + this.movingObject.speed <= bomb.y + bomb.height && bomb.x + bomb.width > this.movingObject.x && bomb.x < this.movingObject.x + this.movingObject.width;
	  }

	  bombRight(bomb) {
	    return this.movingObject.x + this.movingObject.width + this.movingObject.speed >= bomb.x && this.movingObject.x + this.movingObject.width + this.movingObject.speed <= bomb.x + bomb.width && bomb.y + bomb.height > this.movingObject.y && bomb.y < this.movingObject.y + this.movingObject.height;
	  }

	  bombLeft(bomb) {
	    return bomb.x + bomb.width + this.movingObject.speed >= this.movingObject.x && bomb.x + bomb.width + this.movingObject.speed <= this.movingObject.x + this.movingObject.width && bomb.y + bomb.height > this.movingObject.y && bomb.y < this.movingObject.y + this.movingObject.height;
	  }
	}

	module.exports = CollisionEngine;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Explosion = __webpack_require__(8);
	const SuperExplosion = __webpack_require__(10);

	class Bomb {
	  constructor(x, y, game) {
	    this.x = x;
	    this.y = y;
	    this.game = game;
	    this.map = game.map;
	    this.height = 25;
	    this.width = 25;
	    this.fuseTime = 3000;
	    this.image = 'assets/images/bomberman2_various_sheet.png';
	  }

	  get centerX() {
	    return this.x + this.width / 2;
	  }

	  get centerY() {
	    return this.y + this.height / 2;
	  }

	  draw() {
	    const bombSprite = new Image();
	    bombSprite.src = this.image;
	    this.game.context.drawImage(bombSprite, /* image src */
	    240, /* image X */
	    92, /* image Y */
	    19, /* image width */
	    18, /* image height */
	    this.x, this.y, this.width, this.height);
	    this.startFuse();
	  }

	  startFuse() {
	    setTimeout(this.clear.bind(this), this.fuseTime);
	  }

	  clear() {
	    let ex;
	    if (this.map.constructor.name === 'SmallMap') {
	      ex = new SuperExplosion(this.centerX, this.centerY, this.game);
	    } else {
	      ex = new Explosion(this.centerX, this.centerY, this.game);
	    }
	    this.map.removeBomb(this);
	    ex.fillPrimaryRect();
	  }
	}

	module.exports = Bomb;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const CollisionEngine = __webpack_require__(6);
	const FireBlock = __webpack_require__(9);

	class Explosion {
	  constructor(bombX, bombY, game) {
	    this.bombX = bombX;
	    this.bombY = bombY;
	    this.width = 0;
	    this.height = 0;
	    this.game = game;
	    this.speed = 70;
	    this.collisions = null;
	    this.map = game.map;
	  }

	  get x() {
	    let newX = parseInt(this.bombX);
	    while (newX % 70 !== 0) {
	      newX--;
	    }
	    return newX;
	  }

	  get y() {
	    let newY = parseInt(this.bombY);
	    while (newY % 70 !== 0) {
	      newY--;
	    }
	    return newY;
	  }

	  fill() {
	    this.game.context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  clear() {
	    this.game.context.clearRect(this.x, this.y, this.width, this.height);
	  }

	  fillPrimaryRect() {
	    while (this.height < 70) {
	      this.height += 35;
	      this.width += 35;
	    }
	    const fb = new FireBlock(this.x, this.y, this.game);
	    this.collisions = new CollisionEngine(fb);
	    fb.draw('primarySprite');
	    this.checkTopRect();
	    this.checkLeftRect();
	    this.checkRightRect();
	    this.checkBottomRect();
	    this.checkForPlayers(fb.x, fb.y, fb.width, fb.height);
	    this.checkForDeadPlayers();
	    setTimeout(this.clear.bind(this), 75);
	  }

	  checkForDeadPlayers() {
	    const playerOne = this.game.firstPlayer;
	    const playerTwo = this.game.secondPlayer;
	    if (playerOne.alive === false) {
	      this.explosionKillsPlayer('Player Two');
	    } else if (playerTwo.alive === false) {
	      this.explosionKillsPlayer('Player One');
	    }
	  }

	  explosionKillsPlayer(winner) {
	    this.game.score.setFinalScore(winner, this.game.timer.timeLeft);
	    this.game.score.update();
	    this.game.endGame(winner);
	  }

	  checkForPlayers(x, y, width, height) {
	    const playerOne = this.game.firstPlayer;
	    const playerTwo = this.game.secondPlayer;
	    if (x <= playerOne.x && playerOne.x <= x + width && y <= playerOne.y && playerOne.y <= y + height) {
	      playerOne.alive = false;
	    }
	    if (x <= playerTwo.x && playerTwo.x <= x + width && y <= playerTwo.y && playerTwo.y <= y + height) {
	      playerTwo.alive = false;
	    }
	  }

	  checkTopRect() {
	    if (this.y > 0) {
	      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockAbove.bind(this.collisions));
	      /* removing blocks altogether instead of clearing the rectangle,
	       * existing blocks are automatically rerendered on loop.
	       * Game removes blocks in batches */
	      this.map.removeBreakableBlocks(breakableBlocks);
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['up']()) {
	        const fBlock = new FireBlock(this.x, this.y - this.speed, this.game);
	        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height);
	        fBlock.draw('topSprite');
	        setTimeout(fBlock.clear.bind(fBlock), 75);
	      }
	    }
	    return this;
	  }

	  checkLeftRect() {
	    if (this.x > 0) {
	      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockLeft.bind(this.collisions));
	      this.map.removeBreakableBlocks(breakableBlocks);
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['left']()) {
	        const fBlock = new FireBlock(this.x - this.speed, this.y, this.game);
	        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height);
	        fBlock.draw('leftSprite');
	        setTimeout(fBlock.clear.bind(fBlock), 75);
	      }
	    }
	    return this;
	  }

	  checkRightRect() {
	    if (this.x < this.game.canvas.width - this.width) {
	      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockRight.bind(this.collisions));
	      this.map.removeBreakableBlocks(breakableBlocks);
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['right']()) {
	        const fBlock = new FireBlock(this.x + this.speed, this.y, this.game);
	        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height);
	        fBlock.draw('rightSprite');
	        setTimeout(fBlock.clear.bind(fBlock), 75);
	      }
	    }
	    return this;
	  }

	  checkBottomRect() {
	    if (this.y < this.game.canvas.height - this.height) {
	      const breakableBlocks = this.map.breakableBlocks.filter(this.collisions.blockBelow.bind(this.collisions));
	      this.map.removeBreakableBlocks(breakableBlocks);
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['down']()) {
	        const fBlock = new FireBlock(this.x, this.y + this.speed, this.game);
	        this.checkForPlayers(fBlock.x, fBlock.y, fBlock.width, fBlock.height);
	        fBlock.draw('bottomSprite');
	        setTimeout(fBlock.clear.bind(fBlock), 75);
	      }
	    }
	    return this;
	  }
	}

	module.exports = Explosion;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);

	class FireBlock extends Block {
	  constructor(x, y, game, image) {
	    super(x, y, game);
	    this.speed = this.height;
	    this.image = 'assets/images/bomberman-miscellaneous.png';
	    this.primarySprite = { x: 324, y: 85, width: 17, height: 17 };
	    this.rightSprite = { x: 273, y: 120, width: 16, height: 16 };
	    this.leftSprite = { x: 256, y: 120, width: 16, height: 16 };
	    this.topSprite = { x: 222, y: 120, width: 16, height: 16 };
	    this.bottomSprite = { x: 239, y: 120, width: 16, height: 16 };
	    this.farTopSprite = { x: 223, y: 69, width: 15, height: 15 };
	    this.farBottomSprite = { x: 239, y: 69, width: 15, height: 15 };
	    this.farLeftSprite = { x: 256, y: 69, width: 15, height: 15 };
	    this.farRightSprite = { x: 273, y: 69, width: 15, height: 15 };
	  }

	  clear() {
	    this.game.context.clearRect(this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = FireBlock;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const SuperFireBlock = __webpack_require__(11);
	const Explosion = __webpack_require__(8);
	const CollisionEngine = __webpack_require__(6);

	class SuperExplosion extends Explosion {
	  fillPrimaryRect() {
	    while (this.height < 70) {
	      this.height += 35;
	      this.width += 35;
	    }
	    const sfb = new SuperFireBlock(this.x, this.y, this.game);
	    this.collisions = new CollisionEngine(sfb);
	    sfb.draw('primarySprite');
	    this.checkTopRect();
	    this.checkLeftRect();
	    this.checkRightRect();
	    this.checkBottomRect();
	    this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	    this.checkForDeadPlayers();
	    setTimeout(this.clear.bind(this), 75);
	  }

	  checkTopRect() {
	    if (this.y > 140) {
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['up']()) {
	        const sfb = new SuperFireBlock(this.x, this.y - this.speed, this.game);
	        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	        sfb.draw('verticalSprite');
	        this.checkAdditionalTopRect();
	        setTimeout(sfb.clear.bind(sfb), 75);
	      }
	    }
	    return this;
	  }

	  checkLeftRect() {
	    if (this.x > 280) {
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['left']()) {
	        const sfb = new SuperFireBlock(this.x - this.speed, this.y, this.game);
	        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	        sfb.draw('lateralSprite');
	        this.checkAdditionalLeftRect();
	        setTimeout(sfb.clear.bind(sfb), 75);
	      }
	    }
	    return this;
	  }

	  checkRightRect() {
	    if (this.x < this.game.canvas.width - 280 - this.width) {
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['right']()) {
	        const sfb = new SuperFireBlock(this.x + this.speed, this.y, this.game);
	        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	        sfb.draw('lateralSprite');
	        this.checkAdditionalRightRect();
	        setTimeout(sfb.clear.bind(sfb), 75);
	      }
	    }
	    return this;
	  }

	  checkBottomRect() {
	    if (this.y < this.game.canvas.height - 140 - this.height) {
	      if (this.collisions.checkForOpenBlock()['fireToBlock']['down']()) {
	        const sfb = new SuperFireBlock(this.x, this.y + this.speed, this.game);
	        this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	        sfb.draw('verticalSprite');
	        this.checkAdditionalBottomRect();
	        setTimeout(sfb.clear.bind(sfb), 75);
	      }
	    }
	    return this;
	  }

	  checkAdditionalTopRect() {
	    if (this.collisions.checkForOpenBlock()['superFireToBlock']['above']()) {
	      const sfb = new SuperFireBlock(this.x, this.y - this.speed * 2, this.game);
	      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	      sfb.draw('verticalSprite');
	      setTimeout(sfb.clear.bind(sfb), 75);
	    }
	  }

	  checkAdditionalLeftRect() {
	    if (this.collisions.checkForOpenBlock()['superFireToBlock']['left']()) {
	      const sfb = new SuperFireBlock(this.x - this.speed * 2, this.y, this.game);
	      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	      sfb.draw('lateralSprite');
	      setTimeout(sfb.clear.bind(sfb), 75);
	    }
	  }

	  checkAdditionalRightRect() {
	    if (this.collisions.checkForOpenBlock()['superFireToBlock']['right']()) {
	      const sfb = new SuperFireBlock(this.x + this.speed * 2, this.y, this.game);
	      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	      sfb.draw('lateralSprite');
	      setTimeout(sfb.clear.bind(sfb), 75);
	    }
	  }

	  checkAdditionalBottomRect() {
	    if (this.collisions.checkForOpenBlock()['superFireToBlock']['below']()) {
	      const sfb = new SuperFireBlock(this.x, this.y + this.speed * 2, this.game);
	      this.checkForPlayers(sfb.x, sfb.y, sfb.width, sfb.height);
	      sfb.draw('verticalSprite');
	      setTimeout(sfb.clear.bind(sfb), 75);
	    }
	  }
	}

	module.exports = SuperExplosion;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	const FireBlock = __webpack_require__(9);

	class SuperFireBlock extends FireBlock {
	  constructor(x, y, game) {
	    super(x, y, game);
	    this.primarySprite = { x: 324, y: 103, width: 16, height: 16 };
	    this.lateralSprite = { x: 308, y: 103, width: 16, height: 16 };
	    this.verticalSprite = { x: 290, y: 103, width: 16, height: 16 };
	  }
	}

	module.exports = SuperFireBlock;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const Bomb = __webpack_require__(7);

	class SuperBomb extends Bomb {
	  constructor(x, y, game) {
	    super(x, y, game);
	    this.height = 35;
	    this.width = 35;
	    this.fuseTime = 1500;
	  }
	}

	module.exports = SuperBomb;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(5);

	class PlayerTwo extends Player {
	  constructor(x, y, game) {
	    super(x, y, game);
	    this.image = 'assets/images/bomberman2_various_sheet.png';
	    this.alive === true;
	    this.primarySprite = { x: 210, y: 0, width: 20, height: 21 };
	    this.rightSprite = { x: 298, y: 56, width: 22, height: 26 };
	    this.leftSprite = { x: 240, y: 58, width: 22, height: 25 };
	    this.upSprite = { x: 268, y: 30, width: 22, height: 24 };
	    this.downSprite = { x: 208, y: 29, width: 20, height: 23 };
	  }

	  keyPressCheck() {
	    if (this.game.keys[68]) {
	      this.moveRight();
	    } else if (this.game.keys[65]) {
	      this.moveLeft();
	    } else if (this.game.keys[87]) {
	      this.moveUp();
	    } else if (this.game.keys[83]) {
	      this.moveDown();
	    } else if (this.game.keys[17]) {
	      this.plantBomb();
	    }
	  }
	}

	module.exports = PlayerTwo;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);

	class BreakableBlock extends Block {
	  constructor(x, y, game) {
	    super(x, y, game);
	    this.primarySprite = { x: 78, y: 240, width: 16, height: 16 };
	  }

	  clear() {
	    this.game.context.clearRect(this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = BreakableBlock;

/***/ },
/* 15 */
/***/ function(module, exports) {

	class Timer {
	  constructor(game) {
	    this.game = game;
	    this.timeLeft = 100;
	    this.timeCounter = null;
	  }

	  placeTimer() {
	    const timerDisplay = document.getElementById('game-timer');
	    timerDisplay.innerText = `Timer: ${ this.timeLeft }`;
	  }

	  setTimer() {
	    this.timeCounter = setInterval(this.runTimer.bind(this), 1000);
	  }

	  runTimer() {
	    this.timeLeft--;
	    document.getElementById('game-timer').innerText = `Timer: ${ this.timeLeft }`;
	    if (this.timeLeft === 0) {
	      clearInterval(this.timeCounter);
	      this.game.endGame('quit');
	    }
	  }
	}

	module.exports = Timer;

/***/ },
/* 16 */
/***/ function(module, exports) {

	class Score {
	  constructor() {
	    this.firstPlayer = 0;
	    this.secondPlayer = 0;
	    this.firstPlayerNode;
	    this.secondPlayerNode;
	  }

	  setInitialScore() {
	    const playerOneScore = document.getElementById("player-one-score");
	    playerOneScore.innerText = `Player One Score: ${ this.firstPlayer }`;
	    const playerTwoScore = document.getElementById("player-two-score");
	    playerTwoScore.innerText = `Player Two Score: ${ this.secondPlayer }`;
	  }

	  placeHighestScore() {
	    const highestScore = document.getElementById("highest-score");
	    highestScore.innerText = `Highest Score: ${ localStorage.getItem('highest-score') }`;
	  }

	  setFinalScore(winner, timeLeft) {
	    if (timeLeft > localStorage.getItem('highest-score')) {
	      localStorage.setItem('highest-score', timeLeft);
	      this.placeHighestScore();
	    }
	    if (winner === 'Player One') {
	      this.firstPlayer = timeLeft;
	    } else if (winner === 'Player Two') {
	      this.secondPlayer = timeLeft;
	    }
	  }

	  update() {
	    const playerOneScore = document.getElementById("player-one-score");
	    playerOneScore.innerText = `Player One Score: ${ this.firstPlayer }`;
	    const playerTwoScore = document.getElementById("player-two-score");
	    playerTwoScore.innerText = `Player Two Score: ${ this.secondPlayer }`;
	  }
	}

	module.exports = Score;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);
	const Bomb = __webpack_require__(7);
	const BreakableBlock = __webpack_require__(14);
	const Map = __webpack_require__(18);

	class DefaultMap extends Map {
	  updateBreakables(formerBreakableCount) {
	    if (formerBreakableCount !== this.breakableBlocks.length || this.game.timer.timeLeft === 100) {
	      this.drawBreakables();
	    }
	  }

	  drawBreakables() {
	    this.breakableBlocks.forEach(block => block.draw('primarySprite'));
	  }

	  loadBreakables() {
	    let y = 0;
	    let x = 0;
	    while (y < this.canvas.height) {
	      /* first check for starting player corners */
	      if (y === 0 || y === this.canvas.height - 70) {
	        this.loadBreakableRowPlayer(x + 70, y);
	      } else {
	        this.loadBreakableRowFull(x, y);
	      }
	      y += 70;
	    }
	    this.removeCornerBlocks();
	  }

	  removeCornerBlocks() {
	    /* remove corner blocks for players to avoid blasts */
	    this.breakableBlocks = this.breakableBlocks.filter(b => {
	      return (b.x !== 0 || b.y !== 70) && (b.x !== b.width || b.y !== 0) && (b.x !== 0 || b.y !== this.canvas.height - b.height * 2) && (b.x !== 70 || b.y !== this.canvas.height - b.height) && (b.x !== this.canvas.width - b.height * 2 || b.y !== 0) && (b.y !== 70 || b.x !== this.canvas.width - b.height) && (b.y !== this.canvas.height - b.height || b.x !== this.canvas.width - b.width * 2) && (b.y !== this.canvas.height - b.height * 2 || b.x !== this.canvas.width - b.width);
	    });
	  }

	  loadBreakableRowFull(x, y) {
	    while (x < this.canvas.width) {
	      this.breakableBlocks.push(new BreakableBlock(x, y, this));
	      /* check for existing immovable blocks first
	       * by skipping every other row */
	      const row = y / 70;
	      if (row % 2 === 0) {
	        x += 70;
	      } else {
	        /* skip every other column to not overwrite existing blocks */
	        x += 140;
	      }
	    }
	  }

	  loadBreakableRowPlayer(x, y) {
	    /* player corners have no existing blocks */
	    while (x < this.canvas.width - 70) {
	      this.breakableBlocks.push(new BreakableBlock(x, y, this));
	      x += 70;
	    }
	  }

	  loadBlocks() {
	    let y = 70;
	    while (y < this.canvas.height - 70) {
	      this.loadRow(y);
	      y += 140;
	    }
	  }

	  loadRow(y) {
	    let x = 70;
	    while (x < this.canvas.width - 70) {
	      this.blocks.push(new Block(x, y, this));
	      x += 140;
	    }
	  }

	}

	module.exports = DefaultMap;

/***/ },
/* 18 */
/***/ function(module, exports) {

	class Map {
	  constructor(game) {
	    this.game = game;
	    this.canvas = game.canvas;
	    this.context = game.context;
	    this.blocks = [];
	    this.breakableBlocks = [];
	    this.bombs = [];
	  }

	  drawBlocks() {
	    this.blocks.forEach(block => block.draw('primarySprite'));
	  }

	  removeBomb(targetBomb) {
	    this.bombs = this.bombs.filter(bomb => {
	      return targetBomb.x !== bomb.x && targetBomb.y !== bomb.y;
	    });
	  }

	  removeBreakableBlocks(targetBlocks) {
	    this.breakableBlocks = this.breakableBlocks.filter(b => {
	      const index = targetBlocks.findIndex(block => {
	        return block.x === b.x && block.y === b.y;
	      });
	      return index === -1;
	    });
	  }
	}

	module.exports = Map;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	const Map = __webpack_require__(18);
	const Block = __webpack_require__(3);
	const Bomb = __webpack_require__(7);
	const WaterBlock = __webpack_require__(20);

	class SmallMap extends Map {
	  constructor(game) {
	    super(game);
	  }

	  loadBlocks() {
	    this.loadTopBorder();
	    this.loadLeftBorder();
	    this.loadBottomBorder();
	    this.loadRightBorder();
	    this.addCenterBlocks();
	  }

	  loadTopBorder() {
	    let x = 0;
	    let y = 0;
	    while (y < 140) {
	      this.blocks.push(new WaterBlock(x, y, this));
	      x += 70;
	      if (x >= this.canvas.width) {
	        x = 0;
	        y += 70;
	      }
	    }
	  }

	  loadLeftBorder() {
	    let x = 0;
	    let y = 140;
	    while (y < this.canvas.height) {
	      this.blocks.push(new WaterBlock(x, y, this));
	      x += 70;
	      if (x >= 280) {
	        x = 0;
	        y += 70;
	      }
	    }
	  }

	  loadBottomBorder() {
	    let x = 280;
	    let y = this.canvas.height - 140;
	    while (y < this.canvas.height) {
	      this.blocks.push(new WaterBlock(x, y, this));
	      x += 70;
	      if (x >= this.canvas.width) {
	        x = 280;
	        y += 70;
	      }
	    }
	  }

	  loadRightBorder() {
	    let y = 140;
	    let x = this.canvas.width - 280;
	    while (y <= this.canvas.height - 140) {
	      this.blocks.push(new WaterBlock(x, y, this));
	      x += 70;
	      if (x >= this.canvas.width) {
	        x = this.canvas.width - 280;
	        y += 70;
	      }
	    }
	  }

	  addCenterBlocks() {
	    let x = 280;
	    let y = 140;
	    this.blocks.push(new Block(x + 70, y + 70, this));
	    this.blocks.push(new Block(x + 490, y + 70, this));
	    this.blocks.push(new Block(x + 490, y + 210, this));
	    this.blocks.push(new Block(x + 70, y + 210, this));
	    this.blocks.push(new Block(x + 157.5 * 2 - 35, y + 87.5 * 2 - 35, this));

	    this.blocks.push(new Block(x + 70, y, this));
	    this.blocks.push(new Block(x + 70, y + 280, this));
	    this.blocks.push(new Block(x + 490, y, this));
	    this.blocks.push(new Block(x + 490, y + 280, this));

	    this.blocks.push(new Block(x + 157.5 * 2 - 35, y + 87.5 * 2 - 105, this));
	    this.blocks.push(new Block(x + 157.5 * 2 - 35, y + 87.5 * 2 + 35, this));

	    this.drawBlocks();
	  }

	  // drawBlocks() {
	  //   this.blocks.forEach(block => block.draw('primarySprite'))
	  // }
	}

	module.exports = SmallMap;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);

	class WaterBlock extends Block {
	  constructor(x, y, game) {
	    super(x, y, game);
	    this.image = 'assets/images/bomberman-miscellaneous.png';
	    this.primarySprite = { x: 137, y: 18, width: 15, height: 15 };
	  }
	}

	module.exports = WaterBlock;

/***/ }
/******/ ]);