const up = 0;
const down = 1;
const left = 2;
const right = 3;

const planeHead = 2;
const planeBody = 1;
const emptyCell = 0;

const defaultCell = {
  cellDefinition: emptyCell,
	planeId: null,
  visited: false,
};

var sampleAirport;
var sampleAirportLength = 5;

var instructionAirport;
var instructionAirportLength = 10;
var noOfInstructionAirplane = 3;
var instructionAirplaneLocation = [
	{ xStart: 0, yStart: 7, direction: 0, airplaneId: 1},
	{ xStart: 4, yStart: 0, direction: 2, airplaneId: 1},
	{ xStart: 9, yStart: 6, direction: 1, airplaneId: 1}
]

var airport;
var airportLength = 10;
var noOfPlaneHead = 2;

var gameStepCount = 0;
var gameRemainHead = noOfPlaneHead;

const airplane1 = [
  [
    //up
    { x: +0, y: +0 },
    { x: +1, y: +2 },
    { x: +1, y: +1 },
    { x: +1, y: +0 },
    { x: +1, y: -1 },
    { x: +1, y: -2 },
    { x: +2, y: +0 },
    { x: +3, y: +1 },
    { x: +3, y: +0 },
    { x: +3, y: -1 },
  ],
  [
    //down
    { x: +0, y: +0 },
    { x: -1, y: +2 },
    { x: -1, y: +1 },
    { x: -1, y: +0 },
    { x: -1, y: -1 },
    { x: -1, y: -2 },
    { x: -2, y: +0 },
    { x: -3, y: +1 },
    { x: -3, y: +0 },
    { x: -3, y: -1 },
  ],
  [
    //left
    { x: +0, y: +0 },
    { x: +0, y: -1 },
    { x: -1, y: -1 },
    { x: -2, y: -1 },
    { x: +1, y: -1 },
    { x: +2, y: -1 },
    { x: +0, y: -2 },
    { x: +0, y: -3 },
    { x: -1, y: -3 },
    { x: +1, y: -3 },
  ],
  [
    //right
    { x: +0, y: +0 },
    { x: +0, y: +1 },
    { x: -1, y: +1 },
    { x: -2, y: +1 },
    { x: +1, y: +1 },
    { x: +2, y: +1 },
    { x: +0, y: +2 },
    { x: +0, y: +3 },
    { x: -1, y: +3 },
    { x: +1, y: +3 },
  ],
];

const airplane1PossibleArea = [
  { xStart: 0, xEnd: -4, yStart: 2, yEnd: -3 }, //up
  { xStart: 3, xEnd: -1, yStart: 2, yEnd: -3 }, //down
  { xStart: 2, xEnd: -3, yStart: 0, yEnd: -4 }, //left
  { xStart: 2, xEnd: -3, yStart: 3, yEnd: -1 }, //right
];
