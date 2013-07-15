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
var shell = require("game-shell")(),
    GameConfiguration = require("./gameConfiguration"),
    worldGenerator = require("./worldGenerator"),
    conf = require("../conf/game"),
    Aware = require("./aware"),
    GamePlay = require("./gamePlay");

var version = "0.3.6";

// Initiate shell
shell.on("init", function(){
  var gamePlay = new GamePlay(shell, new GameConfiguration(conf), worldGenerator, new Aware()),
      canvas = document.getElementById("fywo"),
      canvasBackground = document.getElementById("background");

  console.log("FYWO v" + version);
  // add the canvas to the shell
  shell.element.appendChild(canvas);
  shell.element.appendChild(canvasBackground);
  // set the canvas
  gamePlay.setCanvas(canvas, canvasBackground);
  // start game
  gamePlay.startLevel(1);
});





