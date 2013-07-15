/**
 * What should happen after colliding with this type of block
 *
 * @param  {Object} player The player
 * @param  {Object} block  The block
 */
exports.collides = function(player, block, shell){
  player.stop();
  player.hasWon = true;

  if (shell){
    shell.emit("playerHasWon", player);
  }
};