var isXOkay = false;
var isYOkay = false;
var isROkay = false;

function loadRValues(){
    let Rs = document.getElementsByClassName("R");
    for(let i = 0; i < Rs.length; i++) {
        let result = getSavedValue(Rs[i].id);
        if(result) {
            Rs[i].click();
        }else{
            Rs[i].checked = result;
        }
    }
}

function saveRValues(){
    let Rs = document.getElementsByClassName("R")
    for(let i = 0; i < Rs.length; i++)
    {
        let id = Rs[i].id;  // get the sender's id to save it .
        let val = Rs[i].checked; // get the value.
        localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override .
    }
}

function getSavedValue(v) {
    return localStorage.getItem(v) == "true";
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
        for(let i = 0; i < btns.length; i++){
            if(btns[i] != this) {
                btns[i].checked = false;
            }
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
    saveRValues();
    draw();
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