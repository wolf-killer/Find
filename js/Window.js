var setSquareLength = 0;

function main() {
  SET_WINDOW();
  initTable();
  appendSeat();
  createAirplane();
  displaySampleAirplane();
}

function initTable() {
  //console.log("[DEBUG] >> ", setScreenHeight, "||", setScreenWidth);
  let setMaxLength = 700;
  setScreenWidth = setScreenWidth > setMaxLength ? 500 : setScreenWidth;
  setSquareLength =
    setScreenHeight < setScreenWidth ? setScreenHeight - 150 : setScreenWidth;
  setSquareLength = DECIMALADJUST("floor", setSquareLength - 50, 1);
  setSeatLength = setSquareLength / airportLength;
  $("#airport").css("height", setSquareLength);
  $("#airport").css("width", setSquareLength);
  $(".airportGate").css("width", setSeatLength);
  $(".airportGate").css("height", setSeatLength);
}

function appendSeat() {
  var html = "";
  airport = [];
  for (var row = 0; row < airportLength; row++) {
    html += "<tr>";
    var airportGate = [];
    for (var col = 0; col < airportLength; col++) {
      html +=
        "<td id='airportGate_" +
        row +
        "_" +
        col +
        "' " +
        "class='airportGate' " +
        "style='display: inherif;'" +
        "onClick='selectGate(" +
        row +
        "," +
        col +
        ")'></td>";
      airportGate.push({ ...defaultCell });
    }
    airport.push(airportGate);
    html += "</tr>";
  }
  $("#airport").html(html);
}

function displayAllAirplane() {
  for (var row = 0; row < airport.length; row++) {
    for (var col = 0; col < airport[row].length; col++) {
      switch (airport[row][col].cellDefinition) {
        case planeHead: {
          $("#airportGate_" + row + "_" + col).addClass("planeHead");
          break;
        }
        case planeBody: {
          $("#airportGate_" + row + "_" + col).addClass("planeBody");
          $("#airportGate_" + row + "_" + col).addClass(
            "planeBody_" + airport[row][col].planeId
          );
          break;
        }
        default: {
          $("#airportGate_" + row + "_" + col).addClass("emptyCell");
          break;
        }
      }
      airport[row][col].visited = true;
    }
  }

  if (gameStepCount <= 0) {
    gameStepCount = airportLength * airportLength;
    gameRemainHead = 0;
  }

  $("#showGameStepCount").text(gameStepCount);
  $("#showGameRemainHead").text(gameRemainHead);
}
