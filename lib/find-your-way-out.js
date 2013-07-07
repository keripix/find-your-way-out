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
    game = gameConfiguration.init(conf),
    actor = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      moving: {x: 0, y: 0},
      isMoving: false
    };

// Bind movement
shell.bind("move-left", "left", "A");
shell.bind("move-right", "right", "D");
shell.bind("move-down", "down", "S");
shell.bind("move-up", "up", "W");

// when ready
shell.on("init", function(){
  var canvas = document.getElementById('fywo'),
      gameLevel = game.getLevel(1);

  ctx = canvas.getContext("2d");

  shell.element.appendChild(canvas);

  worldGenerator.generate(canvas, gameLevel.start);
  worldGenerator.generate(canvas, gameLevel.blocks);

  actor.x = gameLevel.start.x;
  actor.y = gameLevel.start.y;
  actor.w = gameLevel.start.width;
  actor.h = gameLevel.start.height;
  actor.color = gameLevel.start.color;
});

shell.on("tick", function() {
  if (actor.isMoving) {
    return;
  }

  if(shell.wasDown("move-left")) {
    actor.moving.x = -1;
    actor.moving.y = 0;
    actor.isMoving = true;
  } else if(shell.wasDown("move-right")) {
    actor.moving.x = 1;
    actor.moving.y = 0;
    actor.isMoving = true;
  } else if(shell.wasDown("move-up")) {
    actor.moving.x = 0;
    actor.moving.y = -1;
    actor.isMoving = true;
  } else if(shell.wasDown("move-down")) {
    actor.moving.x = 0;
    actor.moving.y = 1;
    actor.isMoving = true;
  }
});

//Render a frame
shell.on("render", function() {
  if (actor.isMoving){
    ctx.clearRect(actor.x, actor.y, actor.w, actor.h);

    ctx.fillStyle = actor.color;
    actor.x += actor.moving.x;
    actor.y += actor.moving.y;

    ctx.fillRect(actor.x, actor.y, actor.w, actor.h);
  }
})



