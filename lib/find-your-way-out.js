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
    conf = require("../conf/game"),
    shell = require("game-shell")();

var ctx,
    game;

// Bind movement
shell.bind("move-left", "left", "A");
shell.bind("move-right", "right", "D");
shell.bind("move-down", "down", "S");
shell.bind("move-up", "up", "W");

function startWorld(canvas){
  game = gameConfiguration.init(conf);
  worldGenerator.generate(canvas, game.getLevel(1).blocks);
}

// when ready
shell.on("init", function(){
  var canvas = document.getElementById('fywo');

  canvas.width = 600;
  canvas.height = 600;

  shell.element.appendChild(canvas);
  ctx = canvas.getContext("2d");

  startWorld(canvas);
});



