RFall.Player = function () {
  this.imgLeft = RFall.resources.images.playerLeft
  this.imgRight = RFall.resources.images.playerRight 
  this.img = this.imgRight 
  this.hurting = false
  this.x = 0 
  this.y = 0
  this.width = 27
  this.height = 56 
  this.speed = 15
  this.resetPosition()
}

RFall.Player.prototype.takeDamage = function () {
  RFall.player.removeHeart()
  RFall.player.setHurting( true )
  if (!this.isDead())
    setTimeout("RFall.player.setHurting( false )",1500)
}

RFall.Player.prototype.isHurting = function () {
  return this.hurting
}

RFall.Player.prototype.setHurting = function ( bool ) {
  var currentlyLeft = (this.img == this.imgLeft)

  if (bool == false) {
    this.imgLeft = RFall.resources.images.playerLeft
    this.imgRight = RFall.resources.images.playerRight 
    this.hurting = false
  }
  if (bool == true) {
    this.imgLeft = RFall.resources.images.playerHurtLeft
    this.imgRight = RFall.resources.images.playerHurtRight 
    this.hurting = true
  }

  this.img = (currentlyLeft) ? this.imgLeft : this.imgRight
  RFall.draw()
}

RFall.Player.prototype.move = function ( direction ) {
  if (direction == "left") {
    this.img = this.imgLeft
    this.x -= this.speed
    if (this.x < RFall.cage.cageLBound)
      this.x = RFall.cage.cageLBound 
    RFall.draw()
  }
  if (direction == "right") {
    this.img = this.imgRight
    this.x += this.speed
    if (this.x > RFall.cage.cageRBound - this.width)
      this.x = RFall.cage.cageRBound - this.width
    RFall.draw()
  }
}

RFall.Player.prototype.resetPosition = function () {
  this.x = Math.floor( RFall.randomMinMax(RFall.cage.cageLBound, RFall.cage.cageRBound - this.width) )
  this.y = RFall.canvasHeight - RFall.cage.cageFloorHeight - this.height
}

// draw( ctx )
// ctx is a 2D canvas context
RFall.Player.prototype.draw = function (ctx) {
  ctx.drawImage(RFall.player.img, RFall.player.x, RFall.player.y, this.width, this.height)
  for (var h = 1; h <= RFall.hearts; h++){
    ctx.drawImage(RFall.resources.images.heart, RFall.canvasWidth - (40 * h), 0, 40, 40)
  }
}

RFall.Player.prototype.removeHeart = function () {
  --RFall.hearts
}

RFall.Player.prototype.isDead = function () {
  if (RFall.hearts < 0)
    return true
  else
    return false
}
