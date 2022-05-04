/**
 * 2022 Sergio Soriano - sergiosoriano.com
 */

const FPS = 60;

const SHAPES = [
  [1632],
  [8738, 3840, 17476, 240],
  [610, 114, 562, 624],
  [802, 1136, 550, 113],
  [1570, 116, 547, 368],
  [561, 864, 1122, 54],
  [306, 1584, 612, 99],
];

var Grid = require("./grid").Grid;
var Shape = require("./shape").Shape;
var Key = require("./key").Key;

var blessed = require("blessed");
var screen = blessed.screen();

// Quit on Escape, q, or Control-C.
screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

let currentShape;
let grid;
let level;
let score;
let time;

let keyLeft  = new Key(0.15);
let keyRight = new Key(0.15);
let keyDown  = new Key(0.20);
let keyUp    = new Key();

const loop = (dt) => {

  update(dt);
  render();

  requestAnimationFrame(loop);
};

function update(dt) {

  if (currentShape == null || currentShape.remove) {
    let lines = grid.checkLines();
    if (lines > 0) {
      score += lines * 100;
      if (score > level * 1000) {
        level++;
      }
    }

    let shapeId = Math.floor(Math.random() * 7);
    currentShape = new Shape(SHAPES[shapeId], shapeId + 1, grid);
    currentShape.x = 3;
    time = 0;

    if (!currentShape.canMove(currentShape.x, currentShape.y)) {
      // GAME OVER
      init();
      return;
    }
  }

  if (time > 1) {
    time = 0;
    currentShape.moveDown();
  } else {
    time += dt * level;
  }

  if (keyLeft.isJustPressed() || keyLeft.isHoldDown()) {
    keyLeft.setState(Key.PRESSED);
    currentShape.moveLeft();
  } else if (keyLeft.isPressed()) {
    keyLeft.addHoldDownTime(dt * level);
  }

  if (keyRight.isJustPressed() || keyRight.isHoldDown()) {
    keyRight.setState(Key.PRESSED);
    currentShape.moveRight();
  } else if (keyRight.isPressed()) {
    keyRight.addHoldDownTime(dt * level);
  }

  if (keyDown.isJustPressed() || keyDown.isHoldDown()) {
    keyDown.setState(Key.PRESSED);
    time = 0;
    currentShape.moveDown();
  } else if (keyDown.isPressed()) {
    keyDown.addHoldDownTime(dt * 10 * level);
  }

  if (keyUp.isJustPressed()) {
    keyUp.setState(Key.PRESSED);
    currentShape.rotateRight();
  }

}

let box;
let renderer = function(x, y, color) {
  blessed.box({
    parent: box,
    left: x << 1,
    top: y,
    width: 2,
    height: 1,
    style: {
      bg: color,
    },
  });
}

function render() {

  // render screen
  box = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: grid.cols << 1,
    height: grid.rows,
    style: {
      bg: "#000", // clear color
    },
  });

  grid.render(renderer);
  if(currentShape != null) currentShape.render(renderer);
  screen.render();

  // clear screen
  box.destroy();

}

function init() {
  grid = new Grid(10, 20);
  currentShape = null;
  level = 1;
  score = 0;
  time = 0;
}

let dt = 1000 / FPS;
let lt = new Date().getTime();
function requestAnimationFrame(callback) {
  let now = new Date().getTime();
  let diff = now - lt;
  lt = now;
  setTimeout(function () {
    callback(diff * 0.001);
  }, Math.max(0, diff - dt));
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

init();
loop(0);
