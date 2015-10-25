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
    this.tan = function(){
      return Math.tan(this.radian);
    };
    this.move = function(){
      if(this.power !== null && this.power > 0){
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
          this.x = this.x + this.power*x_koef;
          this.y = this.y + this.power*y_koef;
          this.power = this.power - 0.3;
      }
    };
    this.startMove = function(power, radian, angle, quater){
      this.power = power;
      this.radian = radian;
      this.angle = angle;
      this.quater = quater;
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
            ctx.lineTo(x_move,y_move);
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