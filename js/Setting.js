function createAirplane() {
  gameStepCount = 0;
  gameRemainHead = noOfPlaneHead;
  $("#showGameStepCount").text(gameStepCount);
  $("#showGameRemainHead").text(gameRemainHead);
  var loopingNoOfPlaneHead = noOfPlaneHead;
  while (loopingNoOfPlaneHead > 0) {
    if (!createAirplaneImplement(loopingNoOfPlaneHead)) {
      continue;
    }
    loopingNoOfPlaneHead -= 1;
  }
}

function createAirplaneImplement(loopingNoOfPlaneHead) {
  var headDirection = Math.floor(Math.random() * 4);
  var tmpArea = airplane1PossibleArea[headDirection];
  var xHead = GETRANDOMBETWEEN(airportLength + tmpArea.xEnd, tmpArea.xStart);
  var yHead = GETRANDOMBETWEEN(airportLength + tmpArea.yEnd, tmpArea.yStart);
  if (checkAirplaneValid(headDirection, xHead, yHead)) {
		var planeId = loopingNoOfPlaneHead;
    var planeDemo = airplane1[headDirection];
    for (var i = 0; i < planeDemo.length; i++) {
      var xAdjust = xHead + planeDemo[i].x;
      var yAdjust = yHead - planeDemo[i].y;
      airport[xAdjust][yAdjust].cellDefinition = planeBody;
			airport[xAdjust][yAdjust].planeId = planeId;
    }
    airport[xHead][yHead].cellDefinition = planeHead;
		airport[xHead][yHead].planeId = planeId;
    return true;
  } else {
    return false;
  }
}

function checkAirplaneValid(headDirection, xHead, yHead) {
  var valid = true;
  var planeDemo = airplane1[headDirection];
  for (var i = 0; i < planeDemo.length; i++) {
    var xAdjust = xHead + planeDemo[i].x;
    var yAdjust = yHead - planeDemo[i].y;
    valid = airport[xAdjust][yAdjust].cellDefinition == emptyCell;
    if (!valid) break;
  }
  return valid;
}

function selectGate(row, col) {
	CLOSE_ALL_POPUP();
  var selectCell = airport[row][col];
  if (!selectCell.visited){
		var selectCellNode = $("#airportGate_" + row + "_" + col);
    switch (selectCell.cellDefinition) {
      case planeHead: {
        selectCellNode.addClass("planeHead");
				break;
      }
      case planeBody: {
        selectCellNode.addClass("planeBody");
        break;
      }
      default: {
        selectCellNode.addClass("emptyCell");
        break;
      }
    }
    selectCell.visited = true;
    updateGameResult(selectCell.cellDefinition);
  }
}

function createSampleAirplane() {
  sampleAirport = [];
  for (var row = 0; row < sampleAirportLength; row++) {
    var airportGate = [];
    for (var col = 0; col < sampleAirportLength; col++) {
      airportGate.push({ ...defaultCell });
    }
    sampleAirport.push(airportGate);
  }

  var headDirection = 0;
  var xHead = 0;
  var yHead = 2;
  var planeDemo = airplane1[headDirection];
  for (var i = 0; i < planeDemo.length; i++) {
    var xAdjust = xHead + planeDemo[i].x;
    var yAdjust = yHead - planeDemo[i].y;
    sampleAirport[xAdjust][yAdjust].cellDefinition = planeBody;
  }
  sampleAirport[xHead][yHead].cellDefinition = planeHead;
}

function showInfo() {
  var inputObject = [
    {
      id: "inputAirportLength",
      type: "range",
      desc: "棋盤闊度",
      defaultValue: airportLength,
      prop: {
        max: 30,
        min: 10,
        step: 5,
				affectValue: "inputNoOfPlaneHead",
      },
    },
    {
      id: "inputNoOfPlaneHead",
      type: "range",
      desc: "飛機數量",
      defaultValue: noOfPlaneHead,
      prop: {
        max: Math.floor(airportLength / 3),
        min: 1,
        step: 1,
      },
    },
  ];
	
	var newContent = $("<div></div>");
	newContent.css("margin-bottom", "20px");
	newContent.text("使用模板: ");
	newContent.append(getSamplePlaneHtml());
	
	var actionList = [{
					desc: "確認",
					action: "updateDefaultSetting()",
					closeDialog: true
				}];
  SHOW_ALERT(
    "M", 
    "QUESTION",
    "遊戲設置",
    newContent,
		actionList,
    inputObject
  );
}

function updateDefaultSetting() {
  airportLength = Number($("#inputAirportLength").val());
  noOfPlaneHead = $("#inputNoOfPlaneHead").val();
  main();
}

function getSamplePlaneHtml() {
  createSampleAirplane();
	var setSampleAirportWidth = setScreenWidth * 0.25;
	var setSampleAirportHeight = setScreenWidth * 0.25;
	
	var newSampleAirport = $("<table></table>");
	newSampleAirport.addClass("sampleAirport w3-table");
	newSampleAirport.css("width", setSampleAirportWidth + "px");
	newSampleAirport.css("height", setSampleAirportHeight + "px");
	newSampleAirport.css("margin", "auto");
	
  for (var row = 0; row < sampleAirportLength; row++) {
		var newSampleAirportRow = $("<tr></tr>");
    for (var col = 0; col < sampleAirportLength; col++) {
			var newSampleAirportCol = $("<td></td>");
			newSampleAirportCol.addClass("airportGate");
      switch (sampleAirport[row][col].cellDefinition) {
        case planeHead: {
					newSampleAirportCol.addClass("planeHead");
          break;
        }
        case planeBody: {
					newSampleAirportCol.addClass("planeBody");
          break;
        }
        default: {
					newSampleAirportCol.addClass("emptyCell");
          break;
        }
      }
			newSampleAirportRow.append(newSampleAirportCol);
    }
		newSampleAirport.append(newSampleAirportRow);
  }
  return newSampleAirport;
}

function displaySampleAirplane(){
  $("#playground").append(getSamplePlaneHtml());
}

function showSamplePlaneDialog(){
  var sampleAirplaneHtml = getSamplePlaneHtml();
  SHOW_ALERT("M", "REMARK", "模板", sampleAirplaneHtml);
}

 function updateGameResult(cellDefinition) {
  gameStepCount++;
  if(cellDefinition == planeHead){
    gameRemainHead--;
  }
  $("#showGameStepCount").text(gameStepCount);
  $("#showGameRemainHead").text(gameRemainHead);
  if(gameRemainHead==0){
    var showContent = "一共使用" + gameStepCount + "步！";
    SHOW_ALERT("M", "ALERT", "恭喜尋找成功！", showContent, [], [], "bi-balloon-heart-fill");
    updateGameOver();
  }
 }
 
 function updateGameOver() {
  displayAllAirplane();
 }
