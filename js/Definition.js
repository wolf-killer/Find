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
  { xStart: 0, yStart: 7, direction: 0, graphicId: 1 },
  { xStart: 4, yStart: 0, direction: 2, graphicId: 0 },
  { xStart: 9, yStart: 6, direction: 1, graphicId: 0 }
]

var airport;
var airportLength = 10;
var noOfPlaneHead = 2;
var selectedGraphic;

var gameStepCount = 0;
var gameRemainHead = noOfPlaneHead;

/* 
 Instruction
*/

const screenInstruction = [
  {
    id: 0,
    text: "",
    img: ""
    },
  {
    id: 1,
    text: "<i class='bi bi-airplane-fill'></i> 查看遊戲說明</br>" +
      "<i class='bi bi-three-dots-vertical'></i> 展開遊戲選單</br>" +
      "<i class='bi bi-three-dots'></i> 折疊遊戲選單",
    img: "./image/ScreenTop.png"
    },
  {
    id: 2,
    text: "<i class='bi bi-pencil-square'></i> 更改遊戲設定</br>" +
      "<i class='bi bi-clipboard2-data'></i> 公佈遊戲結果</br>" +
      "<i class='bi bi-recycle'></i> 重新開始遊戲</br>",
    img: "./image/ScreenMenu.png"
    },
  {
    id: 3,
    text: "<i class='bi bi-1-square'></i> 選擇飛機模型</br>" +
      "<i class='bi bi-2-square'></i> 設定棋盤大小</br>" +
      "<i class='bi bi-3-square'></i> 設定模型數量</br>",
    img: "./image/ScreenSetting.png"
    }
  ]

const airplane = 
[
	[ // graphic 1
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
		]
	],
	[ // graphic 2
		[
			//up
				{ x: +0, y: +0 },
				{ x: +1, y: +1 },
				{ x: +1, y: +0 },
				{ x: +1, y: -1 },
				{ x: +2, y: +2 },
				{ x: +2, y: +0 },
				{ x: +2, y: -2 },
				{ x: +3, y: +0 },
				{ x: +4, y: +1 },
				{ x: +4, y: +0 },
				{ x: +4, y: -1 },
		],
		[
			//down
				{ x: +0, y: +0 },
				{ x: -1, y: +1 },
				{ x: -1, y: +0 },
				{ x: -1, y: -1 },
				{ x: -2, y: +2 },
				{ x: -2, y: +0 },
				{ x: -2, y: -2 },
				{ x: -3, y: +0 },
				{ x: -4, y: +1 },
				{ x: -4, y: +0 },
				{ x: -4, y: -1 },
		],
		[
			//left
				{ x: +0, y: +0 },
				{ x: +1, y: -1 },
				{ x: +0, y: -1 },
				{ x: -1, y: -1 },
				{ x: +2, y: -2 },
				{ x: +0, y: -2 },
				{ x: -2, y: -2 },
				{ x: +0, y: -3 },
				{ x: +1, y: -4 },
				{ x: +0, y: -4 },
				{ x: -1, y: -4 },
		],
		[
			//right
				{ x: +0, y: +0 },
				{ x: +1, y: +1 },
				{ x: +0, y: +1 },
				{ x: -1, y: +1 },
				{ x: +2, y: +2 },
				{ x: +0, y: +2 },
				{ x: -2, y: +2 },
				{ x: +0, y: +3 },
				{ x: +1, y: +4 },
				{ x: +0, y: +4 },
				{ x: -1, y: +4 },
		]
	]
];

const airplanePossibleArea = [
  [ // graphic 1
    { xStart: 0, xEnd: -4, yStart: 2, yEnd: -3 }, //up
    { xStart: 3, xEnd: -1, yStart: 2, yEnd: -3 }, //down
    { xStart: 2, xEnd: -3, yStart: 0, yEnd: -4 }, //left
    { xStart: 2, xEnd: -3, yStart: 3, yEnd: -1 } //right
  ],
  [ // graphic 2
    { xStart: 0, xEnd: -5, yStart: 2, yEnd: -3 }, //up
    { xStart: 4, xEnd: -1, yStart: 2, yEnd: -3 }, //down
    { xStart: 2, xEnd: -3, yStart: 0, yEnd: -5 }, //left
    { xStart: 2, xEnd: -3, yStart: 4, yEnd: -1 } //right
  ]
];
