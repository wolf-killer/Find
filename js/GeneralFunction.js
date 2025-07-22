var screenWidth = document.documentElement.scrollWidth;
var screenHeight = document.documentElement.scrollHeight;
var setScreenWidth = document.documentElement.scrollWidth;
var setScreenHeight = document.documentElement.scrollHeight;

/* Draggable Function */
const d = {};
document.addEventListener("mousedown", (e) => {
  const closestDialog = e.target.closest("#PopupDialog");
  const isCardTitle = e.target.classList.contains("PopupDialog_Title");
  const isCardTitleSpan =
    e.target.tagName == "SPAN" &&
    e.target.parentElement.classList.contains("PopupDialog_Title");
  const isTargetCorrect = isCardTitle || isCardTitleSpan;
  if (e.button === 0 && closestDialog != null && isTargetCorrect) {
    // element which can be used to move element
    d.el = closestDialog; // element which should be moved
    d.mouseStartX = e.clientX;
    d.mouseStartY = e.clientY;
    d.elStartX = d.el.getBoundingClientRect().left;
    d.elStartY = d.el.getBoundingClientRect().top;
    d.el.style.position = "fixed";
    d.el.style.margin = 0;
    d.oldTransition = d.el.style.transition;
    d.el.style.transition = "none";
  }
});
document.addEventListener("mousemove", (e) => {
  if (d.el === undefined) return;
  d.el.style.left =
    Math.min(
      Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
      window.innerWidth - d.el.getBoundingClientRect().width
    ) + "px";
  d.el.style.top =
    Math.min(
      Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
      window.innerHeight - d.el.getBoundingClientRect().height
    ) + "px";
});
document.addEventListener("mouseup", () => {
  if (d.el === undefined) return;
  d.el.style.transition = d.oldTransition;
  d.el = undefined;
});

function GET_URL_PARAM(sParam) {
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
}

function GO_PAGE(pageName, param) {
  path = "./" + pageName + ".html?";
  Object.entries(param).forEach((entry) => {
    const [key, value] = entry;
    path += "" + key + "=" + value + "&";
  });
  window.location.href = path;
}

function SET_WINDOW() {
  // Auto set full screen for $("#FixScrren")
  setScreenWidth = GET_URL_PARAM("setScreenWidth")
    ? GET_URL_PARAM("setScreenWidth")
    : screenWidth;
  setScreenHeight = GET_URL_PARAM("setScreenHeight")
    ? GET_URL_PARAM("setScreenHeight")
    : screenHeight;
  //console.log("Available width/height: " + setScreenWidth + "*" + screen.availHeight);
  $("#FixScreen").css("height", setScreenHeight);
  $("#FixScreen").css("width", setScreenWidth);
  $(".PopupInfo").css("max-height", setScreenHeight - 10);
  $(".HiddenPopupInfo").css("max-height", setScreenHeight - 30);
}

function MANUAL_ADJUST_SCREEN_SIZE_BY_DIALOG(x, y) {
  //var x = $("#manualX").val();
  //var y = $("#manualY").val();
  MANUAL_ADJUST_SCREEN_WIDTH(x);
  MANUAL_ADJUST_SCREEN_HEIGHT(y);
}

function MANUAL_ADJUST_SCREEN_WIDTH(input) {
  if (input == "-") {
    setScreenWidth = parseInt(setScreenWidth) - 10;
  } else if (input == "+") {
    setScreenWidth = parseInt(setScreenWidth) + 10;
  } else {
    setScreenWidth = parseInt(input);
  }
  $("#FixScreen").css("height", setScreenHeight);
  $("#FixScreen").css("width", setScreenWidth);
  $(".PopupInfo").css("max-height", setScreenHeight - 10);
  $(".HiddenPopupInfo").css("max-height", setScreenHeight - 30);
}

function MANUAL_ADJUST_SCREEN_HEIGHT(input) {
  if (input == "-") {
    setScreenHeight = parseInt(setScreenHeight) - 10;
  } else if (input == "+") {
    setScreenHeight = parseInt(setScreenHeight) + 10;
  } else {
    setScreenHeight = parseInt(input);
  }
  $("#FixScreen").css("height", setScreenHeight);
  $("#FixScreen").css("width", setScreenWidth);
  $(".PopupInfo").css("max-height", setScreenHeight - 10);
  $(".HiddenPopupInfo").css("max-height", setScreenHeight - 30);
}

function SHOW_OVERLAY(show) {
  if (show) {
    $("#Overlay").show();
  } else {
    $("#Overlay").hide();
  }
}

function SHOW_V_MENU(show) {
  if (show) {
    $("#VmenuOpen").hide();
    $("#VmenuClose").show();
    $("#Vmenu").show();
    $("#VmenuOverlay").css("height", setScreenHeight);
  } else {
    $("#Vmenu").hide();
    $("#VmenuOpen").show();
    $("#VmenuClose").hide();
  }
}

function IS_V_MENU_ACTIVE() {
  return $("#Vmenu").css("display") == "block";
}

function CLOSE_ALL_POPUP() {
  SHOW_OVERLAY(false);
  SHOW_V_MENU(false);
  $(".HiddenPopupInfo").css("display", "none");
  $(".HiddenSnackbar").css("display", "none");
  $(".ActionPopup").css("display", "none");
}

function SHOW_ALERT(
  size,
  type,
  title,
  content,
  actionBtn = [],
  inputObject = [],
  icon = null
) {
  /* 
    Support Type: 
  		1. ALERT
  		2. QUESTION
  		3. REMARK
  		4. SUCCESS
  */
  /*
  	Sample actionBtn
  		var actionBtn = [
  			{
  				desc: "關閉",
  				action: "CLOSE_ALL_POPUP()",
  				closeDialog: true
  			}
  		]
  */
  /* 
    Sample inputObject
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
  var color;
  type = type.toUpperCase();

  $("#Overlay").show();
  var dialogDiv = $("#PopupDialog");

  dialogDiv.removeClass(
    "Dialog-ALERT Dialog-QUESTION Dialog-REMARK Dialog-SUCCESS"
  );
  dialogDiv.removeClass(
    "HiddenPopupInfo-S HiddenPopupInfo-M HiddenPopupInfo-L"
  );
  dialogDiv.addClass("Dialog-" + type);
  dialogDiv.addClass("HiddenPopupInfo-" + size);

  if (type == "ALERT") {
    icon = icon ? icon : "bi-exclamation-diamond-fill";
    color = "red";
  } else if (type == "QUESTION") {
    icon = icon ? icon : "bi-question-diamond-fill";
    color = "yellow";
  } else if (type == "SUCCESS") {
    icon = icon ? icon : "bi-balloon-heart-fill";
    color = "red";
  } else {
    icon = icon ? icon : "bi-bookmark-star-fill";
    color = "blue";
  }

  dialogDiv.html("");

  /* ADD DIALOG TITLE SECTION */
  var newTitleDiv = $("<div></div>");
  newTitleDiv.addClass(
    "PopupDialog_Title w3-container w3-large w3-leftbar w3-rightbar"
  );
  newTitleDiv.addClass("w3-pale-" + color);
  newTitleDiv.addClass("w3-border-" + color);

  var newTitleIcon = $("<i></i>");
  newTitleIcon.addClass("bi");
  newTitleIcon.addClass(icon);
  newTitleIcon.addClass("w3-text-" + color);
  newTitleIcon.css("margin-right", "10px");

  var newTitleIcon2 = $("<i></i>");
  newTitleIcon2.addClass("bi");
  newTitleIcon2.addClass(icon);
  newTitleIcon2.addClass("w3-text-" + color);
  newTitleIcon2.css("margin-left", "10px");

  var newTitleDesc = $("<span></span>");
  newTitleDesc.html(title);

  var newCloseBtn = $("<i></i>");
  newCloseBtn.addClass("PopupDialog_CloseBtn bi bi-x");
  newCloseBtn.attr("onClick", "CLOSE_ALL_POPUP()");

  newTitleDiv.append(newTitleIcon);
  newTitleDiv.append(newTitleDesc);
  if (type == "SUCCESS") newTitleDiv.append(newTitleIcon2);
  newTitleDiv.append(newCloseBtn);

  dialogDiv.prepend(newTitleDiv);

  /* ADD DIALOG CONTENT SECTION */
  var newContentDiv = $("<div></div>");
  newContentDiv.addClass("PopupDialog_Content w3-container w3-medium");

  var newContentDesc = $("<div></div>");
  newContentDesc.addClass("w3-center");
  // newContentDesc.html(content);
  newContentDesc.append(content);

  if (type == "QUESTION") {
    var newContentInputSection = $("<div></div>");
    for (let i = 0; i < inputObject.length; i++) {
      var newContentInputDesc = $("<div></div>");
      newContentInputDesc.text(inputObject[i].desc + ": ");
      newContentInputSection.append(newContentInputDesc);

      var newContentInput = $("<input>");
      newContentInput.addClass("w3-input w3-border");
      newContentInput.attr("id", inputObject[i].id);
      newContentInput.attr("type", inputObject[i].type);
      newContentInput.attr("value", inputObject[i].defaultValue);

      if (inputObject[i].type == "range") {
        var newContentInputRangeDesc = $("<span></span>");
        newContentInputRangeDesc.attr("id", "show" + inputObject[i].id);
        newContentInputRangeDesc.text(inputObject[i].defaultValue);
        newContentInputDesc.append(newContentInputRangeDesc);

        newContentInput.attr("max", inputObject[i].prop.max);
        newContentInput.attr("min", inputObject[i].prop.min);
        newContentInput.attr("step", inputObject[i].prop.step);
        var affectValue = inputObject[i].prop["affectValue"]
          ? inputObject[i].prop["affectValue"]
          : "";
        console.log(affectValue);
        newContentInput.attr(
          "oninput",
          "UPDATERANGEDISPLAY('" +
            inputObject[i].id +
            "', '" +
            affectValue +
            "' )"
        );
        newContentInputSection.append(newContentInput);
      }
    }
  }

  newContentDiv.append(newContentDesc);
  newContentDiv.append(newContentInputSection);

  dialogDiv.append(newContentDiv);

  /* ADD DIALOG ACTION SECTION */
  var newActionDiv = $("<div></div>");
  newActionDiv.addClass("PopupDialog_Action w3-container w3-medium");

  if (actionBtn && actionBtn.length > 0) {
    for (let i = 0; i < actionBtn.length; i++) {
      if (actionBtn[i].closeDialog) {
        actionBtn[i].action = actionBtn[i].action + "; CLOSE_ALL_POPUP();";
      }
    }
  }
  actionBtn.push({
    desc: "關閉",
    action: "CLOSE_ALL_POPUP();",
    closeDialog: true,
  });

  for (let i = 0; i < actionBtn.length; i++) {
    var newActionBtn = $("<button></button>");
    newActionBtn.addClass("PopupDialog_ActionBtn w3-btn w3-round-large");
    newActionBtn.addClass("w3-pale-" + color);
    newActionBtn.addClass("w3-border-" + color);
    newActionBtn.attr("onClick", actionBtn[i].action);
    newActionBtn.text(actionBtn[i].desc);
    newActionDiv.append(newActionBtn);
  }

  dialogDiv.append(newActionDiv);
  dialogDiv.show();
}

function SHOW_SNACKBAR(content, second) {
  // SNACKBAR AUTOCLOSE after ? second
  var snackbarDiv = $("#Snackbar");
  var newContentDiv = $("<div></div>");
  newContentDiv.addClass("PopupDialog_Content w3-container w3-medium");

  var newContentDesc = $("<div></div>");
  newContentDesc.addClass("w3-center");
  newContentDesc.append(content);
  snackbarDiv.append(newContentDesc);
  snackbarDiv.show();

  setTimeout(() => {
    snackbarDiv.hide();
    snackbarDiv.empty();
  }, second * 1000);
}

function UPDATERANGEDISPLAY(field, affectNextField) {
  var slider = $("#" + field);
  var fieldOutput = $("#show" + field);
  fieldOutput.html(slider.val());
  if (affectNextField.length > 0) {
    var nextInputField = $("#" + affectNextField);
    var nextInputFieldOutput = $("#show" + affectNextField);
    if ((affectNextField = "inputNoOfPlaneHead")) {
      var maxPlane = Math.floor(slider.val() / 3);
      if (nextInputField.val() > maxPlane) {
        nextInputFieldOutput.html(maxPlane);
        nextInputField.val(maxPlane);
      }
      nextInputField.attr("max", maxPlane);
    }
  }
}

// -- MATHS FUNCTION --
function GETRANDOMBETWEEN(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DECIMALADJUST(type, value, exp) {
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
