RFall.Cage = function () {
  this.img = RFall.resources.images.cage
  this.width = 500
  this.height = 70
  this.x = 0
  this.y = RFall.canvasHeight - this.height
  this.cageLBound = 30
  this.cageRBound = RFall.canvasWidth - 30
  this.cageFloorHeight = 10
}

// draw( ctx )
// ctx is a 2D canvas context
RFall.Cage.prototype.draw = function ( ctx ) {
  ctx.drawImage(this.img,this.x,this.y)
}
