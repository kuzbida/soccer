canvas.addEventListener('mousedown', function(event){
    x_down = event.offsetX,
    y_down = event.offsetY;
    mouseDown = true;
    console.log(mouseDown)
}, true);

canvas.addEventListener('mouseup', function(event){
    var x_up = event.offsetX,
        y_up = event.offsetY;
    mouseDown = false;
    clicked_circle = null;
    console.log(mouseDown)
}, true);

canvas.addEventListener('mousemove', function(event){
    x_move = event.offsetX;
    y_move = event.offsetY;
}, true);
