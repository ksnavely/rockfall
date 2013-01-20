RFall.init = function () {
  RFall.gameSpeed = 10 // increment in microseconds
  RFall.elapsedTime = 0 // microseconds
  RFall.winTime = 30000 // microseconds
  RFall.canvasWidth = 500 // px
  RFall.canvasHeight = 500 // px
  RFall.difficulty = 1
  RFall.startingHearts = 2
  RFall.hearts = RFall.startingHearts
  RFall.resources.loadImages( RFall.newGame )
}

RFall.newGame = function () {
  RFall.mineshaft = new RFall.MineShaft()
  RFall.cage = new RFall.Cage()
  RFall.player = new RFall.Player()
  RFall.rocks = new RFall.Rocks()
  RFall.elapsedTime = 0
  RFall.appStep()
}

RFall.appStep = function () {
  RFall.rocks.collisionDetect()

  if (RFall.player.isDead()) {
    RFall.loseGame()
  }
  else {
    RFall.rocks.moveRocksDown()
    RFall.mineshaft.moveUp()
    RFall.draw()
    RFall.elapsedTime += RFall.gameSpeed
    if (RFall.elapsedTime > RFall.winTime)
      RFall.winGame()
    else
      setTimeout("RFall.appStep()", RFall.gameSpeed )
  }
}

RFall.winGame = function () {
  alert( "You beat level " + RFall.difficulty + "! Hit ok to turn the up heat." )
  ++RFall.difficulty
  RFall.newGame()
}

RFall.loseGame = function () {
  alert( "You were crushed at difficulty " + RFall.difficulty + "! Hit ok to play again." )
  RFall.difficulty = 0
  RFall.hearts = RFall.startingHearts
  RFall.newGame()
}

RFall.draw = function () {
  var canvas = document.getElementById('gameCanvas')
  if (canvas.getContext){
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,RFall.canvasWidth,RFall.canvasHeight)
    ctx.save()

    RFall.mineshaft.draw( ctx )
    RFall.drawStats( ctx )
    RFall.rocks.draw( ctx )
    RFall.player.draw( ctx )
    RFall.cage.draw( ctx )

    ctx.restore()
  }
}

RFall.drawStats = function (ctx) {
    timeText = "Time left: " + (RFall.winTime - RFall.elapsedTime).toString()
    diffText = "Difficulty: " + RFall.difficulty.toString()
    ctx.clearRect(0,0,100,32)
    ctx.strokeRect(0,0,100,32)
    ctx.fillText(timeText, 10, 12)
    ctx.fillText(diffText, 10, 28)
}

RFall.onKeyDown = function (evt) {
  if (evt.keyCode == 37) {
    RFall.player.move("left")
  }
  if (evt.keyCode == 39) {
    RFall.player.move("right")
  }
}

RFall.randomMinMax = function ( min, max ) {
  return Math.random() * (max - min) + min;
}

window.addEventListener('keydown',RFall.onKeyDown,true)
