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

  this.aware.setObserved(actor, gameLevel.blocks, gameLevel.exit, {width: 600, height: 600});
};