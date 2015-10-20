canvas.addEventListener('mousedown', function(event){
    x_down = event.offsetX,
    y_down = event.offsetY;
    mouseDown = true;
    console.log(mouseDown)
}, true);

canvas.addEventListener('mouseup', function(event){
    x_up = event.offsetX,
    y_up = event.offsetY;
    mouseDown = false;
    if(clicked_circle){
        var x_difference = clicked_circle.x - x_up,
            y_difference = clicked_circle.y - y_up,
            vector_length = Math.sqrt(Math.pow(x_difference, 2) + Math.pow(y_difference, 2)),
            power = vector_length/10,
            opposite =  Math.sqrt(Math.pow(clicked_circle.y - y_up, 2)),
            sinOfAngle = opposite / vector_length,
            angle = Math.asin(sinOfAngle) * 180/Math.PI;
        if(x_difference > 0 && y_difference > 0){
            //first quater
            console.log('first')
        } else if(x_difference < 0 && y_difference > 0){
            angle = 90 + angle;
            console.log('second')
        } else if(x_difference < 0 && y_difference < 0){
            angle = 180 + angle;
            console.log('third')
        } else if(x_difference > 0 && y_difference < 0){
            angle = 270 + angle;
            console.log('fourth')
        }
            console.log('________power: '+power);
            console.log('________angle: '+angle);
    }
}, true);

canvas.addEventListener('mousemove', function(event){
    x_move = event.offsetX;
    y_move = event.offsetY;
}, true);
