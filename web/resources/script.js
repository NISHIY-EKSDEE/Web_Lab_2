var isXOkay = false;
var isYOkay = false;
var isROkay = false;
var canvas = document.querySelector("canvas");
var cx = canvas.getContext("2d");

$(document).ready(function() {
    $(window).onload(saveSettings);
        loadSettings();
});

function loadSettings() {
    let Rs = document.getElementsByClassName("R");
    for(let i = 0; i < Rs.length; i++)
        Rs[i].checked = localStorage[Rs[i].id];
}

function saveSettings(){
    let Rs = document.getElementsByClassName("R");
    for(let i = 0; i < Rs.length; i++)
        localStorage[Rs[i].id] = Rs[i].checked
}

checkX();
checkY();
checkR();
canvas.addEventListener('mousedown', function(e) {
    clickOnMap(canvas, e)
});

let btns = document.getElementsByClassName("X");
for(i = 0; i < btns.length; i++){
    btns[i].onchange = checkX;
}

btns = document.getElementsByClassName("R");
for(i = 0; i < btns.length; i++){
    btns[i].onchange = checkR;
}

document.getElementById("trashBtn").onclick = trashMode;

function clickOnMap(canvas, event) {
    if (getCoordinate("R") != 0) {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left - 200) / 35;
        const y = -(event.clientY - rect.top - 200) / 35;
        drawPoint(x, y, getCoordinate("R"), "black");
        let form = document.getElementById("hiddenForm");
        document.getElementById("hiddenX").value = x;
        document.getElementById("hiddenY").value = y;
        document.getElementById("hiddenR").value = getCoordinate("R");
        form.submit();
    } else {
        document.getElementById("tdUnderMap").innerHTML = "R не выбран"
    }
}

function checkX(){
    let btns = document.getElementsByClassName("X");
    if(this.checked){
        for(i = 0; i < btns.length; i++){
            if(btns[i] != this)
                btns[i].checked = false;
        }
        isXOkay = true;
        document.getElementById("wrongX").innerHTML = "";
        if(isEverythingOkay())
            document.getElementById("checkBtn").disabled=false;
    }
    else{
        document.getElementById("checkBtn").disabled=true;
        isXOkay = false;
        document.getElementById("wrongX").innerHTML = "X не выбран";
    }
    draw();
}

function checkR(){
    let btns = document.getElementsByClassName("R");
    if(this.checked){
        for(i = 0; i < btns.length; i++){
            if(btns[i] != this)
                btns[i].checked = false;
        }
        isROkay = true;
        document.getElementById("wrongR").innerHTML = "";
        document.getElementById("tdUnderMap").innerHTML = "";
        if(isEverythingOkay())
            document.getElementById("checkBtn").disabled=false;
    }
    else{
        document.getElementById("checkBtn").disabled=true;
        isROkay = false;
        document.getElementById("wrongR").innerHTML = "R не выбран";
    }
    draw();
    //onChangeR();
}

function onChangeR(){
    let historyX = document.getElementsByClassName("historyX");
    let historyY = document.getElementsByClassName("historyY");
    for(let i = 0; i < historyX.length; i++){
        let req = new XMLHttpRequest();
        req.open("POST", document.domain + "/controller" , true);
        req.onload = ()=>{
            let point = JSON.parse(req.responseText);
            drawPoint(point.x, point.y, point.result)};
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(`X=${historyX[i].innerHTML}
            &Y=${historyY[i].innerHTML}&R=${getCoordinate("R")}
        &type=check-points`)
    }
}


function checkY(){
    let yText = document.getElementById("YTextField").value;
    if(yText != "" && !isNaN(yText) && +yText >= -5 && +yText <= 5){
        const f = yText => ( (yText.toString().includes('.')) ? (yText.toString().split('.').pop().length) : (0) );
        const nulls = yText.toString().split('.').pop().toString().substring(0, 15).split('0').length -1;

        if(f(yText) > 15 && nulls == 15){
            document.getElementById("wrongY").style.color = "#ff8800";
            document.getElementById("wrongY").innerHTML = "ОСТОРОЖНО!<br>При работе с такими маленькими числами возможны ошибки";
        }
        else	document.getElementById("wrongY").innerHTML = "";
        isYOkay = true;
        if(isEverythingOkay())
            document.getElementById("checkBtn").disabled=false;
    }
    else{
        document.getElementById("wrongY").style.color = "red";
        if(yText == "")
            document.getElementById("wrongY").innerHTML = "Y не введен";
        else
        if(isNaN(yText))
            document.getElementById("wrongY").innerHTML = "Y должен быть числом (от -5 до 5)";
        else
        if(!(+yText >= -5 && +yText <= 5))
            document.getElementById("wrongY").innerHTML = "Y не входит в допустимый диапазон (от -5 до 5)";
        else
        if(!(/^((0|-?[1-4])(\.[0-9]*[1-9]+)?)|(5|-5)$/.test(yText)))
            document.getElementById("wrongY").innerHTML = "Пожалуйста, уберите ненужные нули";
        isYOkay = false;
        document.getElementById("checkBtn").disabled=true;
    }
    draw();
}

function isEverythingOkay(){
    return isXOkay&&isYOkay&&isROkay;
}

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
        &type=check-points`)
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

function trashMode(){
    let trashBtn = document.getElementById("trashBtn");
    if(trashBtn.value == 0){
        trashBtn.value = 1;
        document.body.style.background = "pink url('./resources/design.png') top";
        Array.from(document.getElementsByClassName("input")).forEach((el) =>
            el.style.background = "rgba(255, 192, 203, 0.8)");
        Array.from(document.getElementsByClassName("cellsWithBorders")).forEach((el) =>
            el.style.background = "rgba(255, 192, 203, 0.8)");
        draw();
    }
    else{
        trashBtn.value = 0;
        document.body.style.background = "url('./resources/background.jpg')";
        draw();
        Array.from(document.getElementsByClassName("input")).forEach((el) =>
            el.style.background = "#e0d2b5");
        Array.from(document.getElementsByClassName("cellsWithBorders")).forEach((el) =>
            el.style.background = "#e0d2b5");

    }

}

function getCoordinate(coord){
    let btns = document.getElementsByClassName(coord);
    for(let i = 0; i < btns.length; i++)
        if(btns[i].checked){
            return btns[i].value;
        }
    return 0;
}