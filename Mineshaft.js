RFall.MineShaft = function () {
  this.img = RFall.resources.images.mineShaft
  this.width = 500
  this.height = 750
  this.x = 0
  this.y = 0
  this.y2 = 750
  this.baseSpeed = 1
}

RFall.MineShaft.prototype.moveUp = function () {
  this.y = this.y - this.baseSpeed
  this.y2 = this.y2 - this.baseSpeed
  if (this.y2 == 0) {
    this.reset()
  }
}

RFall.MineShaft.prototype.reset = function () {
  this.x = 0 
  this.y = 0
  this.y2 = 750
}

// draw( ctx )
// ctx is a 2D canvas context
RFall.MineShaft.prototype.draw = function ( ctx ) {
  ctx.drawImage(this.img,this.x,this.y)
  ctx.drawImage(this.img,this.x,this.y2)
}
