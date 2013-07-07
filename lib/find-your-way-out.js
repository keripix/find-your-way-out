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
    shell = require("game-shell")(),
    aware = require("./aware");

var ctx,
    game = gameConfiguration.init(conf),
    actor = { // TODO not beautifull
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      moving: {x: 0, y: 0},
      isMoving: false,
      hasWon: false,
      hasLost: false
    },
    currentLevel = 1,
    gameLevel,
    canvas,
    speed = 5;

// Bind movement
shell.bind("move-left", "left", "A");
shell.bind("move-right", "right", "D");
shell.bind("move-down", "down", "S");
shell.bind("move-up", "up", "W");

function startLevel(canvas, gameLevel){
  ctx.clearRect(0, 0, 600, 600);

  if (!gameLevel) {
    return;
  }

  if (currentLevel > conf.levels.length){
    // no more levels
    shell.paused = true;
    return;
  }

  // TODO not beautifull
  actor.x = gameLevel.start.x;
  actor.y = gameLevel.start.y;
  actor.w = gameLevel.start.width;
  actor.h = gameLevel.start.height;
  actor.color = gameLevel.start.color;
  actor.hasWon = false;
  actor.isMoving = false;
  actor.hasLost = false;

  worldGenerator.generate(canvas, gameLevel.start);
  worldGenerator.generate(canvas, gameLevel.blocks);
  worldGenerator.generate(canvas, gameLevel.out);
}

// when ready
shell.on("init", function(){
  canvas = document.getElementById('fywo');
  gameLevel = game.getLevel(currentLevel); // TODO not beautifull

  ctx = canvas.getContext("2d");
  shell.element.appendChild(canvas);

  startLevel(canvas, gameLevel);
});

shell.on("tick", function() {
  if (actor.hasWon) {
    gameLevel = game.getLevel(++currentLevel);
    startLevel(canvas, gameLevel);
    return;
  }

  if (actor.hasLost){
    startLevel(canvas, gameLevel);
    return;
  }

  if (actor.isMoving) {
    aware(actor, gameLevel.blocks, gameLevel.out)
    return;
  }

  if(shell.wasDown("move-left")) {
    actor.moving.x = -speed;
    actor.moving.y = 0;
    actor.isMoving = true;
  } else if(shell.wasDown("move-right")) {
    actor.moving.x = speed;
    actor.moving.y = 0;
    actor.isMoving = true;
  } else if(shell.wasDown("move-up")) {
    actor.moving.x = 0;
    actor.moving.y = -speed;
    actor.isMoving = true;
  } else if(shell.wasDown("move-down")) {
    actor.moving.x = 0;
    actor.moving.y = speed;
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



