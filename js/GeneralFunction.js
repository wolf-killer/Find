function DecimalAdjust(type, value, exp) {
  type = String(type);
  if (!["round", "floor", "ceil"].includes(type)) {
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
    );
  }
  exp = Number(exp);
  value = Number(value);
  if (exp % 1 !== 0 || Number.isNaN(value)) {
    return NaN;
  } else if (exp === 0) {
    return Math[type](value);
  }
  const [magnitude, exponent = 0] = value.toString().split("e");
  const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
  // Shift back
  const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
  return Number(`${newMagnitude}e${+newExponent + exp}`);
}
const Floor10 = (value, exp) => DecimalAdjust("floor", value, exp);

var setWidth = document.documentElement.scrollWidth;
var setHeight = document.documentElement.scrollHeight;

var GetUrlParameter = function GetUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};
function GoPage(pageName, param) {
  path = "./" + pageName + ".html?";
  Object.entries(param).forEach((entry) => {
    const [key, value] = entry;
    path += "" + key + "=" + value + "&";
  });
  window.location.href = path;
}
function SetWindow() {
  setWidth = GetUrlParameter("setWidth")
    ? GetUrlParameter("setWidth")
    : document.documentElement.scrollWidth;
  setHeight = GetUrlParameter("setHeight")
    ? GetUrlParameter("setHeight")
    : document.documentElement.scrollHeight;
  console.log("Available width/height: " + setWidth + "*" + screen.availHeight);
  $("#FixScreen").css("height", setHeight);
  $("#FixScreen").css("width", setWidth);
  $("#seatingPlan").css("height", setHeight);
  $("#seatingPlan").css("width", setWidth);
  $(".PopupInfo").css("max-height", setHeight - 10);
  $(".HiddenPopupInfo").css("max-height", setHeight - 40);
}
function ManualAdjustXY() {
  var x = $("#manualX").val();
  var y = $("#manualY").val();

  AdjustX(x);
  AdjustY(y);
}
function AdjustX(input) {
  if (input == "-") {
    setWidth = parseInt(setWidth) - 10;
  } else if (input == "+") {
    setWidth = parseInt(setWidth) + 10;
  } else {
    setWidth = parseInt(input);
  }
  $("#FixScreen").css("height", setHeight);
  $("#FixScreen").css("width", setWidth);
  $(".PopupInfo").css("max-height", setHeight - 10);
  $(".HiddenPopupInfo").css("max-height", setHeight - 40);
}
function AdjustY(input) {
  if (input == "-") {
    setHeight = parseInt(setHeight) - 10;
  } else if (input == "+") {
    setHeight = parseInt(setHeight) + 10;
  } else {
    setHeight = parseInt(input);
  }
  $("#FixScreen").css("height", setHeight);
  $("#FixScreen").css("width", setWidth);
  $(".PopupInfo").css("max-height", setHeight - 10);
  $(".HiddenPopupInfo").css("max-height", setHeight - 40);
}
function CloseHiddenPopupInfo() {
  $(".HiddenPopupInfo").css("display", "none");
  $(".ActionPopup").css("display", "none");
}
function ExtandSection(icon, sectionName) {
  if ($("#" + sectionName).hasClass("w3-show")) {
    $(icon).removeClass("bi-caret-up-fill");
    $(icon).addClass("bi-caret-down-fill");
    $("#" + sectionName).removeClass("w3-show");
    $("#" + sectionName).addClass("w3-hide");
  } else {
    $(icon).removeClass("bi-caret-down-fill");
    $(icon).addClass("bi-caret-up-fill");
    $("#" + sectionName).removeClass("w3-hide");
    $("#" + sectionName).addClass("w3-show");
  }
}
function UpdateBtn(mode, version) {
  $("." + mode).removeClass("wolf-btn-selected");
  $("#" + version).addClass("wolf-btn-selected");
  if (mode == "versionMode") {
    versionMode = version;
  } else if (mode == "windowMode") {
    windowMode = version;
  }
}
function ShowAlert(type, title, content, nextAction, inputObject) {
  /* Sample inputObject
var inputObject = [{
id: id,
type: type,
desc: desc,
defaultValue: defaultValue,
prop: {
max: max,
min: 1
}
}];
*/
  $("#alertDiv").removeClass("alertMode questionMode remarkMode");
  var icon, color;
  if (type == "alert") {
    icon = "bi-exclamation-diamond-fill";
    color = "red";
    $("#alertDiv").addClass("alertMode");
  } else if (type == "question" || type == "boolean") {
    icon = "bi-question-diamond-fill";
    color = "yellow";
    $("#alertDiv").addClass("questionMode");
  } else {
    icon = "bi-bookmark-star-fill";
    color = "blue";
    $("#alertDiv").addClass("remarkMode");
  }
  if (nextAction != null) {
    nextAction = "CloseHiddenPopupInfo(); " + nextAction;
  } else {
    nextAction = "CloseHiddenPopupInfo();";
  }
  $("#alertTitle").html(
    "<div class='w3-display-container w3-center w3-col-middle w3-pale-" +
      color +
      " w3-leftbar w3-rightbar w3-border-" +
      color +
      " w3-large'>" +
      " <i class='bi " +
      icon +
      " w3-text-" +
      color +
      "'></i>" +
      title +
      "</div>"
  );
  if (type == "question" || type == "boolean") {
    if (type == "question") {
      for (let i = 0; i < inputObject.length; i++) {
        content +=
          inputObject[i].desc +
          ": " +
          '<input class="w3-input w3-border" ' +
          ' id="' +
          inputObject[i].id +
          '" ' +
          ' type="' +
          inputObject[i].type +
          '" ' +
          ' value="' +
          inputObject[i].defaultValue +
          '" ';
        if (inputObject[i].type == "number") {
          content +=
            ' max="' +
            inputObject[i].prop.max +
            '" ' +
            ' min="' +
            inputObject[i].prop.min +
            '" ' +
            ' step="' +
            inputObject[i].prop.step +
            '" ';
        }
        content += ">";
      }
    }
    $("#alertContent").html(content);
    $("#alertAction").html(
      '<button class="wolf-btn w3-btn w3-round-large w3-pale-' +
        color +
        " w3-border-" +
        color +
        '" onclick="' +
        nextAction +
        '">' +
        "確認" +
        "</button>" +
        '<button class="wolf-btn w3-btn w3-round-large w3-pale-' +
        color +
        " w3-border-" +
        color +
        '" onclick="CloseHiddenPopupInfo()">' +
        "取消" +
        "</button>"
    );
  } else {
    $("#alertContent").html(content);
    $("#alertAction").html(
      '<button class="wolf-btn w3-btn w3-round-large w3-pale-' +
        color +
        " w3-border-" +
        color +
        '" onclick="' +
        nextAction +
        '">' +
        "關閉" +
        "</button>"
    );
  }
  $("#alertDiv").css("display", "block");
}
function ShowLog(nextAction) {
  let actionDesc = "關閉";
  if (nextAction == "startConfirmRole()") actionDesc = "開始確認身份";
  if (nextAction != null) {
    nextAction = "CloseHiddenPopupInfo(); " + nextAction;
  } else {
    nextAction = "CloseHiddenPopupInfo();";
  }
  $("#logAction").html(
    "<i class='wolf-btn-close bi bi-x-circle-fill' onclick='" +
      nextAction +
      "'></i>" +
      "<button class='wolf-btn w3-btn w3-round-large w3-pale-blue w3-border-blue' onclick='" +
      nextAction +
      "'>" +
      actionDesc +
      "</button>"
  );
  $("#logDiv").show();
}
function GetRandom() {
  var randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] / (0xffffffff + 1);
}
function GetRandomBetween(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function CreateButton(onclickfn, icon, display, hover) {
  var btn =
    "<span class='wolf-tag w3-medium btn-" +
    icon +
    "' onclick='ShowHoverTag($(this))' ondblclick='" +
    onclickfn +
    "' >";
  if (icon != null) btn += "<i class='bi " + icon + " wolf-btn w3-btn'></i>";
  if (display != null) btn += '<span style="">' + display + "</span>";
  if (hover != null) btn += '<span class="wolf-hovertag">' + hover + "</span>";
  btn += "</span>";
  return btn;
}
function RemoveButton(iconList) {
  for (let i = 0; i < iconList.length; i++) {
    $("." + iconList[i]).remove();
  }
}
function ShowHoverTag(e) {
  var tag = $(e.context.querySelector(".wolf-hovertag"));
  if (tag.length == 0) {
    e.dblclick();
    return;
  }
  if (tag.css("display") == "block") {
    e.dblclick();
  } else {
    tag.css("display", "block");
  }
  setTimeout(function () {
    tag.css("display", "none");
  }, 2000); // 1000ms = 1s
}
