let test = document.querySelectorAll('.grid-item');


for (i = 0; i < test.length; i++) {
    test[i].id = 'item' + i;
}

for (let i = 0; i < test.length; i++) {
    test[i].addEventListener("mouseenter", function () {
        // highlight the mouseover target
        var newDiv = document.createElement("canvas");
        // and give it some content
        var newContent = document.createTextNode("환영합니다!");
        newDiv.classList.add('canvas-mouseover');
        newDiv.appendChild(newContent);
        newDiv.id = 'canvas-mouseover';


        let cs = getComputedStyle(document.querySelector(`#item${i}`));
 
        let paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        let paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

        let borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
        let borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

        // Element width and height minus padding and border
        elementWidth = document.querySelector(`#item${i}`).offsetWidth - paddingX - borderX;
        elementHeight = document.querySelector(`#item${i}`).offsetHeight - paddingY - borderY;
        
        var currentDiv = document.getElementById(`item${i}`);
        // add the newly created element and its content into the DOM
        currentDiv.appendChild(newDiv);

        var canvas6 = document.getElementById("canvas-mouseover");
        var ctx6 = canvas6.getContext("2d");
        var c6 = {}
        var cw6 = canvas6.width = elementWidth;
        c6.x6 = cw6 / 2;
        var ch6 = canvas6.height = elementHeight;
        c6.y6 = ch6 / 2;

        ctx6.lineJoin = "round";
        ctx6.strokeStyle = "#000";
        ctx6.fillStyle = "rgba(255,255,255,1)";
        var rad6 = Math.PI / 180;
        var x6, y6;

        var amplitude6 = 5;
        var frequency6 = .02;
        var phi6 = 0;

        var increment6 = 0.05;
        var lines6 = [];

        function SquigglyLine6(y6) {
            this.y6 = y6;
            this.xoff6 = Math.random() * 10000;
            this.Xoff6 = this.xoff6;
            this.phi6 = Math.random() * 10000;
            this.draw6 = function (i) {
                ctx6.beginPath();
                this.xoff6 = this.Xoff6; // reset yoff;

                for (var x6 = -2; x6 < cw6; x6++) {

                    if (x6 > cw6 / 3 && x6 < 2 * cw6 / 3) {
                        var k6 = map6(x6, cw6 / 3, 2 * cw6 / 3, 0, 180);
                    } else {
                        k6 = 0;
                    }

                    var y6 = -Math.abs(Math.sin((x6 + noise(this.xoff6) * 100) * frequency6 + this.phi6) * (amplitude6 + k6 * rad6)) + this.y6;

                    if (this.y6 == 0) { y6 = -1 * y6; }
                    ctx6.lineTo(x6, y6);

                    this.xoff6 += increment6;

                }
                // ctx.lineTo(cw*this.x + 2, -1*y);
                // ctx.lineTo(cw*this.x + 2, 2);
                ctx6.closePath();
                ctx6.fill();
                ctx6.stroke();

            }
        }

        for (var y6 = ch6; y6 <= ch6; y6 += ch6) {
            var line6 = new SquigglyLine6(y6);
            lines6.push(line6);
        }

        function Draw6() {
            requestId6 = window.requestAnimationFrame(Draw6);
            ctx6.fillRect(0, 0, cw6, ch6);

            noiseDetail(2, .5);

            for (var i = 0; i < lines6.length; i++) {
                lines6[i].phi6 += 1 / 30;
                lines6[i].draw6(i);
            }

        }

        requestId6 = window.requestAnimationFrame(Draw6);

        function map6(n, a, b, _a, _b) {
            var d = b - a;
            var _d = _b - _a;
            var u = _d / d;
            return _a + (n - a) * u;
        }
    });

    test[i].addEventListener("mouseleave", function () {
        var newDiv = document.getElementById('canvas-mouseover');

        var currentDiv = document.getElementById(`item${i}`);
        // add the newly created element and its content into the DOM
        currentDiv.removeChild(newDiv);
    });

}


