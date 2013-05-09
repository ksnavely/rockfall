RFall.Effect = function () {
  this.isCoolDown = false  
  this.coolDownTime = null
}

RFall.Effect.prototype.startEffect = function () {
  // Overwrite me!
}

RFall.Effect.prototype.stopEffect = function () {
  // Overwrite me!
}

RFall.Effect.prototype.getIsCoolDown = function () {
  return this.isCoolDown
}

RFall.Effect.prototype.setIsCoolDown = function ( b ) {
  if ( b == true ) {
    this.isCoolDown = true
    // Turn off the cool down later
    setTimeout( $.proxy( this.setIsCoolDown, this, false ), this.coolDownTime )
  }
  if ( b == false )
    this.isCoolDown = false
}

RFall.SlowTime = function () {
  this.isCoolDown = false
  this.coolDownTime = 9000 // milliseconds
  this.slowMoFactor = 2
  this.slowMoTime = 3000 // milliseconds
}

RFall.SlowTime.prototype = new RFall.Effect()

RFall.SlowTime.prototype.startEffect = function () {
  if (!this.isCoolDown){
    this.setIsCoolDown(true)

    // Change the game speed (and later back to normal)
    RFall.setGameSpeed( RFall.gameSpeed * this.slowMoFactor )
    setTimeout( $.proxy( 
        RFall.effectsManager.stop,
        RFall.effectsManager,
        "slowTime"),
      this.slowMoTime )
  }
}

RFall.SlowTime.prototype.stopEffect = function () {
  RFall.setGameSpeed(RFall.gameSpeed0)
}
