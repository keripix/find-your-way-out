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
      midX: 0,
      midY: 0,
      width: 0,
      height: 0,
      moving: {x: 0, y: 0},
      isMoving: false,
      hasWon: false,
      hasLost: false,
      needsToRender: false
    },
    currentLevel = 1,
    gameLevel,
    canvas,
    canvasBackground,
    bkgCtx,
    speed = 5;

// Bind movement
shell.bind("move-left", "left", "A");
shell.bind("move-right", "right", "D");
shell.bind("move-down", "down", "S");
shell.bind("move-up", "up", "W");

function startLevel(){
  ctx.clearRect(0, 0, 600, 600);
  bkgCtx.clearRect(0, 0, 600, 600);

  if (!gameLevel) {
    return;
  }

  if (currentLevel > conf.levels.length){
    // no more levels
    shell.paused = true;
    return;
  }

  // TODO not beautifull
  actor.x = gameLevel.actor.x;
  actor.y = gameLevel.actor.y;
  actor.midX = gameLevel.actor.midX;
  actor.midY = gameLevel.actor.midY;
  actor.moving = {x: 0, y: 0},
  actor.width = gameLevel.actor.width;
  actor.height = gameLevel.actor.height;
  actor.color = gameLevel.actor.color;
  actor.hasWon = false;
  actor.isMoving = false;
  actor.hasLost = false;
  actor.needsToRender = false;

  worldGenerator.generate(canvas, gameLevel.actor);
  worldGenerator.generate(canvasBackground, gameLevel.blocks);
  worldGenerator.generate(canvasBackground, gameLevel.out);
}

// when ready
shell.on("init", function(){
  canvas = document.getElementById("fywo");
  canvasBackground = document.getElementById("background");

  gameLevel = game.getLevel(currentLevel); // TODO not beautifull

  ctx = canvas.getContext("2d");
  bkgCtx = canvasBackground.getContext("2d");

  shell.element.appendChild(canvas);
  shell.element.appendChild(canvasBackground);

  startLevel();
});

shell.on("tick", function() {
  if (actor.hasWon) {
    gameLevel = game.getLevel(++currentLevel);
    startLevel();
    return;
  }

  if (actor.hasLost){
    startLevel();
    return;
  }

  if (actor.isMoving) {
    aware(actor, gameLevel.blocks, gameLevel.out,conf.world);
    return;
  }

  if(shell.wasDown("move-left") && actor.moving.x !== -speed) {
    actor.moving.x = -speed;
    actor.moving.y = 0;
    actor.isMoving = true;
  } else if(shell.wasDown("move-right") && actor.moving.x !== speed) {
    actor.moving.x = speed;
    actor.moving.y = 0;
    actor.isMoving = true;
  } else if(shell.wasDown("move-up") && actor.moving.y !== -speed) {
    actor.moving.x = 0;
    actor.moving.y = -speed;
    actor.isMoving = true;
  } else if(shell.wasDown("move-down") && actor.moving.y !== speed) {
    actor.moving.x = 0;
    actor.moving.y = speed;
    actor.isMoving = true;
  }
});

//Render a frame
shell.on("render", function() {
  // console.log(!actor.needsToRender && !actor.isMoving);
  if (!actor.needsToRender && !actor.isMoving){
    return;
  }

  actor.needsToRender = false;
  ctx.clearRect(actor.x, actor.y, actor.width, actor.height);

  ctx.fillStyle = actor.color;
  actor.x += actor.moving.x;
  actor.y += actor.moving.y;
  actor.midX += actor.moving.x;
  actor.midY += actor.moving.y;

  ctx.fillRect(actor.x, actor.y, actor.width, actor.height);
});



