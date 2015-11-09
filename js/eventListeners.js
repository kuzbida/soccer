canvas.addEventListener('mousedown', function(event){
    x_down = event.offsetX;
    y_down = event.offsetY;
    mouseDown = true;
}, true);

canvas.addEventListener('mouseup', function(event){
    x_up = event.offsetX;
    y_up = event.offsetY;
    mouseDown = false;
    if(clicked_circle){
        var angleObj = calcAngle(clicked_circle.x, clicked_circle.y, x_up, y_up );
        clicked_circle.startMove(angleObj.p, angleObj.r, angleObj.a, angleObj.q);
    }
}, true);

canvas.addEventListener('mousemove', function(event){
    x_move = event.offsetX;
    y_move = event.offsetY;
}, true);
