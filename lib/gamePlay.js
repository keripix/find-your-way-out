var collisionUtils = require("./collisionUtilities");

module.exports = GamePlay;

function GamePlay(gameConfig, worldGenerator, aware, canvas){
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.game = gameConfig;
  this.worldGen = worldGenerator;
  this.aware = aware;
}

GamePlay.prototype.startLevel = function(level) {

};