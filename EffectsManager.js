RFall.EffectsManager = function () {
  this.effects = { "slowTime": new RFall.SlowTime() }
}

RFall.EffectsManager.prototype.start = function (effectStr) {
  this.effects[ effectStr ].startEffect()
}

RFall.EffectsManager.prototype.stop = function (effectStr) {
  this.effects[ effectStr ].stopEffect()
}

