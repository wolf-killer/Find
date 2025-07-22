const up = 0;
const down = 1;
const left = 2;
const right = 3;

const planeHead = -1;
const planeBody = 1;
const emptyCell = 0;

const defaultCell = {
  cellDefinition: emptyCell,
  planeId: null,
  graphicModel: null,
  visited: false,
};

var sampleAirport;
var sampleAirportLength = 5;

var instructionAirport;
var instructionAirportLength = 10;
var noOfInstructionAirplane = 3;
var instructionAirplaneLocation = [
  { xStart: 0, yStart: 7, direction: 0, graphicModel: 1 },
  { xStart: 4, yStart: 0, direction: 3, graphicModel: 0 },
  { xStart: 9, yStart: 6, direction: 2, graphicModel: 0 },
];

var airport;
var airportLength = 10;
var maxGraphic = DECIMALADJUST("floor", airportLength / 3, 0);
var noOfGraphic = [1, 0, 0, 0, 1, 1];
var totalNoOfGraphic = noOfGraphic.reduce((partialSum, a) => partialSum + a, 0);

var gameStepCount = 0;
var gameRemainHead = totalNoOfGraphic;
var gameGraphic = [];
var showAirplaneInDiffColor = true;

const screenInstruction = [
  {
    id: 0,
    text: "",
    img: "",
  },
  {
    id: 1,
    text:
      "<i class='bi bi-airplane-fill'></i> 查看遊戲說明<br />" +
      "<i class='bi bi-three-dots-vertical'></i> 展開遊戲選單<br />" +
      "<i class='bi bi-three-dots'></i> 折疊遊戲選單",
    img: "./image/ScreenTop.png",
  },
  {
    id: 2,
    text:
      "<i class='bi bi-pencil-square'></i> 更改遊戲設定<br />" +
      "<i class='bi bi-clipboard2-data'></i> 公佈遊戲結果<br />" +
      "<i class='bi bi-recycle'></i> 重新開始遊戲<br />",
    img: "./image/ScreenMenu.png",
  },
  {
    id: 3,
    text:
      "<i class='bi bi-1-square'></i>  選擇遊戲途中是否<br/>以不同顏色顯示圖案<br />" +
      "<img id='airplaneSameColorPng' src='./image/AirplaneSameColor.png' alt='airplaneSameColorPng' width='" +
      setScreenWidth * 0.1 +
      "'>或" +
      "<img id='airplaneDiffColorPng' src='./image/AirplaneDiffColor.png' alt='airplaneDiffColorPng' width='" +
      setScreenWidth * 0.1 +
      "'><br />" +
      "<i class='bi bi-2-square'></i> 選擇圖案及其數量<br />" +
      "<i class='bi bi-3-square'></i> 設定遊戲棋盤大小<br />",
    img: "./image/ScreenSetting.png",
  },
];

const airplaneDesc = [
  "飛機一",
  "飛機二",
  "飛機三",
  "風車",
  "愛心",
  // "音符",
  "大頭恐龍",
];

const airplane = [
  [
    // graphic 1
    [
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
    [
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
  ],
  [
    // graphic 2
    [
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
    ],
    [
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
  ],
  [
    // graphic 3
    [
      { x: +0, y: +0 },
      { x: +1, y: +0 },
      { x: +2, y: +2 },
      { x: +2, y: +1 },
      { x: +2, y: +0 },
      { x: +2, y: -1 },
      { x: +2, y: -2 },
      { x: +3, y: +0 },
      { x: +4, y: +1 },
      { x: +4, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: +0, y: +1 },
      { x: +2, y: +2 },
      { x: +1, y: +2 },
      { x: +0, y: +2 },
      { x: -1, y: +2 },
      { x: -2, y: +2 },
      { x: +0, y: +3 },
      { x: +1, y: +4 },
      { x: -1, y: +4 },
    ],
    [
      { x: +0, y: +0 },
      { x: -1, y: +0 },
      { x: -2, y: +2 },
      { x: -2, y: +1 },
      { x: -2, y: +0 },
      { x: -2, y: -1 },
      { x: -2, y: -2 },
      { x: -3, y: +0 },
      { x: -4, y: +1 },
      { x: -4, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: +0, y: -1 },
      { x: +2, y: -2 },
      { x: +1, y: -2 },
      { x: +0, y: -2 },
      { x: -1, y: -2 },
      { x: -2, y: -2 },
      { x: +0, y: -3 },
      { x: +1, y: -4 },
      { x: -1, y: -4 },
    ],
  ],
  [
    // graphic 4
    [
      { x: +0, y: +0 },
      { x: -1, y: -1 },
      { x: -1, y: -2 },
      { x: -1, y: +1 },
      { x: -2, y: +1 },
      { x: +1, y: -1 },
      { x: +1, y: +1 },
      { x: +1, y: +2 },
      { x: +2, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: -1, y: -1 },
      { x: -1, y: -2 },
      { x: -1, y: +1 },
      { x: -2, y: +1 },
      { x: +1, y: -1 },
      { x: +1, y: +1 },
      { x: +1, y: +2 },
      { x: +2, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: -1, y: -1 },
      { x: -1, y: -2 },
      { x: -1, y: +1 },
      { x: -2, y: +1 },
      { x: +1, y: -1 },
      { x: +1, y: +1 },
      { x: +1, y: +2 },
      { x: +2, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: -1, y: -1 },
      { x: -1, y: -2 },
      { x: -1, y: +1 },
      { x: -2, y: +1 },
      { x: +1, y: -1 },
      { x: +1, y: +1 },
      { x: +1, y: +2 },
      { x: +2, y: -1 },
    ],
  ],
  [
    // graphic 5
    [
      { x: +0, y: +0 },
      { x: -1, y: +1 },
      { x: -1, y: -1 },
      { x: -1, y: +0 },
      { x: -2, y: +2 },
      { x: -2, y: +1 },
      { x: -2, y: +0 },
      { x: -2, y: -1 },
      { x: -2, y: -2 },
      { x: -3, y: +2 },
      { x: -3, y: +1 },
      { x: -3, y: +0 },
      { x: -3, y: -1 },
      { x: -3, y: -2 },
      { x: -4, y: +1 },
      { x: -4, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: +0, y: -1 },
      { x: +1, y: -1 },
      { x: -1, y: -1 },
      { x: +2, y: -2 },
      { x: +1, y: -2 },
      { x: +0, y: -2 },
      { x: -1, y: -2 },
      { x: -2, y: -2 },
      { x: +2, y: -3 },
      { x: +1, y: -3 },
      { x: +0, y: -3 },
      { x: -1, y: -3 },
      { x: -2, y: -3 },
      { x: +1, y: -4 },
      { x: -1, y: -4 },
    ],
    [
      { x: +0, y: +0 },
      { x: +1, y: +1 },
      { x: +1, y: -1 },
      { x: +1, y: +0 },
      { x: +2, y: +2 },
      { x: +2, y: +1 },
      { x: +2, y: +0 },
      { x: +2, y: -1 },
      { x: +2, y: -2 },
      { x: +3, y: +2 },
      { x: +3, y: +1 },
      { x: +3, y: +0 },
      { x: +3, y: -1 },
      { x: +3, y: -2 },
      { x: +4, y: +1 },
      { x: +4, y: -1 },
    ],
    [
      { x: +0, y: +0 },
      { x: +0, y: +1 },
      { x: +1, y: +1 },
      { x: -1, y: +1 },
      { x: +2, y: +2 },
      { x: +1, y: +2 },
      { x: +0, y: +2 },
      { x: -1, y: +2 },
      { x: -2, y: +2 },
      { x: +2, y: +3 },
      { x: +1, y: +3 },
      { x: +0, y: +3 },
      { x: -1, y: +3 },
      { x: -2, y: +3 },
      { x: +1, y: +4 },
      { x: -1, y: +4 },
    ],
  ],
  // [
  //   // graphic 6 //佔地面積太大 [已停用]
  //   [
  //     { x: +0, y: +0 },
  //     { x: +0, y: +1 },
  //     { x: +0, y: +2 },
  //     { x: +0, y: +3 },
  //     { x: +1, y: +0 },
  //     { x: +1, y: +3 },
  //     { x: +2, y: +0 },
  //     { x: +2, y: +1 },
  //     { x: +2, y: +3 },
  //     { x: +3, y: +0 },
  //     { x: +3, y: +1 },
  //     { x: +3, y: +3 },
  //     { x: +3, y: +4 },
  //     { x: +4, y: +3 },
  //     { x: +4, y: +4 },
  //   ],
  //   [
  //     { x: +0, y: +0 },
  //     { x: -0, y: -1 },
  //     { x: -0, y: -2 },
  //     { x: -0, y: -3 },
  //     { x: -1, y: +0 },
  //     { x: -1, y: -3 },
  //     { x: -2, y: +0 },
  //     { x: -2, y: -1 },
  //     { x: -2, y: -3 },
  //     { x: -3, y: +0 },
  //     { x: -3, y: -1 },
  //     { x: -3, y: -3 },
  //     { x: -3, y: -4 },
  //     { x: -4, y: -3 },
  //     { x: -4, y: -4 },
  //   ],
  //   [
  //     { x: +0, y: +0 },
  //     { x: +1, y: +0 },
  //     { x: +2, y: +0 },
  //     { x: +3, y: +0 },
  //     { x: +0, y: -1 },
  //     { x: +3, y: -1 },
  //     { x: +0, y: -2 },
  //     { x: +1, y: -2 },
  //     { x: +3, y: -2 },
  //     { x: +0, y: -3 },
  //     { x: +1, y: -3 },
  //     { x: +3, y: -3 },
  //     { x: +4, y: -3 },
  //     { x: +3, y: -4 },
  //     { x: +4, y: -4 },
  //   ],
  //   [
  //     { x: +0, y: +0 },
  //     { x: -1, y: +0 },
  //     { x: -2, y: +0 },
  //     { x: -3, y: +0 },
  //     { x: +0, y: +1 },
  //     { x: -3, y: +1 },
  //     { x: +0, y: +2 },
  //     { x: -1, y: +2 },
  //     { x: -3, y: +2 },
  //     { x: +0, y: +3 },
  //     { x: -1, y: +3 },
  //     { x: -3, y: +3 },
  //     { x: -4, y: +3 },
  //     { x: -3, y: +4 },
  //     { x: -4, y: +4 },
  //   ],
  // ],
  [
    // graphic 7
    [
      { x: +0, y: +0 },
      { x: +1, y: +0 },
      { x: +0, y: +1 },
      { x: +1, y: +1 },
      { x: +0, y: +2 },
      { x: +1, y: +2 },
      { x: +2, y: +2 },
      { x: +3, y: +2 },
      { x: +4, y: +2 },
      { x: +3, y: +3 },
      { x: +3, y: +4 },
      { x: +4, y: +4 },
    ],
    [
      { x: +0, y: +0 },
      { x: -1, y: +0 },
      { x: -2, y: +0 },
      { x: +0, y: +1 },
      { x: -1, y: +1 },
      { x: -2, y: +1 },
      { x: -2, y: +2 },
      { x: -2, y: +3 },
      { x: -3, y: +3 },
      { x: -4, y: +3 },
      { x: -2, y: +4 },
      { x: -4, y: +4 },
    ],
    [
      { x: +0, y: +0 },
      { x: +0, y: -1 },
      { x: +0, y: -2 },
      { x: -1, y: +0 },
      { x: -1, y: -1 },
      { x: -1, y: -2 },
      { x: -2, y: -2 },
      { x: -3, y: -2 },
      { x: -3, y: -3 },
      { x: -3, y: -4 },
      { x: -4, y: -2 },
      { x: -4, y: -4 },
    ],
    [
      { x: +0, y: +0 },
      { x: +0, y: -1 },
      { x: +1, y: +0 },
      { x: +1, y: -1 },
      { x: +2, y: +0 },
      { x: +2, y: -1 },
      { x: +2, y: -2 },
      { x: +2, y: -3 },
      { x: +2, y: -4 },
      { x: +3, y: -3 },
      { x: +4, y: -3 },
      { x: +4, y: -4 },
    ],
  ],
];

const airplanePossibleArea = [
  [
    // graphic 1
    { xStart: 0, xEnd: -4, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 3, yEnd: -1 },
    { xStart: 3, xEnd: -1, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 0, yEnd: -4 },
  ],
  [
    // graphic 2
    { xStart: 0, xEnd: -5, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 4, yEnd: -1 },
    { xStart: 4, xEnd: -1, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 0, yEnd: -5 },
  ],
  [
    // graphic 3
    { xStart: 0, xEnd: -5, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 4, yEnd: -1 },
    { xStart: 4, xEnd: -1, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 0, yEnd: -5 },
  ],
  [
    // graphic 4
    { xStart: 2, xEnd: -3, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 2, yEnd: -3 },
  ],
  [
    // graphic 5
    { xStart: 4, xEnd: -1, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 0, yEnd: -5 },
    { xStart: 0, xEnd: -5, yStart: 2, yEnd: -3 },
    { xStart: 2, xEnd: -3, yStart: 4, yEnd: -1 },
  ],
  // [
  //   // graphic 6 佔地面積太大 [已停用]
  //   { xStart: 0, xEnd: -5, yStart: 4, yEnd: -1 },
  //   { xStart: 4, xEnd: -1, yStart: 0, yEnd: -5 },
  //   { xStart: 0, xEnd: -5, yStart: 0, yEnd: -5 },
  //   { xStart: 4, xEnd: -1, yStart: 4, yEnd: -1 },
  // ],
  [
    // graphic 7
    { xStart: 0, xEnd: -5, yStart: 4, yEnd: -1 },
    { xStart: 4, xEnd: -1, yStart: 4, yEnd: -1 },
    { xStart: 4, xEnd: -1, yStart: 0, yEnd: -5 },
    { xStart: 0, xEnd: -5, yStart: 0, yEnd: -5 },
  ],
];
