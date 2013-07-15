var collisionUtils = require("./../collisionUtilities");

/**
 * What should happen after colliding with this type of block
 *
 * @param  {Object} player The player
 * @param  {Object} block  The block
 */
exports.collides = function(player, block, shell){
  collisionUtils.detectStopper(player, block);
  collisionUtils.normalizedAfterCollision(player, block);

  player.stop();

  if (shell){
    shell.emit("playerHasCollided", player, block);
  }
};