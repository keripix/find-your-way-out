'use strict';

var util = require("util");

exports.generate = function(canvas, blocks){
  var ctx = canvas.getContext("2d");

  if (!util.isArray(blocks)){
    blocks = [blocks];
  }

  blocks.forEach(function(b){
    b.draw(ctx);
  });

  return canvas;
};