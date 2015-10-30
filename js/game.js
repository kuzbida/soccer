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

function Player(x, y){
    this.x = x !== undefined ? x : width/2;
    this.y = y !== undefined ? y : height/2;
    this.radius = 20;
    this.lineWidth = 2;
    this.hover = false;
    this.click = false;
    this.power = null;
    this.angle = null;
    this.radian = null;
    this.quater = null;
    this.x_koef = null;
    this.y_koef = null;
    this.line_x = null;
    this.line_y = null;
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
      if(this.power !== null && this.power > 0){
          if((this.x-this.radius) <= 0 || (this.x+this.radius) >= width )
              this.x_koef = this.x_koef*(-1);
          if((this.y-this.radius) <= 0 || (this.y+this.radius) >= height )
              this.y_koef = this.y_koef*(-1);
          this.x = this.x + this.power*this.x_koef;
          this.y = this.y + this.power*this.y_koef;
          this.power = this.power - 0.15;
          for(var k = 0; k < circles.length; k++){
              if(circles[k] != clicked_circle){
                  var _circle = circles[k],
                      _r = _circle.radius;

                  if(Math.abs(_circle.x - this.x) <= 2*_r + 2
                      && Math.abs(_circle.y - this.y) <= 2*_r + 2){
                      this.x_koef = this.x_koef*-1;
                      this.y_koef = this.y_koef*-1;
                  }
              }
          }
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
        if(mouseDownListener(this.x, this.y, this.radius) && mouseDown){
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
            if(Math.sqrt(Math.pow((this.x - x_move), 2)
                + Math.pow((this.y - y_move), 2)) < 120){
                this.line_x = x_move;
                this.line_y = y_move;
            }
            ctx.lineTo(this.line_x ,this.line_y);
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

function initGame(){
    circles.push(new Player);
    circles.push(new Player(200, 400));
    circles.push(new Player(400, 400));
    var gave = setInterval(function(){
        clearArea();
        drawElements();
        cursorStyle();
    }, 40);
}
initGame();