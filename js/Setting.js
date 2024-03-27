function createAirplane() {
  gameStepCount = 0;
  gameRemainHead = totalNoOfGraphic;
  $(".showGameStepCount").text(gameStepCount);
  $(".showGameRemainHead").text(gameRemainHead);
  var loopingNoOfPlaneHead = totalNoOfGraphic;
  // get grapic model
  gameGraphic = [];
  for (var i = 0; i < noOfGraphic.length; i++) {
    for (var j = 0; j < noOfGraphic[i]; j++) {
      gameGraphic.push({ graphicModel: i })
    }
  }
  while (loopingNoOfPlaneHead > 0) {
    if (!createAirplaneImplement(loopingNoOfPlaneHead)) {
      continue;
    }
    loopingNoOfPlaneHead -= 1;
  }
}

function createAirplaneImplement(loopingNoOfPlaneHead) {
  var graphicModel = gameGraphic[loopingNoOfPlaneHead - 1].graphicModel;
  var headDirection = Math.floor(Math.random() * 4);
  var tmpArea = airplanePossibleArea[graphicModel][headDirection];
  var xHead = GETRANDOMBETWEEN(airportLength + tmpArea.xEnd, tmpArea.xStart);
  var yHead = GETRANDOMBETWEEN(airportLength + tmpArea.yEnd, tmpArea.yStart);
  if (checkAirplaneValid(headDirection, xHead, yHead, graphicModel)) {
    var planeId = loopingNoOfPlaneHead;
    var planeDemo = airplane[graphicModel][headDirection];
    for (var i = 0; i < planeDemo.length; i++) {
      var xAdjust = xHead + planeDemo[i].x;
      var yAdjust = yHead - planeDemo[i].y;
      airport[xAdjust][yAdjust].cellDefinition = planeBody;
      airport[xAdjust][yAdjust].planeId = planeId;
    }
    airport[xHead][yHead].cellDefinition = planeHead;
    airport[xHead][yHead].planeId = planeId;
    airport[xHead][yHead].graphicModel = graphicModel;
    gameGraphic[loopingNoOfPlaneHead - 1].headDirection = headDirection;
    gameGraphic[loopingNoOfPlaneHead - 1].headLocation = { x: xHead, y: yHead };
    return true;
  } else {
    return false;
  }
}

function checkAirplaneValid(headDirection, xHead, yHead, graphicModel) {
  var valid = true;
  var planeDemo = airplane[graphicModel][headDirection];
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

function loadDefaultSettingDialog() {

  var newGraphicOptionTable = $("<table></table>");
  newGraphicOptionTable.addClass("transparentSampleAirport w3-table");

  // Show Graphic Option
  var newGraphicOptionTableRow = $("<tr></tr>");
  for (var i = 0; i < airplane.length; i++) {
    var newGraphicOptionTableRowCol = $("<td></td>");
    newGraphicOptionTableRowCol.append(getSamplePlaneHtml(false, 0, i));

    var newContentInput = $("<select>");
    newContentInput.addClass("w3-input w3-border");
    newContentInput.attr("id", "inputGraphic" + i);
    newContentInput.change(function(e) {
      updateEachGraphicMax($(this));
    })
    for (var n = 0; n <= 10; n++) {
      var newOption = $('<option />', { value: n, text: n });
      newOption.prop('disabled', n > maxGraphic);
      newOption.appendTo(newContentInput);
    }
    newGraphicOptionTableRowCol.append(newContentInput);
    // Show Graphic Option
    newGraphicOptionTableRow.append(newGraphicOptionTableRowCol);
  }

  newGraphicOptionTable.append(newGraphicOptionTableRow);
  $("#graphicOptionList").append(newGraphicOptionTable);
}

function showUpdateDialog() {
  SHOW_OVERLAY(true);
  $("#inputAirportLength").val(airportLength);
  $(".showinputAirportLength").text(airportLength);
  $(".showMaxGraphic").text(maxGraphic);
  for (var i = 0; i < noOfGraphic.length; i++) {
    $("#inputGraphic" + i).val(noOfGraphic[i]);
  }
  $("#updateDialog").show();
}

function updateEachGraphicMax(e) {
  var updatingId = e ? e.attr('id') : "";
  var updatingVal = e ? Number(e.val()) : 0;
  var tmpMaxGraphic = DECIMALADJUST("floor", Number($("#inputAirportLength").val()) / 3, 0);
  var remainGraphic = tmpMaxGraphic - updatingVal;
  for (var i = 0; i < airplane.length; i++) {
    var tmpId = "inputGraphic" + i;
    if (tmpId == updatingId)
      continue;
    var tmpContentInput = $("#" + tmpId);
    if (Number(tmpContentInput.val()) > remainGraphic) {
      tmpContentInput.val(0);
    }
    $("#" + tmpId + " > option").each(function() {
      $(this).prop('disabled', $(this).val() > remainGraphic);
    });
  }
}

function updateMaxGraphic() {
  $(".showinputAirportLength").text(Number($("#inputAirportLength").val()));
  $(".showMaxGraphic").text(DECIMALADJUST("floor", Number($("#inputAirportLength").val()) / 3, 0));
  //check total > available
  var currentTotal = 0;
  for (var i = 0; i < noOfGraphic.length; i++) {
    currentTotal += Number($("#inputGraphic" + i).val());
  }
  if (currentTotal > DECIMALADJUST("floor", Number($("#inputAirportLength").val()) / 3, 0)) {
    for (var i = 0; i < noOfGraphic.length; i++) {
      $("#inputGraphic" + i).val(0);
    }
  }
  updateEachGraphicMax();
}

function updateDefaultSetting() {
  //checking
  var currentMaxGraphic = DECIMALADJUST("floor", Number($("#inputAirportLength").val()) / 3, 0);
  var currentTotal = 0;
  for (var i = 0; i < noOfGraphic.length; i++) {
    currentTotal += Number($("#inputGraphic" + i).val());
  }
  if (currentTotal == 0 || currentTotal > currentMaxGraphic) {
    SHOW_SNACKBAR("圖案數量錯誤！", 3);
  } else {
    airportLength = Number($("#inputAirportLength").val());
    maxGraphic = DECIMALADJUST("floor", airportLength / 3, 0);
    for (var i = 0; i < noOfGraphic.length; i++) {
      noOfGraphic[i] = Number($("#inputGraphic" + i).val());
    }
    totalNoOfGraphic = noOfGraphic.reduce((partialSum, a) => partialSum + a, 0);
    CLOSE_ALL_POPUP();
    main();
  }
}

function createSampleAirplane(direction, graphics) {
  sampleAirport = [];
  for (var row = 0; row < sampleAirportLength; row++) {
    var airportGate = [];
    for (var col = 0; col < sampleAirportLength; col++) {
      airportGate.push({ ...defaultCell });
    }
    sampleAirport.push(airportGate);
  }

  var headDirection = direction;
  var xHead = graphics == 0 && (direction == 1 || direction == 0) ? airplanePossibleArea[graphics][headDirection].xStart + 1 : airplanePossibleArea[graphics][headDirection].xStart;
  var yHead = graphics == 0 && direction == 2 ? airplanePossibleArea[graphics][headDirection].yStart + 1 : airplanePossibleArea[graphics][headDirection].yStart;

  var planeDemo = airplane[graphics][headDirection];
  for (var i = 0; i < planeDemo.length; i++) {
    var xAdjust = xHead + planeDemo[i].x;
    var yAdjust = yHead - planeDemo[i].y;
    sampleAirport[xAdjust][yAdjust].cellDefinition = planeBody;
  }
  sampleAirport[xHead][yHead].cellDefinition = planeHead;
}

function getSamplePlaneHtml(transparent, direction, graphics) {
  createSampleAirplane(direction, graphics);
  var setSampleAirportWidth = setScreenWidth * 0.2;
  var setSampleAirportHeight = setScreenWidth * 0.2;

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
  var samplePlaneHtml = $("<div></div>");
  samplePlaneHtml.addClass("flex-container");
  samplePlaneHtml.css("display", "flex");
  var directionArray = [3, 0, 1, 2];
  for (var i = 0; i < directionArray.length; i++) {
    samplePlaneHtml.append(getSamplePlaneHtml(true, directionArray[i], 0));
  }
  //return samplePlaneHtml;
  $(".infoSamplePlane").html(samplePlaneHtml);
}

function showTestingDialog() {
  SHOW_SNACKBAR("REMARK", 3);
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
  var sampleGraphicModel = instructionAirplaneLocation[loopingNoOfPlaneHead].graphicModel;

  if (true) {
    var planeId = loopingNoOfPlaneHead;
    var planeDemo = airplane[sampleGraphicModel][headDirection];
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