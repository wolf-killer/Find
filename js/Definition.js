const up = 0;
const down = 1;
const left = 2;
const right = 3;
 
const planeHead = 2;
const planeBody = 1; 
const emptyCell = 0;
 
const defaultCell = {
cellDefinition: emptyCell,
visited: false
};
 
var airport;
var airportLength = 10;
var noOfPlaneHead = 2;
 
const airplane1 = [
[ //up
{x:+0, y:+0},
{x:+1, y:+2},
{x:+1, y:+1},
{x:+1, y:+0},
{x:+1, y:-1},
{x:+1, y:-2},
{x:+2, y:+0},
{x:+3, y:+1},
{x:+3, y:+0},
{x:+3, y:-1}
],
[ //down
{x:+0, y:+0},
{x:-1, y:+2},
{x:-1, y:+1},
{x:-1, y:+0},
{x:-1, y:-1},
{x:-1, y:-2},
{x:-2, y:+0},
{x:-3, y:+1},
{x:-3, y:+0},
{x:-3, y:-1}
],
[ //left
{x:+0, y:+0},
{x:+0, y:-1},
{x:-1, y:-1},
{x:-2, y:-1},
{x:+1, y:-1},
{x:+2, y:-1},
{x:+0, y:-2},
{x:+0, y:-3},
{x:-1, y:-3},
{x:+1, y:-3}
],
[ //right
{x:+0, y:+0},
{x:+0, y:+1},
{x:-1, y:+1},
{x:-2, y:+1},
{x:+1, y:+1},
{x:+2, y:+1},
{x:+0, y:+2},
{x:+0, y:+3},
{x:-1, y:+3},
{x:+1, y:+3}
]
]
 
const airplane1PossibleArea = [
{xStart: 0, xEnd: -4, yStart: 2, yEnd: -3}, //up
{xStart: 3, xEnd: -1, yStart: 2, yEnd: -3}, //down
{xStart: 2, xEnd: -3, yStart: 0, yEnd: -4}, //left
{xStart: 2, xEnd: -3, yStart: 3, yEnd: -1} //right
]
