RFall.Player = function () {
  this.imgLeft = new Image()
  this.imgLeft.src = "imgs/playerLeft.png"
  this.imgRight = new Image()
  this.imgRight.src = "imgs/playerRight.png"
  this.img = this.imgRight
  this.x = 0 
  this.y = 0
  this.width = 32
  this.height = 56 
  this.speed = 20
  this.resetPosition()
}

RFall.Player.prototype.move = function ( direction ) {
  if (direction == "left") {
    this.img = this.imgLeft
    this.x -= this.speed
    if (this.x < 0)
      this.x = 0
  }
  if (direction == "right") {
    this.img = this.imgRight
    this.x += this.speed
    if (this.x > RFall.canvasWidth - this.width)
      this.x = RFall.canvasWidth - this.width
  }
}

RFall.Player.prototype.resetPosition = function () {
  this.x = Math.floor( RFall.randomMinMax(0, RFall.canvasWidth - this.width) )
  this.y = RFall.canvasHeight - this.height 
}

// draw( ctx )
// ctx is a 2D canvas context
RFall.Player.prototype.draw = function (ctx) {
  ctx.drawImage(RFall.player.img, RFall.player.x, RFall.player.y)
}
