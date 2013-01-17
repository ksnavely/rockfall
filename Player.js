RFall.Player = function () {
  this.img = new Image()
  this.img.src = "imgs/playerRight.png"
  this.x = 0 
  this.y = 0
  this.width = 32
  this.height = 56 
  this.speed = 16
  this.resetPosition()
}

RFall.Player.prototype.move = function ( direction ) {
  if (direction == "left") {
    this.img.src = "imgs/playerLeft.png"
    this.x -= this.speed
    if (this.x < 0)
      this.x = 0
  }
  if (direction == "right") {
    this.img.src = "imgs/playerRight.png"
    this.x += this.speed
    if (this.x > 218)
      this.x = 218
  }
}

RFall.Player.prototype.resetPosition = function () {
  this.x = Math.floor( RFall.randomMinMax(20, 230) )
  this.y = 344 
}

// draw( ctx )
// ctx is a 2D canvas context
RFall.Player.prototype.draw = function (ctx) {
  ctx.drawImage(RFall.player.img, RFall.player.x, RFall.player.y)
}
