function createAirplane() {
while (noOfPlaneHead > 0) {
if (!createAirplaneImplement()) {
continue;
}
noOfPlaneHead -= 1;
}
}
 
function createAirplaneImplement(){
var headDirection = Math.floor(Math.random() * 4);
var tmpArea = airplane1PossibleArea[headDirection];
var xHead = GetRandomBetween(airportLength + tmpArea.xEnd, tmpArea.xStart);
var yHead = GetRandomBetween(airportLength + tmpArea.yEnd, tmpArea.yStart); 
var check = checkAirplaneValid(headDirection, xHead, yHead);
if(checkAirplaneValid(headDirection, xHead, yHead)) {
var planeDemo = airplane1[headDirection];
for(var i=0; i<planeDemo.length; i++){
var xAdjust = xHead + planeDemo[i].x;
var yAdjust = yHead - planeDemo[i].y;
airport[xAdjust][yAdjust].cellDefinition = planeBody;
}
airport[xHead][yHead].cellDefinition = planeHead;
return true;
}else{
return false;
}
}
 
function checkAirplaneValid(headDirection, xHead, yHead){
var valid = true;
var planeDemo = airplane1[headDirection];
for(var i=0; i<planeDemo.length; i++){
var xAdjust = xHead + planeDemo[i].x;
var yAdjust = yHead - planeDemo[i].y;
valid = airport[xAdjust][yAdjust].cellDefinition == emptyCell;
if(!valid) break;
}
return valid;
}
 
function selectGate(row, col){
var selectCell = airport[row][col];
if(!selectCell.visited)
switch(selectCell.cellDefinition){
case planeHead: {
$("#airportGate_"+row+"_"+col).addClass("planeHead");
break;
}
case planeBody: {
$("#airportGate_"+row+"_"+col).addClass("planeBody");
break;
}
default: {
$("#airportGate_"+row+"_"+col).addClass("emptyCell");
break;
}
}
selectCell.visited = true; 
}

function showInfo(){
  var inputObject = [{
    id: "inputAirportLength",
    type: "number",
    desc: "棋盤闊度",
    defaultValue: airportLength,
    prop: {
      max: 50,
      min: 10
    }
  		}, {
    id: "inputNoOfPlaneHead",
    type: "number",
    desc: "飛機數量",
    defaultValue: noOfPlaneHead,
    prop: {
      max: 3,
      min: 1
    }
  		}];
  var content = "<br/>";
  ShowAlert("question",
    "遊戲設置",
    content,
    "updateDefaultSetting()",
    inputObject);
}

function updateDefaultSetting() {
  airportLength= $("#inputAirportLength").value();
  noOfPlaneHead= $("#inputNoOfPlaneHead").value();
  main();
}

