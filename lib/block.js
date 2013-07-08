exports.create = function(conf){
  return new Block(conf);
};

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
}

Block.prototype.moveX = function(value) {
  this.moving = {amount: value + "x", value: value, direction: "x"};
  this.x += value;
  this.midX += value;
  this.isMoving = true;
  this.requestRendering = true;
};

Block.prototype.moveY = function(value) {
  this.moving = {value: value, direction: "y"};
  this.y += value;
  this.midY += value;
  this.isMoving = true;
  this.requestRendering = true;
};

Block.prototype.stop = function() {
  this.moving = {amount: 0, value: 0, direction: 0};
  this.isMoving = false;
  this.requestRendering = false;
};