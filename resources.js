RFall.resources = { }

RFall.resources.images = { }

RFall.resources.sources = {
  playerLeft: "imgs/playerLeft.png",
  playerRight: "imgs/playerRight.png",
  playerHurtLeft: "imgs/playerHurtLeft.png",
  playerHurtRight: "imgs/playerHurtRight.png",
  mineShaft: "imgs/mineShaft.gif",
  cage: "imgs/cage.png",
  rock: "imgs/rock.png",
  heart: "imgs/heart.png",
  paused: "imgs/paused.png",
  splash: "imgs/splash.png"

}

RFall.resources.loadImages = function( callback ) {
  var images = RFall.resources.images
  var loadedImages = 0
  var numImages = 0
  var sources = RFall.resources.sources

  // Count the number of images
  for (var src in sources) {
    numImages++
  }
  // Instantiate, check for completed loading, link to source
  for (var src in sources) {
    images[src] = new Image()
    images[src].onload = function () {
      ++loadedImages
      if (loadedImages == numImages) {
        callback()
      }
    }
    images[src].src = sources[src]
  }
}
