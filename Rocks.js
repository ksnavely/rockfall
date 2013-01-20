RFall.Rock = function () {
  this.img = RFall.resources.images.rock
  this.x = 0
  this.y = 0
  this.width = 0
  this.height = 0
  this.baseSpeed = 2
  this.resetRock()
}

RFall.Rock.prototype.moveDown = function () {
  var speed = this.baseSpeed * (1 + RFall.elapsedTime / RFall.winTime) + (0.5 * RFall.difficulty - 1)
  this.y = this.y + speed 
  if (this.y > RFall.canvasHeight)
    this.resetRock()
}

RFall.Rock.prototype.resetRock = function () {
  this.width = Math.floor( RFall.randomMinMax(25, 60) )
  this.height = Math.floor( RFall.randomMinMax(25, 60) )
  this.x = Math.floor( RFall.randomMinMax(0, RFall.canvasWidth ) )
  this.y = Math.floor( RFall.randomMinMax(0, - 2 * RFall.canvasHeight) )
}

RFall.Rocks = function () {
  this.rocks = []
  var i = 0
  for ( i = 0; i < 12; i++ ) {
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

RFall.Rocks.prototype.collisionDetect = function () {
  var plX = RFall.player.x
  var plRightX = plX + RFall.player.width
  var plY = RFall.player.y
  var plBottomY = plY + RFall.player.height
  var fuzziness = 4

  // A few simple collision detectors
  var leftColl = function ( rock ) {
    var rockRightX = rock.x + rock.width
    if  (plX >= rock.x + fuzziness && plX <= rockRightX - fuzziness)
      return true
    else
      return false
  }
  var rightColl = function ( rock ) {
    var rockRightX = rock.x + rock.width
    if  (plRightX >= rock.x + fuzziness && plRightX <= rockRightX - fuzziness)
      return true
    else
      return false
  }
  var vertColl = function ( rock ) {
      return (plY <= rock.y + rock.height - fuzziness && plBottomY >= rock.y + fuzziness)
  }

  // Check for collisions and hurt the player if needed
  if ( !RFall.player.isHurting() ) {
    for (var r in this.rocks) {
      var rock = this.rocks[r]
      if ( vertColl(rock) && (leftColl(rock) || rightColl(rock)) ) {
        RFall.player.takeDamage()
        return true
      }
    }
  }
  
  return false
}
