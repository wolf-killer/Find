// init
var maxx = document.documentElement.clientWidth;
var maxy = document.documentElement.clientHeight;
var halfx = maxx / 2;
var halfy = maxy / 2;
var canvas = document.createElement("canvas");
document.documentElement.appendChild(canvas);
canvas.width = maxx;
canvas.height = maxy;
var context = canvas.getContext("2d");
var dotCount = 200;
var dots = [];
// create dots
for (var i = 0; i < dotCount; i++) {
  dots.push(new dot());
}

// dots animation
function render() {
  context.fillStyle = "#080e3b";
  context.fillRect(0, 0, maxx, maxy);
  for (var i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}

// dots class
// @constructor
function dot() {
  this.rad_x = 2 * Math.random() * halfx + 1;
  this.rad_y = 1.2 * Math.random() * halfy + 1;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.1;
  this.size = Math.random() * 5 + 1;
  this.fontSize = Math.random() * 10 + 1;
  this.color = Math.floor(Math.random() * 256);
}

// drawing dot
dot.prototype.draw = function () {
  // calc polar coord to decart
  var dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
  var dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);

  // set color
  // context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
  context.fillStyle = "rgb(247,247," + this.color + ")"; // base on Yellow

  // set font size
  context.font = this.fontSize + "px FontAwesome";

  // draw dot
  // context.fillRect(dx, dy, this.size, this.size);

  // draw flight
  context.fillText("\uf072", dx, dy);
};

// calc new position in polar coord
dot.prototype.move = function () {
  this.alpha += this.speed;
  // change color
  if (Math.random() * 100 < 50) {
    this.color += 1;
  } else {
    this.color -= 1;
  }
};

// start animation
render();
