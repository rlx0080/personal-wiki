var canvas3 = document.getElementById("canvas-footer");
var ctx3 = canvas3.getContext("2d");
var c3 = {}
var cw3 = canvas3.width = document.querySelector('.footer').offsetWidth;
c3.x3 = cw3 / 2;
var ch3 = canvas3.height = document.querySelector('.footer').offsetHeight;
c3.y3 = ch3 / 2;

ctx3.lineJoin = "round";
ctx3.strokeStyle = "#000";
ctx3.fillStyle = "rgba(255,255,255,0)";

var rad3 = Math.PI / 180;
var x3, y3;

var amplitude3 = 5;
var frequency3 = .02;
var phi3 = 0;

var increment3 = 0.05;
var lines3 = [];



function SquigglyLine3(y3) {
    this.y3 = y3;
    this.xoff3 = Math.random() * 10000;
    this.Xoff3 = this.xoff3;
    this.phi3 = Math.random() * 10000;
    this.draw = function (i) {
        ctx3.beginPath();
        // console.log(c);
        this.xoff3 = this.Xoff3; // reset xoff;

        for (var x3 = -2; x3 < cw3 + 2; x3++) {
            // console.log(x3);
            if (x3 > cw3 / 3 && x3 < 2 * cw3 / 3) {
                var k3 = map3(x3, cw3 / 3, 2 * cw3 / 3, 0, 180);
            } else {
                k3 = 0;
            }

            var y3 = Math.abs(Math.sin((x3 + noise(this.xoff3) * 100) * frequency3 + this.phi3) * (amplitude3 + k3 * rad3)) + this.y3;

            ctx3.lineTo(x3, y3);

            this.xoff3 += increment3;

        }
        ctx3.lineTo(cw3 + 2, ch3 + 2);
        ctx3.lineTo(-2, ch3 + 2);
        ctx3.closePath();
        ctx3.fill();
        ctx3.stroke();

    }
}

window.addEventListener('resize', function () {
    lines3.pop();

    cw3 = canvas3.width = document.querySelector('.footer').offsetWidth;
    c3.x3 = cw3 / 2;
    ch3 = canvas3.height = document.querySelector('.footer').offsetHeight;
    c3.y3 = ch3 / 3;

    ctx3.lineJoin = "round";
    ctx3.strokeStyle = "#000";
    ctx3.fillStyle = "rgba(255,255,255,0)";

    var line3 = new SquigglyLine3(0);
    lines3.push(line3);
});


var line3 = new SquigglyLine3(0);
lines3.push(line3);


function Draw3() {
    ctx3.clearRect(0, 0, cw3, ch3);
    requestId3 = window.requestAnimationFrame(Draw3);
    ctx3.fillRect(0, 0, cw3, ch3);
    noiseDetail(2, .5);
    for (var i = 0; i < lines3.length; i++) {
        lines3[i].phi3 += 1 / 30;
        lines3[i].draw(i);
    }
}

requestId3 = window.requestAnimationFrame(Draw3);

function map3(n, a, b, _a, _b) {
    var d = b - a;
    var _d = _b - _a;
    var u = _d / d;
    return _a + (n - a) * u;
}