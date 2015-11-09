function hoverListener(x, y, r){
    return x - r < x_move &&
        x + r > x_move &&
        y - r < y_move &&
        y + r > y_move;
}
function mouseDownListener(x, y, r){
    return x - r < x_down &&
        x + r > x_down &&
        y - r < y_down &&
        y + r > y_down;
}

function Circle(x, y, radius, powerDecrease, ball){
    this.x = x !== undefined ? x : width/2;
    this.y = y !== undefined ? y : height/2;
    this.radius = radius || 20;
    this.ball = ball || false;
    this.lineWidth = 2;
    this.hover = false;
    this.click = false;
    this.power = 0;
    this.powerDecrease = powerDecrease || 0.15;
    this.angle = null;
    this.radian = null;
    this.quater = null;
    this.x_koef = null;
    this.y_koef = null;
    this.tan = function(){
      return Math.tan(this.radian);
    };
    this.calculate = function(){
        var x_koef = 1/ this.tan() * (this.quater === 1 || this.quater === 4 ? 1 : -1);
        var y_koef = this.tan() * (this.quater === 1 || this.quater === 2 ? 1 : -1);
        if(Math.abs(x_koef) > 10 || Math.abs(y_koef) > 10){
            x_koef = x_koef/10;
            y_koef = y_koef/10;
        }
        if(this.angle === 0) {x_koef = 1; y_koef = 0;}
        if(this.angle === 180) {x_koef = -1; y_koef = 0;}
        if(this.angle === 90) {x_koef = 0; y_koef = 1}
        if(this.angle === 270) {x_koef = 0; y_koef = -1}
        this.x_koef = x_koef;
        this.y_koef = y_koef;
    };
    this.move = function(){
      if(this.power > 0){
          if((this.x-this.radius) <= 0 || (this.x+this.radius) >= width )
              this.x_koef = this.x_koef*(-1);
          if((this.y-this.radius) <= 0 || (this.y+this.radius) >= height )
              this.y_koef = this.y_koef*(-1);
          this.x = this.x + this.power*this.x_koef;
          this.y = this.y + this.power*this.y_koef;
          this.power = this.power - this.powerDecrease;
          for(var k = 0; k < circles.length; k++){
              if(circles[k] != clicked_circle){
                  var _circle = circles[k],
                      _r = _circle.radius;

                  if(Math.abs(_circle.x - this.x) <= 2*_r
                      && Math.abs(_circle.y - this.y) <= 2*_r
                      && _circle.power === 0){
                      var newCalc = calcAngle(_circle.x, _circle.y, this.x, this.y),
                        angleRest = newCalc.a%90;

                      /*if(angleRest < 45) {
                          this.radian += newCalc.r;
                      } else {
                          this.radian -= newCalc.r;
                      }
                      this.calculate();*/
                      switch (newCalc.q){
                          case 1:
                              this.x_koef = this.x_koef*-1;
                          break;
                          case 2:
                              this.x_koef = this.x_koef*-1;
                          break;
                          case 3:
                              this.y_koef = this.y_koef*-1;
                          break;
                          case 4:
                              this.y_koef = this.y_koef*-1;
                          break;
                      }
                      _circle.startMove(this.power*0.7,newCalc.r,newCalc.a,newCalc.q);
                  }
              }
          }
      } else {
          this.power = 0;
      }
    };
    this.startMove = function(power, radian, angle, quater){
      this.power = power;
      this.radian = radian;
      this.angle = angle;
      this.quater = quater;
      this.calculate();
    };
    this.checkHover = function(){
        if(hoverListener(this.x, this.y, this.radius)){
            this.hover = true;
            hover = true;
        } else {
            this.hover = false;
            hover = false;
        }
    };
    this.checkClick = function(){
        if(mouseDownListener(this.x, this.y, this.radius) && mouseDown && !this.ball){
            this.click = true;
            hover = true;
            if(clicked_circle !== this) clicked_circle = this;
        } else {
            this.click = false;
            hover = false;
        }
    };
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        this.checkHover();
        if(this.hover || this.click){
            ctx.fillStyle = 'green';
            ctx.fill();
        }
        if(this.ball){
            ctx.fillStyle = '#686AEF';
            ctx.fill();
        }
        this.checkClick();
        ctx.strokeStyle = '#003300';
        if(this.click){
            ctx.strokeStyle = 'red';
        }
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        if(this.click){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(x_move ,y_move);
            ctx.stroke();
        }
        this.move();
    };
}

function drawElements(){
    for(var i = 0; i < circles.length; i++){
        circles[i].draw();
    }
}

function clearArea(){
    ctx.clearRect(0, 0, width, height);
}

function cursorStyle(){
    if(hover){
        canvas.style.cursor = 'move';
    } else {
        canvas.style.cursor = 'pointer';
    }
}

function drawEverything(){
    clearArea();
    drawElements();
    cursorStyle();
}
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function animate(){
    requestID = requestAnimationFrame(animate);
    drawEverything();
}
function initGame(){
    circles.push(new Circle(200, 400));
    circles.push(new Circle(200, 200));
    circles.push(new Circle(300, 300));
    circles.push(new Circle(undefined,undefined,15,0.1, true));
    animate();
    console.log(requestID)
}
initGame();