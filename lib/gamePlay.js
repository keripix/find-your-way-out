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
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.shell = shell;

  this.game = gameConfig;
  this.worldGen = worldGenerator;
  this.aware = aware;

  // Aware Events
  aware.on("playerExit", function(player){
    exitCollisionHandler.collides(player, {}, shell);
  });

  aware.on("playerOut", function(player){
    player.stop();
    player.hasLost = true;
    shell.emit("playerLost");
  });

  aware.on("playerBlocked", function(player, block){
    blockCollisionHandler.collides(player, block, shell);
  });

  // bind keyboards
  shell.bind("move-left", "left", "A");
  shell.bind("move-right", "right", "D");
  shell.bind("move-down", "down", "S");
  shell.bind("move-up", "up", "W");

  // Shell events
  shell.on("tick", this.onTick.bind(this));

  shell.on("render", this.onRender.bind(this));

  shell.on("playerHasWon", this.onPlayerHasWon.bind(this));

  shell.on("playerHasLost", this.onPlayerHasLost.bind(this));
}

GamePlay.prototype.startLevel = function(level, canvas, bkgCanvas) {
  var ctx = canvas.getContext("2d"),
      bkgCtx = bkgCanvas.getContext("2d");

  ctx.clearRect(0, 0, 600, 600);
  bkgCtx.clearRect(0, 0, 600, 600);
  // todo
  if (level > conf.levels.length){
    // no more levels
    this.shell.paused = true;
    return;
  }

  var actor = this.game.createActor(level),
      gameLevel = this.game.getLevel(level);

  actor.stopperLocation = undefined;

  this.worldGen.generate(canvas, actor);
  this.worldGen.generate(bkgCanvas, gameLevel.blocks);
  this.worldGen.generate(bkgCanvas, gameLevel.exit);
  // todo world dimension
  this.aware.setObserved(actor, gameLevel.blocks, gameLevel.exit, {width: 600, height: 600});
};

GamePlay.prototype.continuePlaying = function() {
  this.aware.observe();
};

GamePlay.prototype.onTick = function() {
  if (actor.isMoving) {
    gamePlay.continuePlaying();
    return;
  }

  if(shell.wasDown("move-left") && actor.stopperLocation !== "-x") {
    moveDirection = {direction: "x", value: -speed};
    actor.requestRendering = true;
  } else if(shell.wasDown("move-right") && actor.stopperLocation !== "x") {
    moveDirection = {direction: "x", value: speed};
    actor.requestRendering = true;
  } else if(shell.wasDown("move-up") && actor.stopperLocation !== "-y") {
    moveDirection = {direction: "y", value: -speed};
    actor.requestRendering = true;
  } else if(shell.wasDown("move-down") && actor.stopperLocation !== "y") {
    moveDirection = {direction: "y", value: speed};
    actor.requestRendering = true;
  }
};

GamePlay.prototype.onRender = function() {
  if (actor.requestRenderingForce){
    actor.requestRenderingForce = false;
    ctx.clearRect(actor.x - 10, actor.y - 10, actor.width + 20, actor.height + 20);
    ctx.fillRect(actor.x, actor.y, actor.width, actor.height);
  } else if (actor.requestRendering){
    ctx.clearRect(actor.x, actor.y, actor.width, actor.height);

    ctx.fillStyle = actor.color;
    // eg actor.moveY
    actor["move"+moveDirection.direction.toUpperCase()].call(actor, moveDirection.value);

    ctx.fillRect(actor.x, actor.y, actor.width, actor.height);
  }
};