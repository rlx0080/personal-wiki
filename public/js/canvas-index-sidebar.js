var canvas4 = document.getElementById("canvas-index-sidebar");
var ctx4 = canvas4.getContext("2d");
var c4 = {}
var cw4 = canvas4.width = document.querySelector('.header').clientWidth;
c4.x4 = cw4 / 2;
var ch4 = canvas4.height = document.querySelector('body').scrollHeight + document.querySelector('.footer').scrollHeight;
c4.y4 = ch4 / 2;
ctx4.lineJoin = "round";
ctx4.strokeStyle = "#000";
ctx4.fillStyle = "rgba(255,255,255,1)";
var rad4 = Math.PI / 180;
var x4, y4;

var amplitude4 = 5;
var frequency4 = .02;
var phi4 = 0;

var increment4 = 0.05;
var lines4 = [];



function SquigglyLine4(x4) {
  this.x4 = x4;
  this.yoff4 = Math.random() * 10000;
  this.Yoff4 = this.yoff4;
  this.phi4 = Math.random() * 10000;
  this.draw4 = function (i) {
    ctx4.beginPath();
    this.yoff4 = this.Yoff4; // reset xoff;

    for (var y4 = -2; y4 < ch4 + 2; y4++) {

      if (y4 > ch4 / 3 && y4 < 2 * ch4 / 3) {
        var k4 = map4(y4, ch4 / 3, 2 * ch4 / 3, 0, 180);
      } else {
        k4 = 0;
      }

      var x4 = -Math.abs(Math.sin((y4 + noise(this.yoff4) * 100) * frequency4 + this.phi4) * (amplitude4 + k4 * rad4)) + this.x4;

      if (this.x4 == 0) {x4 = -1 * x4;}
      ctx4.lineTo(x4, y4);

      this.yoff4 += increment4;

    }
    // ctx.lineTo(cw*this.x + 2, -1*y);
    // ctx.lineTo(cw*this.x + 2, 2);
    ctx4.closePath();
    ctx4.fill();
    ctx4.stroke();

  }
}

window.addEventListener('resize', function () {
  for (var x4 = 0; x4 <= cw4; x4 += cw4) {
    lines4.pop();
  }
  cw4 = canvas4.width = document.querySelector('.header').clientWidth;
  c4.x4 = cw4 / 2;
  ch4 = canvas4.height =  document.querySelector('body').scrollHeight + document.querySelector('.footer').scrollHeight;
  c4.y4 = ch4 / 2;

  ctx4.lineJoin = "round";
  ctx4.strokeStyle = "#000";
  ctx4.fillStyle = "rgba(255,255,255,1)";

  for (var x4 = 0; x4 <= cw4; x4 += cw4) {
    var line4 = new SquigglyLine4(x4);
    lines4.push(line4);
  }
});

const resize_ob = new ResizeObserver(function(entries) {
  for (var x4 = 0; x4 <= cw4; x4 += cw4) {
    lines4.pop();
  }
  cw4 = canvas4.width = document.querySelector('.header').clientWidth;
  c4.x4 = cw4 / 2;
  ch4 = canvas4.height =  document.querySelector('body').scrollHeight + document.querySelector('.footer').scrollHeight;
  c4.y4 = ch4 / 2;

  ctx4.lineJoin = "round";
  ctx4.strokeStyle = "#000";
  ctx4.fillStyle = "rgba(255,255,255,1)";

  for (var x4 = 0; x4 <= cw4; x4 += cw4) {
    var line4 = new SquigglyLine4(x4);
    lines4.push(line4);
  }
});

// start observing for resize
resize_ob.observe(document.querySelector(".container-xxl"));

setTimeout(function () {
  for (var x4 = 0; x4 <= cw4; x4 += cw4) {
    lines4.pop();
  }

  cw4 = canvas4.width = document.querySelector('.header').clientWidth;
  c4.x4 = cw4 / 2;
  ch4 = canvas4.height = document.querySelector('body').scrollHeight + document.querySelector('.footer').scrollHeight;
  c4.y4 = ch4 / 2;

  ctx4.lineJoin = "round";
  ctx4.strokeStyle = "#000";
  ctx4.fillStyle = "rgba(255,255,255,1)";

  for (var x4 = 0; x4 <= cw4; x4 += cw4) {
    var line4 = new SquigglyLine4(x4);
    lines4.push(line4);
  }
}, 1);


function Draw4() {
  requestId4 = window.requestAnimationFrame(Draw4);
  ctx4.fillRect(0, 0, cw4, ch4);

  noiseDetail(2, .5);

  for (var i = 0; i < lines4.length; i++) {
    lines4[i].phi4 += 1 / 30;
    lines4[i].draw4(i);
  }

}

requestId4 = window.requestAnimationFrame(Draw4);

function map4(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + (n - a) * u;
}