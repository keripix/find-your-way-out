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
    block = require("./block"),
    conf = require("../conf/game"),
    shell = require("game-shell")(),
    aware = require("./aware");

var ctx,
    game = gameConfiguration.init(conf),
    currentLevel = 1,
    gameLevel,
    canvas,
    canvasBackground,
    bkgCtx,
    speed = 10,
    actor,
    moveDirection = {};

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

  actor = game.createActor(currentLevel);
  actor.stopperLocation = undefined;

  worldGenerator.generate(canvas, actor);
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

  if(shell.wasDown("move-left") && actor.stopperLocation !== "-x") {
    moveDirection = {direction: "x", value: -speed};
    actor.requestRendering = true;
  } else if(shell.wasDown("move-right") && actor.stopperLocation !== "x") {
    moveDirection = {direction: "x", value: speed};
    actor.requestRendering = true;
  } else if(shell.wasDown("move-up") && actor.stopperLocation !== "-y") {
    moveDirection = {direction: "y", value: -speed};
    actor.requestRendering = true;
  } else if(shell.wasDown("move-down") && actor.stopperLocation !== "y") {
    moveDirection = {direction: "y", value: speed};
    actor.requestRendering = true;
  }
});

//Render a frame
shell.on("render", function() {
  if (actor.requestRenderingForce || actor.requestRendering){
    if (actor.requestRenderingForce){
      console.log("force");
    }
    actor.requestRenderingForce = false;
    ctx.clearRect(actor.x, actor.y, actor.width, actor.height);

    ctx.fillStyle = actor.color;
    // eg actor.moveY
    actor["move"+moveDirection.direction.toUpperCase()].call(actor, moveDirection.value);

    ctx.fillRect(actor.x, actor.y, actor.width, actor.height);
  }
});



