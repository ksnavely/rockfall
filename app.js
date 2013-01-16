RFall.init = function () {
  RFall.rock = new RFall.Rock()
  RFall.draw()
}

RFall.draw = function(){
  var canvas = document.getElementById('tutorial')
  if (canvas.getContext){
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,250,400);
    ctx.save()

    ctx.beginPath()
    ctx.arc(RFall.rock.x,RFall.rock.y,30,0,Math.PI*2,true) //Circle
    ctx.stroke()

    ctx.restore()
    setTimeout("RFall.draw()", 250)
  }
}

RFall.onKeyDown = function (evt) {
  if (evt.keyCode == 40) {
    RFall.rock.moveDown()
  }
}

window.addEventListener('keydown',RFall.onKeyDown,true)
