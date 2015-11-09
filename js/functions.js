function calcAngle (x_start, y_start, x_end, y_end){
    var x_difference = x_start - x_end,
        y_difference = y_start - y_end,
        vector_length = Math.sqrt(Math.pow(x_difference, 2) + Math.pow(y_difference, 2)),
        power = vector_length/10 > 12 ? 12 : vector_length/10,
        opposite =  Math.sqrt(Math.pow(y_difference, 2)),
        radian = Math.asin(opposite / vector_length),
        angle = radian * 180/Math.PI,
        quater = null;
    if(x_difference >= 0 && y_difference >= 0){
        //first quater
        quater = 1;
        console.log('first')
    } else if(x_difference <= 0 && y_difference >= 0){
        angle = 90 + angle;
        quater = 2;
        console.log('second')
    } else if(x_difference <= 0 && y_difference <= 0){
        angle = 180 + angle;
        quater = 3;
        console.log('third')
    } else if(x_difference >= 0 && y_difference <= 0){
        angle = 270 + angle;
        quater = 4;
        console.log('fourth')
    }
    var calcObj = {
        p: power,
        r: radian,
        a: angle,
        q: quater
    };
    console.log(calcObj);
    return calcObj;
}