var canvasX;
var canvasY;
var floatTip = document.getElementById("floatTip");
var floatTipStyle = floatTip.style;
var x = 0;
var y = 0;
const rect = canvas.getBoundingClientRect();

window.onbeforeunload = ()=>{window.scrollTo(0,0)}

document.getElementById("floatTip").onclick = ()=>floatTipStyle.display = "none"

canvas.addEventListener('mousedown', function(e) {
    clickOnMap(canvas, e)
});

//window.onresize = ()=> moveFloatTip(rect.left + tipX, rect.top + tipY);

document.getElementById("trashBtn").onclick = trashMode;

let btns = document.getElementsByClassName("X");
for(i = 0; i < btns.length; i++){
    btns[i].onchange = checkX;
}

btns = document.getElementsByClassName("R");
for(let i = 0; i < btns.length; i++){
    btns[i].onchange = checkR;
}

function clickOnMap(canvas, event) {
    let r = getCoordinate("R");
    if (r !== 0) {
        floatTipStyle.display = "none";
        canvasX = event.pageX - rect.left;
        canvasY = event.pageY - rect.top;
        x = (canvasX - 200) / 35;
        y = -(canvasY - 200) / 35;
        let req = new XMLHttpRequest();
        req.open("POST", location.href.replace(/[^/]*$/, '') + "/controller" , true);
        req.onload = ()=>{
            let point = JSON.parse(req.responseText);
            drawPoint(point.x, point.y, point.result)
            let table = document.getElementById("historyTable");
            table.innerHTML += `<tr><td class="historyX">${point.x}</td>
    <td class="historyY">${point.y}</td>
    <td class="historyR">${point.r}.0</td>
    <td class="historyResults">${point.result}</td></tr>`
        };
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(`X=${x}
            &Y=${y}&R=${r}
            &type=check-point&history=save`);
        floatTip.innerHTML = `x = ${x}<br>y = ${y}`;
        moveFloatTip(event.pageX - 192, event.pageY + 5);
        floatTipStyle.display = "block"
    } else {
        document.getElementById("tdUnderMap").innerHTML = "R не выбран"
    }
}

function moveFloatTip(posX, posY){
    floatTipStyle.left = posX;
    floatTipStyle.top = posY;
}

function loadRValues(){
    let Rs = document.getElementsByClassName("R");
    for(let i = 0; i < Rs.length; i++) {
        let result = getSavedValue(Rs[i].id);
        if(result) {
            $('cb_R_' + (i+1)).click();
            $('cb_R_' + (i+1)).checked = true;
            isROkay = true;
        }else{
            Rs[i].checked = result;
        }
    }
    checkX();
    checkY();
    draw();
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

loadRValues();



