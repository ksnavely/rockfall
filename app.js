RFall.init = function () {
  RFall.gameSpeed0 = 10 // increment in milliseconds
  RFall.gameSpeed = RFall.gameSpeed0 // increment in milliseconds
  RFall.elapsedTime = 0 // milliseconds
  RFall.winTime = 30000 // milliseconds
  RFall.canvasWidth = 500 // px
  RFall.canvasHeight = 500 // px
  RFall.difficulty = 1
  RFall.startingHearts = 2
  RFall.hearts = RFall.startingHearts
  RFall.paused = false
  RFall.playing = false
  window.addEventListener('keydown',RFall.onKeyDown,true)
  RFall.resources.loadImages( RFall.drawSplash )
}

RFall.newGame = function () {
  RFall.mineshaft = new RFall.MineShaft()
  RFall.cage = new RFall.Cage()
  RFall.player = new RFall.Player()
  RFall.rocks = new RFall.Rocks()
  RFall.effectsManager = new RFall.EffectsManager()
  RFall.elapsedTime = 0
  RFall.playing = true
  RFall.appStep()
}

RFall.appStep = function () {
  if (RFall.paused) {
    RFall.drawPaused()
    setTimeout("RFall.appStep()", 100)
  }
  else if (RFall.playing) {
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
}

RFall.winGame = function () {
  alert( "You beat level " + RFall.difficulty + "! Hit ok to turn the up heat." )
  ++RFall.difficulty
  RFall.newGame()
}

RFall.loseGame = function () {
  RFall.playing = false
  RFall.difficulty = 0
  RFall.hearts = RFall.startingHearts
  RFall.drawSplash()
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

RFall.drawPaused = function () {
  var canvas = document.getElementById('gameCanvas')
  if (canvas.getContext){
    var ctx = canvas.getContext('2d')
    ctx.save()
    
    ctx.drawImage(RFall.resources.images.paused,0,200)

    ctx.restore()
  }
}

RFall.drawSplash = function () {
  var canvas = document.getElementById('gameCanvas')
  if (canvas.getContext){
    var ctx = canvas.getContext('2d')
    ctx.save()
    
    ctx.drawImage(RFall.resources.images.splash,0,0)

    ctx.restore()
  }
}

RFall.drawStats = function (ctx) {
    timeText = "Time left: " + (RFall.winTime - RFall.elapsedTime).toString()
    diffText = "Difficulty: " + RFall.difficulty.toString()
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(0,0,100,32)
    ctx.strokeRect(0,0,100,32)
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillText(timeText, 10, 12)
    ctx.fillText(diffText, 10, 28)
}

RFall.onKeyDown = function (evt) {
  if (RFall.playing) {
    if (evt.keyCode == 37) {
      RFall.player.move("left") // <-
    }
    if (evt.keyCode == 39) { // ->
      RFall.player.move("right")
    }
    if (evt.keyCode == 80) { // p
      RFall.pause()
    }
  }
  if (!RFall.playing) {
    if (evt.keyCode == 78) { // n
      RFall.newGame()
    }
  }
  if (RFall.playing) {
    if (evt.keyCode == 83) { // s
      RFall.effectsManager.start("slowTime")
    }
  }
}

RFall.pause = function () {
  RFall.paused = !RFall.paused
}

RFall.randomMinMax = function ( min, max ) {
  return Math.random() * (max - min) + min;
}

RFall.setGameSpeed = function ( newGameSpeed ) {
  RFall.gameSpeed = newGameSpeed
}


