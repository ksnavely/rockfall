RFall.Player = function () {
  this.img = new Image()
  this.img.src = "imgs/player.png"
  this.x = 0 
  this.y = 0
  this.r = 8
  this.resetPosition()
}

RFall.Player.prototype.move = function ( direction ) {
  if (direction == "left") {
    this.x -= 10
    if (this.x < 0)
      this.x = 0
  }
  if (direction == "right") {
    this.x += 10
    if (this.x > 210)
      this.x = 210 
  }
}

RFall.Player.prototype.resetPosition = function () {
  this.x = Math.floor( RFall.randomMinMax(20, 230) )
  this.y = 340 
}
