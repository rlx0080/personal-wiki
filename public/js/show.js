var canvas = document.getElementById("canvas-show");
var ctx = canvas.getContext("2d");
var c = {}
var cw = canvas.width = document.querySelector('.standard-layout-grid').clientWidth;
c.x = cw / 2;
var ch = canvas.height = document.querySelector('body').scrollHeight + document.querySelector('.footer').scrollHeight;
c.y = ch / 2;
ctx.lineJoin = "round";
ctx.strokeStyle = "#000";
ctx.fillStyle = "rgba(255,255,255,1)";
var rad = Math.PI / 180;
var x, y;

var amplitude = 5;
var frequency = .02;
var phi = 0;

var increment = 0.05;
var lines = [];



function SquigglyLine(x) {
  this.x = x;
  this.yoff = Math.random() * 10000;
  this.Yoff = this.yoff;
  this.phi = Math.random() * 10000;
  this.draw = function (i) {
    ctx.beginPath();
    // console.log(c);
    this.yoff = this.Yoff; // reset xoff;

    for (var y = -2; y < ch + 2; y++) {

      if (y > ch / 3 && y < 2 * ch / 3) {
        var k = map(y, ch / 3, 2 * ch / 3, 0, 180);
      } else {
        k = 0;
      }

      var x = -Math.abs(Math.sin((y + noise(this.yoff) * 100) * frequency + this.phi) * (amplitude + k * rad)) + this.x;

      if (this.x == 0) {x = -1 * x;}
      ctx.lineTo(x, y);

      this.yoff += increment;

    }
    // ctx.lineTo(cw*this.x + 2, -1*y);
    // ctx.lineTo(cw*this.x + 2, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

  }
}

window.addEventListener('resize', function () {
  for (var x = 0; x <= cw; x += cw) {
    lines.pop();
  }
  cw = canvas.width = document.querySelector('.standard-layout-grid').clientWidth;
  c.x = cw / 2;
  ch = canvas.height = document.querySelector('body').scrollHeight +  document.querySelector('.footer').scrollHeight;
  c.y = ch / 2;

  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "rgba(255,255,255,1)";

  for (var x = 0; x <= cw; x += cw) {
    var line = new SquigglyLine(x);
    lines.push(line);
  }
  // console.log(lines);
});

setTimeout(function () {
  for (var x = 0; x <= cw; x += cw) {
    lines.pop();
  }

  cw = canvas.width = document.querySelector('.standard-layout-grid').clientWidth;
  c.x = cw / 2;
  ch = canvas.height = document.querySelector('body').scrollHeight +  document.querySelector('.footer').scrollHeight;
  c.y = ch / 2;

  ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "rgba(255,255,255,1)";

  for (var x = 0; x <= cw; x += cw) {
    var line = new SquigglyLine(x);
    lines.push(line);
  }
}, 1);


function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  ctx.fillRect(0, 0, cw, ch);

  noiseDetail(2, .5);

  for (var i = 0; i < lines.length; i++) {
    lines[i].phi += 1 / 30;
    lines[i].draw(i);
  }

}

requestId = window.requestAnimationFrame(Draw);

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + (n - a) * u;
}