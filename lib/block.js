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
}

Block.prototype.moveX = function(value) {
  this.x += value;
  this.midX += value;
};

Block.prototype.moveY = function(value) {
  this.y += value;
  this.midY += value;
};