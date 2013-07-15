/*
 * find-your-way-out
 * https://github.com/keripix/find-your-way-out
 *
 * Copyright (c) 2013 A. Akbar Hidayat
 * Licensed under the MIT license.
 */

'use strict';

// Lets just make this file as a place to initiate the modules
// used by this game
var GameConfiguration = require("./gameConfiguration"),
    worldGenerator = require("./worldGenerator"),
    Block = require("./block"),
    conf = require("../conf/game"),
    shell = require("game-shell")(),
    Aware = require("./aware"),
    collisionUtils = require("./collisionUtilities"),
    GamePlay = require("./gamePlay");

var version = "0.3.1",
    game = new GameConfiguration(conf),
    canvas,
    canvasBackground,
    aware = new Aware(),
    gamePlay = new GamePlay(shell, game, worldGenerator, aware);

// Initiate shell
shell.on("init", function(){
  console.log("FYWO v" + version);
  // canvas elements
  canvas = document.getElementById("fywo");
  canvasBackground = document.getElementById("background");
  // add the canvas to the shell
  shell.element.appendChild(canvas);
  shell.element.appendChild(canvasBackground);
  // start game
  gamePlay.startLevel(currentLevel, canvas, canvasBackground);
});





