var setSquareLength = 0;

function main() {
  initTable();
  appendSeat();
  createAirplane();
}

function initTable() {
  console.log("[DEBUG] >> ", setHeight, "||", setWidth);
  setSquareLength = setHeight < setWidth ? setHeight - 150 : setWidth;
  setSquareLength = Floor10(setSquareLength - 50, 1);
  setSeatLength = setSquareLength / airportLength;
  $("#playground").css("height", setHeight < setWidth ? setHeight - 150 : setWidth);
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
      html += "<td id='airportGate_" + row + "_" + col + "' " +
        "class='airportGate' " +
        "onClick='selectGate(" + row + "," + col + ")'></td>";
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
          break;
        }
        default: {
          $("#airportGate_" + row + "_" + col).addClass("emptyCell");
          break;
        }
      }
    }
  }
}