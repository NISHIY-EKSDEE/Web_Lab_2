var canvas = document.querySelector("canvas");
var cx = canvas.getContext("2d");

function drawPoint(x, y, result, color="none"){
    let yPixels = -y * 35 + 200;
    let xPixels = x*35+200;
    cx.beginPath();
    cx.moveTo(xPixels,yPixels);
    cx.arc(xPixels, yPixels, 3, 0, 360, false);
    if(color !== "none")
        cx.fillStyle=color;
    else
    if(result === "true" && isROkay)
        cx.fillStyle="#00ff00";
    else
        cx.fillStyle="red";
    cx.fill();
}

function drawAllPoints(){
    let historyX = document.getElementsByClassName("historyX");
    let historyY = document.getElementsByClassName("historyY");
    for(let i = 0; i < historyX.length; i++ ){
        let req = new XMLHttpRequest();
        req.open("POST", location.href.replace(/[^/]*$/, '') + "/controller" , true);
        req.onload = ()=>{
            let point = JSON.parse(req.responseText);
            drawPoint(point.x, point.y, point.result)};
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(`X=${historyX[i].innerHTML}
            &Y=${historyY[i].innerHTML}&R=${getCoordinate("R")}
        &type=check-point`)
    }
}

function draw(){
    if(trashBtn.value == 0){
        cx.fillStyle="#ffebcd";
        cx.fillRect(0,0, 400, 400)
    }else{
        cx.clearRect(0, 0, canvas.width, canvas.height);
    }
    let y = document.getElementById("YTextField").value
    let r = getCoordinate("R");
    let x = getCoordinate("X");

    let yPixels = y * 35 + 200;
    let rPixels = r*35;
    let xPixels = x*35+200;

    cx.fillStyle="#3e9fdb";
    cx.fillRect(200-rPixels, 200-rPixels, rPixels, rPixels);
    cx.beginPath();
    cx.moveTo(200-rPixels, 200);
    cx.arcTo(200 - rPixels, 200 + rPixels, 200, 200 + rPixels, rPixels);
    cx.lineTo(200 + rPixels/2, 200);
    cx.lineTo(200 - rPixels, 200);
    cx.fill();

    cx.beginPath();
    cx.moveTo(0,200);
    cx.lineTo(400, 200);
    cx.lineTo(395, 195);
    cx.moveTo(400,200);
    cx.lineTo(395, 205);
    cx.moveTo(200,0);
    cx.lineTo(200,400);
    cx.moveTo(200, 0);
    cx.lineTo(195, 5);
    cx.moveTo(200,0);
    cx.lineTo(205, 5);
    cx.fillStyle="black";
    cx.fillText("0", 205, 195)
    for(var i = 0; i <= 400; i+=35){
        if(i == 175) continue;
        cx.moveTo(i + 25, 197);
        cx.lineTo(i + 25, 203);
        cx.fillText(i/35 - 5, i + 23, 215);
        cx.fillText( -(i/35 - 5), 207, i + 27)
        cx.moveTo(197, i + 25);
        cx.lineTo(203, i + 25);
    }

    cx.stroke();

    drawAllPoints();

    if(isXOkay && isYOkay){
        drawPoint(x,y, false, "purple");
    }
}