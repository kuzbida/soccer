var canvas = document.getElementById("ctx"),
    width = canvas.width,
    height = canvas.height,
    ctx     = canvas.getContext('2d'),
    circles = [],
    x_move = null,
    y_move = null,
    x_down = null,
    y_down = null,
    x_up = null,
    y_up = null,
    hover = false,
    mouseDown = false,
    clicked_circle = false,
    requestID = null,
    img = new Image;;