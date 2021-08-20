var canvas2 = document.getElementById("canvas-header");
var ctx2 = canvas2.getContext("2d");
var c2 = {}
var cw2 = canvas2.width = document.querySelector('.header').offsetWidth;
c2.x2 = cw2 / 2;
var ch2 = canvas2.height = document.querySelector('.header').offsetHeight;
c2.y2 = ch2 / 2;

ctx2.lineJoin = "round";
ctx2.strokeStyle = "#000";
ctx2.fillStyle = "rgba(255,255,255,0)";
var rad2 = Math.PI / 180;
var x2, y2;

var amplitude2 = 5;
var frequency2 = .02;
var phi2 = 0;

var increment2 = 0.05;
var lines2 = [];



function SquigglyLine2(y2) {
    this.y2 = y2;
    this.xoff2 = Math.random() * 10000;
    this.Xoff2 = this.xoff2;
    this.phi2 = Math.random() * 10000;
    this.draw = function (i) {
        ctx2.beginPath();
        // console.log(c);
        this.xoff2 = this.Xoff2; // reset xoff;

        for (var x2 = -2; x2 < cw2 + 2; x2++) {
            // console.log(x2);
            if (x2 > cw2 / 3 && x2 < 2 * cw2 / 3) {
                var k2 = map2(x2, cw2 / 3, 2 * cw2 / 3, 0, 180);
            } else {
                k2 = 0;
            }

            var y2 = -Math.abs(Math.sin((x2 + noise(this.xoff2) * 100) * frequency2 + this.phi2) * (amplitude2 + k2 * rad2)) + this.y2;

            ctx2.lineTo(x2, y2);

            this.xoff2 += increment2;

        }
        ctx2.lineTo(cw2 + 2, ch2 + 2);
        ctx2.lineTo(-2, ch2 + 2);
        ctx2.closePath();
        ctx2.fill();
        ctx2.stroke();

    }
}

window.addEventListener('resize', function () {
    lines2.pop();

    cw2 = canvas2.width = document.querySelector('.header').offsetWidth;
    c2.x2 = cw2 / 2;
    ch2 = canvas2.height = document.querySelector('.header').offsetHeight;
    c2.y2 = ch2 / 2;

    ctx2.lineJoin = "round";
    ctx2.strokeStyle = "#000";
    ctx2.fillStyle = "rgba(255,255,255,0)";

    var line2 = new SquigglyLine2(ch2);
    lines2.push(line2);
});


var line2 = new SquigglyLine2(ch2);
lines2.push(line2);


function Draw2() {
    ctx2.clearRect(0, 0, cw2, ch2);
    requestId2 = window.requestAnimationFrame(Draw2);
    ctx2.fillRect(0, 0, cw2, ch2);
    noiseDetail(2, .5);
    for (var i = 0; i < lines2.length; i++) {
        lines2[i].phi2 += 1 / 30;
        lines2[i].draw(i);
    }
    // ctx2.clearRect(0,0, cw2, ch2);
}

requestId2 = window.requestAnimationFrame(Draw2);

function map2(n, a, b, _a, _b) {
    var d = b - a;
    var _d = _b - _a;
    var u = _d / d;
    return _a + (n - a) * u;
}