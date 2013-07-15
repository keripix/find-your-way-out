/*
 * find-your-way-out
 * https://github.com/keripix/find-your-way-out
 *
 * Copyright (c) 2013 A. Akbar Hidayat
 * Licensed under the MIT license.
 */

'use strict';

// TODO we need to break this file into different modules

var GameConfiguration = require("./gameConfiguration"),
    worldGenerator = require("./worldGenerator"),
    Block = require("./block"),
    conf = require("../conf/game"),
    shell = require("game-shell")(),
    Aware = require("./aware"),
    collisionUtils = require("./collisionUtilities");

var version = "0.3.0",
    ctx,
    game = new GameConfiguration(conf),
    currentLevel = 1,
    gameLevel,
    canvas,
    canvasBackground,
    bkgCtx,
    speed = 10,
    actor,
    aware = new Aware(),
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
  worldGenerator.generate(canvasBackground, gameLevel.exit);

  aware.setObserved(actor, gameLevel.blocks, gameLevel.exit, {width: 600, height: 600});
}

// when ready
shell.on("init", function(){
  console.log("FYWO v" + version);
  canvas = document.getElementById("fywo");
  canvasBackground = document.getElementById("background");

  gameLevel = game.getLevel(currentLevel); // TODO not beautifull

  ctx = canvas.getContext("2d");
  bkgCtx = canvasBackground.getContext("2d");

  shell.element.appendChild(canvas);
  shell.element.appendChild(canvasBackground);

  startLevel();
});

// Will be published when the player
// has exit the level through the exit door
aware.on("playerExit", function(player){
  player.stop();
  player.hasWon = true;
});

// Will be published when the player has
// exit the level but not from the exit door
aware.on("playerOut", function(player){
  player.stop();
  player.hasLost = true;
});

// Will be published when the player has been
// blocked by a block
aware.on("playerBlocked", function(player, block){
  if (block.type === "block"){
    // detectstopper then normalized
    collisionUtils.detectStopper(player, block);
    collisionUtils.normalizedAfterCollision(player, block);

    player.stop();
  } else if (block.type === "key"){

  }
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
    aware.observe();
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
  if (actor.requestRenderingForce){
    actor.requestRenderingForce = false;
    ctx.clearRect(actor.x - 10, actor.y - 10, actor.width + 20, actor.height + 20);
    ctx.fillRect(actor.x, actor.y, actor.width, actor.height);
  } else if (actor.requestRendering){
    ctx.clearRect(actor.x, actor.y, actor.width, actor.height);

    ctx.fillStyle = actor.color;
    // eg actor.moveY
    actor["move"+moveDirection.direction.toUpperCase()].call(actor, moveDirection.value);

    ctx.fillRect(actor.x, actor.y, actor.width, actor.height);
  }
});



