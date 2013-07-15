var collisionUtils = require("./collisionUtilities"),
    exitCollisionHandler = require("./collisionHandlers/exit"),
    blockCollisionHandler = require("./collisionHandlers/block");

module.exports = GamePlay;

/**
 * Manage game action
 * @param {Object} shell          Game Shell instance
 * @param {Object} gameConfig     GameConfiguration instance
 * @param {Object} worldGenerator WorldGenerator instance
 * @param {Object} aware          Aware Instance
 */
function GamePlay(shell, gameConfig, worldGenerator, aware){
  this.canvas = undefined;
  this.bkgCanvas = undefined;

  this.ctx = undefined;
  this.bkgCtx = undefined;

  this.shell = shell;

  // game objects
  this.game = gameConfig;
  this.worldGen = worldGenerator;
  this.aware = aware;

  // level objects
  this.actor = undefined;
  this.gameLevel = undefined;
  this.moveDirection = undefined;
  this.currentLevel = 1;

  this.hasInitShellEvents = false;

  // Aware Events
  aware.on("playerExit", function(player){
    exitCollisionHandler.collides(player, {}, shell);
  });

  aware.on("playerOut", function(player){
    player.stop();
    player.hasLost = true;
    shell.emit("playerHasLost");
  });

  aware.on("playerBlocked", function(player, block){
    blockCollisionHandler.collides(player, block, shell);
  });
}

GamePlay.prototype.setCanvas = function(canvas, bkgCanvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.bkgCanvas = bkgCanvas;
  this.bkgCtx = bkgCanvas.getContext("2d");
};

GamePlay.prototype.initShellEvents = function(){
  // bind keyboards
  this.shell.bind("move-left", "left", "A");
  this.shell.bind("move-right", "right", "D");
  this.shell.bind("move-down", "down", "S");
  this.shell.bind("move-up", "up", "W");

  // Shell events
  this.shell.on("tick", this.onTick.bind(this));
  this.shell.on("render", this.onRender.bind(this));
  // Custom shell events
  // TODO Good practice?
  this.shell.on("playerHasWon", this.onPlayerHasWon.bind(this));
  this.shell.on("playerHasLost", this.onPlayerHasLost.bind(this));

  this.hasInitShellEvents = true;
};

/**
 * Start the level
 * @param  {Number} level     The level
 * @param  {HTML5Canvas} canvas    Canvas
 * @param  {HTML5Canvas} bkgCanvas Back Canvas
 * @return {GamePlay}           this
 */
GamePlay.prototype.startLevel = function(level) {
  // prepare canvas
  this.ctx.clearRect(0, 0, this.game.worldWidth, this.game.worldHeight);
  this.bkgCtx.clearRect(0, 0, this.game.worldWidth, this.game.worldHeight);

  // if the level requested is more than the available level,
  // then just return. no more level to play
  if (level > this.game.levelLength){
    this.shell.paused = true;
    return;
  }

  this.actor = this.game.createActor(level);
  this.gameLevel = this.game.getLevel(level);

  this.actor.stopperLocation = undefined;

  this.worldGen.generate(this.canvas, this.actor);
  this.worldGen.generate(this.bkgCanvas, this.gameLevel.blocks);
  this.worldGen.generate(this.bkgCanvas, this.gameLevel.exit);

  // set what to observe
  this.aware.setObserved(this.actor, this.gameLevel.blocks, this.gameLevel.exit, {width: this.game.worldWidth, height: this.game.worldHeight});

  if (!this.hasInitShellEvents){
    this.initShellEvents();
  }

  return this;
};

GamePlay.prototype.continuePlaying = function() {
  this.aware.observe();
};

GamePlay.prototype.onPlayerHasWon = function() {
  this.startLevel(++this.currentLevel);
};

GamePlay.prototype.onPlayerHasLost = function() {
  this.startLevel(this.currentLevel);
};

GamePlay.prototype.onTick = function() {
  if (this.actor.isMoving) {
    this.continuePlaying();
    return;
  }

  var speed = this.game.speed;

  // TODO not nice
  if(this.shell.wasDown("move-left") && this.actor.stopperLocation !== "-x") {
    this.moveDirection = {direction: "x", value: -speed};
    this.actor.requestRendering = true;
  } else if(this.shell.wasDown("move-right") && this.actor.stopperLocation !== "x") {
    this.moveDirection = {direction: "x", value: speed};
    this.actor.requestRendering = true;
  } else if(this.shell.wasDown("move-up") && this.actor.stopperLocation !== "-y") {
    this.moveDirection = {direction: "y", value: -speed};
    this.actor.requestRendering = true;
  } else if(this.shell.wasDown("move-down") && this.actor.stopperLocation !== "y") {
    this.moveDirection = {direction: "y", value: speed};
    this.actor.requestRendering = true;
  }
};

GamePlay.prototype.onRender = function() {
  if (this.actor.requestRenderingForce){
    this.actor.requestRenderingForce = false;

    this.ctx.clearRect(this.actor.x - 10, this.actor.y - 10, this.actor.width + 20, this.actor.height + 20);
    this.ctx.fillRect(this.actor.x, this.actor.y, this.actor.width, this.actor.height);
  } else if (this.actor.requestRendering){
    this.ctx.clearRect(this.actor.x, this.actor.y, this.actor.width, this.actor.height);

    this.ctx.fillStyle = this.actor.color;
    // eg this.actor.moveY
    this.actor["move"+this.moveDirection.direction.toUpperCase()].call(this.actor, this.moveDirection.value);

    this.ctx.fillRect(this.actor.x, this.actor.y, this.actor.width, this.actor.height);
  }
};