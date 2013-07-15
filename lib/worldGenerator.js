'use strict';

exports.parsePosition = function(blocks){
  var results = [];

  // if this is not an array, then make it an array
  if (toString.call(blocks) != '[object Array]'){
    blocks = [blocks];
  }

  blocks.forEach(function(pos){
    results.push({
      x: pos.x || 0,
      y: pos.y || 0,
      width: pos.width || 10,
      height: pos.height || 10,
      color: pos.color || "#000000"
    });
  });

  return results;
};

exports.generate = function(canvas, blocks){
  var points = this.parsePosition(blocks),
      ctx = canvas.getContext('2d');

  points.forEach(function(p){
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });

  return canvas;
};