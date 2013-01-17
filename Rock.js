RFall.Rock = function () {
  this.img = new Image()
  this.img.src = "imgs/rock.png"
  this.x = 0
  this.y = 0
  this.width = 0
  this.height = 0
  this.r = 8
  this.resetRock()
}

RFall.Rock.prototype.moveDown = function () {
  this.y = this.y + 4
  if (this.y > 400)
    this.resetRock()
}

RFall.Rock.prototype.resetRock = function () {
  this.x = Math.floor( RFall.randomMinMax(0, 230) )
  this.y = Math.floor( RFall.randomMinMax(0, -800) )
  this.width = Math.floor( RFall.randomMinMax(25, 60) )
  this.height = Math.floor( RFall.randomMinMax(25, 60) )
}

RFall.Rocks = function () {
  this.rocks = []
  var i = 0
  for ( i = 0; i < 8; i++ ) {
    this.rocks.push( new RFall.Rock() )
  }
}

RFall.Rocks.prototype.moveRocksDown = function () {
  for (r in this.rocks) {
    this.rocks[r].moveDown()
  }
}

// draw( ctx )
// ctx is a 2D canvas context
RFall.Rocks.prototype.draw = function ( ctx ) {
  var r
  for (r in RFall.rocks.rocks) {
    var rock = RFall.rocks.rocks[r]
    ctx.drawImage(rock.img,rock.x,rock.y,rock.width,rock.height)
  }
}
