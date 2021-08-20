var canvas5 = document.getElementById("canvas-menu");
var ctx5 = canvas5.getContext("2d");
var c5 = {}
var cw5 = canvas5.width = document.querySelector('.topBar').offsetWidth;
c5.x5 = cw5 / 2;
var ch5 = canvas5.height = 7;
// c5.y5 = ch5 / 2;

ctx5.lineJoin = "round";
ctx5.strokeStyle = "#000";
ctx5.fillStyle = "rgba(255,255,255,0)";
ctx5.lineWidth = 0.5;
var rad5 = Math.PI / 180;
var x5, y5;

var amplitude5 = 5;
var frequency5 = .02;
var phi5 = 0;

var increment5 = 0.05;
var lines5 = [];



function SquigglyLine5(y5) {
    this.y5 = y5;
    this.xoff5 = Math.random() * 10000;
    this.Xoff5 = this.xoff5;
    this.phi5 = Math.random() * 10000;
    this.draw5 = function (i) {
        ctx5.clearRect(0, 0, cw5, ch5);
        ctx5.beginPath();
        // console.log(c);
        this.xoff5 = this.Xoff5; // reset xoff;

        for (var x5 = 0; x5 < cw5; x5 = x5 + 0.1) {
            // console.log(x5);
            if (x5 > cw5 / 3 && x5 < 2 * cw5 / 3) {
                var k5 = map5(x5, cw5 / 3, 2 * cw5 / 3, 0, 180);
            } else {
                k5 = 0;
            }

            var y5 = Math.abs(Math.sin((x5 + noise(this.xoff5) * 100) * frequency5 + this.phi5)) + this.y5;

            ctx5.lineTo(x5, y5);

            this.xoff5 += increment5;

        }
        // ctx5.lineTo(cw5 + 2, ch5 + 2);
        // ctx5.lineTo(-2, ch5 + 2);
        ctx5.closePath();
        ctx5.fill();
        ctx5.stroke();

    }
}

window.addEventListener('resize', function () {
    lines5.pop();

    cw5 = canvas5.width = document.querySelector('.topBar').offsetWidth;
    c5.x5 = cw5 / 2;
    ch5 = canvas5.height = 7;
    // c5.y5 = ch5 / 2;

    ctx5.lineJoin = "round";
    ctx5.strokeStyle = "#000";
    ctx5.fillStyle = "rgba(255,255,255,0)";
    ctx5.lineWidth = 0.5;

    var line5 = new SquigglyLine5(2);
    lines5.push(line5);
});


var line5 = new SquigglyLine5(2);
lines5.push(line5);


function Draw5() {
    requestId5 = window.requestAnimationFrame(Draw5);
    ctx5.fillRect(0, 0, cw5, ch5);
    noiseDetail(2, .5);
    for (var i = 0; i < lines5.length; i++) {
        lines5[i].phi5 += 1 / 30;
        lines5[i].draw5(i);
    }
}

requestId5 = window.requestAnimationFrame(Draw5);

function map5(n, a, b, _a, _b) {
    var d = b - a;
    var _d = _b - _a;
    var u = _d / d;
    return _a + (n - a) * u;
} 