RFall.init = function () {
  RFall.player = new RFall.Player()
  RFall.rocks = new RFall.Rocks()
  RFall.gameSpeed = 25
  RFall.elapsedTime = 0
  RFall.winTime = 30000
  RFall.appStep()
}

RFall.appStep = function () {
  RFall.draw()
  RFall.rocks.moveRocksDown()

  if (RFall.collisionDetect()) {
    RFall.loseGame()
  }
  else {
    RFall.elapsedTime += RFall.gameSpeed
    if (RFall.elapsedTime > RFall.winTime)
      RFall.winGame()
    else
      setTimeout("RFall.appStep()",RFall.gameSpeed)
  }
}

RFall.winGame = function () {
  alert( "You won the game! Hit ok to play again." )
  RFall.init()
}

RFall.loseGame = function () {
  alert( "You were crushed! Hit ok to play again." )
  RFall.init()
}

RFall.draw = function () {
  var canvas = document.getElementById('gameCanvas')
  if (canvas.getContext){
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,250,400);
    ctx.save()
    timeText = "Time left: " + (RFall.winTime - RFall.elapsedTime).toString()
    ctx.fillText(timeText, 0, 15)
    RFall.rocks.draw( ctx )
    RFall.player.draw( ctx )
    ctx.restore()
  }
}

RFall.onKeyDown = function (evt) {
  if (evt.keyCode == 37) {
    RFall.player.move("left")
  }
  if (evt.keyCode == 39) {
    RFall.player.move("right")
  }
}

RFall.collisionDetect = function () {
  var r
  var plX = RFall.player.x
  var plRightX = plX + RFall.player.width
  var plY = RFall.player.y
  var fuzziness = 2

  var leftColl = function ( rock ) {
    var rockRightX = rock.x + rock.width
    if  (plX > rock.x + fuzziness && plX < rockRightX - fuzziness)
      return true
    else
      return false
  }
  
  var rightColl = function ( rock ) {
    var rockRightX = rock.x + rock.width
    if  (plRightX > rock.x + fuzziness && plRightX < rockRightX- fuzziness)
      return true
    else
      return false
  }

  for (r in RFall.rocks.rocks) {
    var rock = RFall.rocks.rocks[r]
    if (plY < rock.y + rock.height - fuzziness) {
      if ( leftColl(rock) || rightColl(rock) )
        return true
    }
  }
  
  return false
}

RFall.randomMinMax = function ( min, max ) {
  return Math.random() * (max - min) + min;
}

window.addEventListener('keydown',RFall.onKeyDown,true)
