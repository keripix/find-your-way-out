'use strict';

var util = require("util");

/**
 * Generate Blocks on top of the canvas
 * @param  {HTML5Canvas} canvas The canvas
 * @param  {Object} blocks The blocks
 */
exports.generate = function(canvas, blocks){
  var ctx = canvas.getContext("2d");

  if (!util.isArray(blocks)){
    blocks = [blocks];
  }

  blocks.forEach(function(b){
    b.draw(ctx);
  });
};