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
    this.x = x || width/2;
    this.y = y || height/2;
    this.radius = 20;
    this.lineWidth = 2;
    this.hover = false;
    this.click = false;
    this.power = null;
    this.angle = null;
    this.move = function(){
      if(this.power !== null && this.power > 0){
          this.x = this.x + this.power;
          this.y = this.y + this.power;
          this.power = this.power - 0.3;
          console.log(this.x, this.y);
      }
    };
    this.startMove = function(power, angle){
      this.power = power;
      this.angle = angle;

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
    circles.push(new Player(400, 200));
    circles.push(new Player(400, 400));
    var gave = setInterval(function(){
        clearArea();
        drawElements();
        cursorStyle();
    }, 40);
}
initGame();