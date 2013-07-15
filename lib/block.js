'use strict';

module.exports = Block;

/**
 * Represents a square item on top of the canvas. This
 * can be anything, a player, a block, an exit door.
 *
 * @param {Object} conf Configuration
 */
function Block(conf){
  this.x = conf.x;
  this.y = conf.y;
  this.width = conf.width;
  this.height = conf.height;
  this.midX = this.x + (this.width/2);
  this.midY = this.y + (this.height/2);
  this.color = conf.color;
  this.isMoving = false;
  this.requestRendering = false;
  this.requestRenderingForce = false;
  this.moving = {amount: 0, value: 0, direction: 0};
  this.type = "block";
}

/**
 * Move along the x axis
 * @param  {Integer} value The amount of movement
 * @return {Object}       This
 */
Block.prototype.moveX = function(value) {
  this.moving = {value: value, direction: "x"};
  this.x += value;
  this.midX += value;
  this.isMoving = true;
  this.requestRendering = true;

  return this;
};

/**
 * Move along the y axis
 * @param  {Integer} value The amount of movement
 * @return {Object}       This
 */
Block.prototype.moveY = function(value) {
  this.moving = {value: value, direction: "y"};
  this.y += value;
  this.midY += value;
  this.isMoving = true;
  this.requestRendering = true;

  return this;
};

/**
 * Stop this block from moving
 * @return {Object} This
 */
Block.prototype.stop = function() {
  this.moving = {amount: 0, value: 0, direction: 0};
  this.isMoving = false;
  this.requestRendering = false;

  return this;
};