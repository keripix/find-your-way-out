;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
/*
 * find-your-way-out
 * https://github.com/keripix/find-your-way-out
 *
 * Copyright (c) 2013 A. Akbar Hidayat
 * Licensed under the MIT license.
 */

'use strict';

var gameConfiguration = require("./gameConfiguration"),
    worldGenerator = require("./worldGenerator"),
    conf = require("../conf/game");


},{"./gameConfiguration":2,"./worldGenerator":3,"../conf/game":4}],2:[function(require,module,exports){
'use strict';

function GameConfiguration(conf){
  this.parseConf(conf);
}

GameConfiguration.prototype.parseConf = function(conf) {
  if (!conf.world || !conf.levels){
    throw new Error("Required params not provided");
  }

  this.world = conf.world;
  this.levels = conf.levels;
};

GameConfiguration.prototype.getLevel = function(level) {
  return this.levels[level-1];
};

exports.init = function(conf){
  return new GameConfiguration(conf)
}
},{}],3:[function(require,module,exports){
'use strict';

exports.parsePosition = function(position){
  var results = [];

  // if this is not an array, then make it an array
  if (toString.call(position) != '[object Array]'){
    position = [position];
  }

  position.forEach(function(pos){
    results.push({
      x: pos.x || 0,
      y: pos.y || 0,
      width: pos.width || 5,
      height: pos.height || 5,
      color: pos.color || "#000000"
    });
  });

  return results;
};

exports.generate = function(canvas, position){
  var points = this.parsePosition(position),
      ctx = canvas.getContext('2d');

  points.forEach(function(p){
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });

  return canvas;
};
},{}],4:[function(require,module,exports){
module.exports = {
  "world": {
    "width": 600,
    "height": 600,
    "background-color": "black",
    "box-color": "blue",
    "actor": "white"
  },
  "levels": [
    {
      blocks: [
      {x: 1, y: 1},
      {x: 50, y: 60},
      {x: 21, y: 31}
      ],
      "start": {
        x: 300,
        y: 580
      },
      "out": {
        "position": {x: 600, y: 200},
        "width": "10",
        "height": "10"
      }
    },
    {
      blocks: [
      {x: 1, y: 50},
      {x: 23, y: 500},
      {x: 301, y: 400},
      {x: 491, y: 111}
      ],
      "start": {
        x: 300,
        y: 500
      },
      "out": {
        "position": {x: 600, y: 200},
        "width": "10",
        "height": "10"
      }
    }
  ]
}
},{}]},{},[1])
;