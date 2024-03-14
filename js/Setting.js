function createAirplane() {
  gameStepCount = 0;
  gameRemainHead = noOfPlaneHead;
  $(".showGameStepCount").text(gameStepCount);
  $(".showGameRemainHead").text(gameRemainHead);
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
  var tmpArea = airplanePossibleArea[0][headDirection];
  var xHead = GETRANDOMBETWEEN(airportLength + tmpArea.xEnd, tmpArea.xStart);
  var yHead = GETRANDOMBETWEEN(airportLength + tmpArea.yEnd, tmpArea.yStart);
  if (checkAirplaneValid(headDirection, xHead, yHead)) {
    var planeId = loopingNoOfPlaneHead;
    var planeDemo = airplane[0][headDirection];
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
  var planeDemo = airplane[0][headDirection];
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
  if (!selectCell.visited) {
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

function showUpdateDialog() {
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
  newContent.append(getSamplePlaneHtml(false, 0));

  var actionList = [{
    desc: "確認",
    action: "updateDefaultSetting()",
    closeDialog: true
				}];
  SHOW_ALERT(
    "L",
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

function createSampleAirplane(direction) {
  sampleAirport = [];
  for (var row = 0; row < sampleAirportLength; row++) {
    var airportGate = [];
    for (var col = 0; col < sampleAirportLength; col++) {
      airportGate.push({ ...defaultCell });
    }
    sampleAirport.push(airportGate);
  }

  var headDirection = direction;
  var xHead = direction == 1 ? airplanePossibleArea[0][headDirection].xStart + 1 : airplanePossibleArea[0][headDirection].xStart;
  var yHead = direction == 2 ? airplanePossibleArea[0][headDirection].yStart + 1 : airplanePossibleArea[0][headDirection].yStart;

  var planeDemo = airplane[0][headDirection];
  for (var i = 0; i < planeDemo.length; i++) {
    var xAdjust = xHead + planeDemo[i].x;
    var yAdjust = yHead - planeDemo[i].y;
    sampleAirport[xAdjust][yAdjust].cellDefinition = planeBody;
  }
  sampleAirport[xHead][yHead].cellDefinition = planeHead;
}

function getSamplePlaneHtml(transparent, direction) {
  createSampleAirplane(direction);
  var setSampleAirportWidth = setScreenWidth * 0.25;
  var setSampleAirportHeight = setScreenWidth * 0.25;

  var newSampleAirport = $("<table></table>");
  if (transparent) {
    newSampleAirport.addClass("transparentSampleAirport w3-table");
  } else {
    newSampleAirport.addClass("sampleAirport w3-table");
  }
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
          if (transparent) {
            newSampleAirportCol.addClass("transparentCell");
          }
          break;
        }
      }
      newSampleAirportRow.append(newSampleAirportCol);
    }
    newSampleAirport.append(newSampleAirportRow);
  }
  return newSampleAirport;
}

function displaySampleAirplane() {
  var sameplePlaneHtml = $("<div></div>");
  sameplePlaneHtml.addClass("flex-container");
  sameplePlaneHtml.css("display", "flex");
  var directionArray = [3, 0, 1, 2];
  for (var i = 0; i < directionArray.length; i++) {
    sameplePlaneHtml.append(getSamplePlaneHtml(true, directionArray[i]));
  }
  $(".infoSamplePlane").html(sameplePlaneHtml);
}

function showTestingDialog() {
  var showContent = "！恭喜！</br><span class='showGameStepCount'>" + gameStepCount + "步</span></br>成功找出模型";
  SHOW_ALERT("M", "SUCCESS", showContent, null, [], [], "bi-balloon-heart-fill");
}

function createInstructionAirplane() {
  instructionAirport = [];
  for (var row = 0; row < instructionAirportLength; row++) {
    var airportGate = [];
    for (var col = 0; col < instructionAirportLength; col++) {
      airportGate.push({ ...defaultCell });
    }
    instructionAirport.push(airportGate);
  }

  var loopingNoOfPlaneHead = noOfInstructionAirplane;
  for (var i = 0; i < instructionAirplaneLocation.length; i++) {
    createInstructionAirplaneImplement(i);
  }
}

function createInstructionAirplaneImplement(loopingNoOfPlaneHead) {
  var headDirection = instructionAirplaneLocation[loopingNoOfPlaneHead].direction;
  var xHead = instructionAirplaneLocation[loopingNoOfPlaneHead].xStart;
  var yHead = instructionAirplaneLocation[loopingNoOfPlaneHead].yStart;

  if (true) {
    var planeId = loopingNoOfPlaneHead;
    var planeDemo = airplane[0][headDirection];
    for (var i = 0; i < planeDemo.length; i++) {
      var xAdjust = xHead + planeDemo[i].x;
      var yAdjust = yHead - planeDemo[i].y;
      instructionAirport[xAdjust][yAdjust].cellDefinition = planeBody;
      instructionAirport[xAdjust][yAdjust].planeId = planeId;
    }
    instructionAirport[xHead][yHead].cellDefinition = planeHead;
    instructionAirport[xHead][yHead].planeId = planeId;
    return true;
  } else {
    return false;
  }
}

function getInstructionAirportHtml() {
  createInstructionAirplane();
  var setInstructionAirportWidth = setScreenWidth * 0.25;
  var setInstructionAirportHeight = setScreenWidth * 0.25;

  var newInstructionAirport = $("<table></table>");
  newInstructionAirport.addClass("sampleAirport w3-table");
  newInstructionAirport.css("width", setInstructionAirportWidth + "px");
  newInstructionAirport.css("height", setInstructionAirportHeight + "px");
  newInstructionAirport.css("margin", "auto");

  for (var row = 0; row < instructionAirportLength; row++) {
    var newInstructionAirportRow = $("<tr></tr>");
    for (var col = 0; col < instructionAirportLength; col++) {
      var newInstructionAirportCol = $("<td></td>");
      newInstructionAirportCol.addClass("airportGate");
      switch (instructionAirport[row][col].cellDefinition) {
        case planeHead: {
          newInstructionAirportCol.addClass("planeHead");
          break;
        }
        case planeBody: {
          newInstructionAirportCol.addClass("planeBody");
          break;
        }
        default: {
          newInstructionAirportCol.addClass("emptyCell");
          break;
        }
      }
      newInstructionAirportRow.append(newInstructionAirportCol);
    }
    newInstructionAirport.append(newInstructionAirportRow);
  }
  return newInstructionAirport;
}

function showInstructionDialog() {
  var newInstructionTab = $("<div></div>");
  newInstructionTab.addClass("instructionTab");

  /* Game Instruction */
  var newInstructionTitle1 = $("<div></div>");
  newInstructionTitle1.addClass("instructionTitle");
  newInstructionTitle1.text("遊戲規則");

  var newInstructionText1 = $("<div></div>");
  newInstructionText1.addClass("instructionContent");
  newInstructionText1.text("棋盤中隱藏多架如圖所示的飛機，玩家需透過推理，以最少的步數找出全部紅色的飛機頭。");

  var newInstructionAirport = $("<div></div>");
  newInstructionAirport.addClass("instructionContent");
  newInstructionAirport.append(getInstructionAirportHtml());

  newInstructionTab.append(newInstructionTitle1);
  newInstructionTab.append(newInstructionText1);
  newInstructionTab.append(newInstructionAirport);

  /* Screen Instruction */
  var newInstructionTitle2 = $("<div></div>");
  newInstructionTitle2.addClass("instructionTitle");
  newInstructionTitle2.text("介面說明");

  var newScreenInstructionTab = $("<div></div>");
  newScreenInstructionTab.addClass("instructionTab");
  for (var i = 1; i < screenInstruction.length; i++) {
    var newScreenText = $("<div></div>");
    newScreenText.addClass("instructionContent");
    newScreenText.html(screenInstruction[i].text);
    var newScreenImage = $('<img />', {
      id: 'screenImage' + i,
      src: screenInstruction[i].img,
      alt: 'screenImage' + i,
      width: setScreenWidth * 0.1
    });
    newScreenImage.addClass("instructionContent");

    newScreenInstructionTab.append(i % 2 == 0 ? newScreenText : newScreenImage);
    newScreenInstructionTab.append(i % 2 == 0 ? newScreenImage : newScreenText);
  }

  newInstructionTab.append(newInstructionTitle2);
  newInstructionTab.append(newScreenInstructionTab);

  SHOW_ALERT("L", "REMARK", "說明", newInstructionTab);
}

function updateGameResult(cellDefinition) {
  gameStepCount++;
  if (cellDefinition == planeHead) {
    gameRemainHead--;
  }
  $(".showGameStepCount").text(gameStepCount);
  $(".showGameRemainHead").text(gameRemainHead);
  if (gameRemainHead == 0) {
    var showContent = "！恭喜！</br><span class='showGameStepCount'>" + gameStepCount + "步</span></br>成功找出模型";

    var actionList = [{
      desc: "重新開始",
      action: "main()",
      closeDialog: true
    				}];

    SHOW_ALERT("M", "SUCCESS", showContent, null, actionList, [], "bi-balloon-heart-fill");
    updateGameOver();
  }
}

function updateGameOver() {
  displayAllAirplane();
}