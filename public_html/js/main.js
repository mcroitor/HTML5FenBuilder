let canvas;
let context;
let fieldSize = 26;
let boardMargin = 0;
let boardSize = fieldSize * 10 + boardMargin * 2;
let font = fonts[0];
let fen = "8/8/8/8/8/8/8/8";
let lines = chars[font].empty;
let charTool = [
    ["k", "q", "r", "b", "n", "p", " "],
    ["l", "w", "t", "v", "m", "o", " "]
];
let actionPanel;
let selected = null;

let board = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
];

function init() {
    generateImage();
    initActionPanel();

}

function initActionPanel() {
    actionPanel = _id("actionPanel");
    actionPanel.setAttribute("width", 30 * 7 + 2);
    actionPanel.setAttribute("height", 30 * 2 + 2);
    cd = actionPanel.getContext("2d");
    cd.fillStyle = "#000000";
    cd.fillRect(0, 0, 30 * 7 + 2, 30 * 2 + 2);
    cd.fillStyle = "#ffffff";
    cd.fillRect(1, 1, 30 * 7, 30 * 2);
    cd.fillStyle = "#000000";
    cd.font = "30px " + fonts[0];
    cd.fillText(charTool[0].join(""), 1, 31, 30 * 7);
    cd.fillText(charTool[1].join(""), 1, 61, 30 * 7);
}

function generateImage() {
    lines = board2Lines(font);

    canvas = document.getElementById("brdCanvas");
    canvas.setAttribute("width", boardSize.toString());
    canvas.setAttribute("height", boardSize.toString());
    context = canvas.getContext("2d");
    context.fillStyle = "#000000";

    context.font = fieldSize.toString() + "px " + font;
    for (i = 0; i !== 10; ++i) {
        context.fillText(lines[i],
                boardMargin,
                (i + 1) * fieldSize + boardMargin,
                10 * fieldSize);
    }

    document.getElementById("previewImage").src = canvas.toDataURL();
    canvas.addEventListener("click", mouseClick, false);
}

function mouseClick(event) {
    let x = Math.floor((event.pageX - canvas.offsetLeft) / fieldSize);
    let y = Math.floor((event.pageY - canvas.offsetTop) / fieldSize);

    if (selected !== null && y > 0 && x > 0 && y < 10 && x < 10) {
        board[y - 1][x - 1] = selected;
        updateFen();
        setBoard();
    }

}

function changeFont() {
    font = fonts[document.getElementById("font").value];
    generateImage();
}
function changeSize() {
    fieldSize = document.getElementById("fieldSize").value;
    boardSize = fieldSize * 10 + boardMargin * 2;
    generateImage();
}
function setBoard() {
    fen = document.getElementById("fen").value;
    let l = fen.split(" ")[0].split("/");
    let k;

    for (let i = 0; i < 8; ++i) {
        k = 0;

        array.forEach(field => {
            if (isDigit(field)) {
                k += parseInt(field);
            }
            else {
                board[i][k] = field;
                k++;
            }
        });
    }

    generateImage();
}

function selectAction(event, object) {
    let x = event.pageX - object.offsetLeft;
    let y = event.pageY - object.offsetTop;

    let i = Math.floor(x / 30);
    let j = Math.floor(y / 30);
    selected = (j === 1) ? charTool[0][i] : charTool[0][i].toUpperCase();


    initActionPanel();
    cd.fillStyle = "#ff0000";
    cd.fillText(charTool[0][i].toUpperCase(), 1 + 30 * i, 31 + 30 * j, 30);
    cd.fillStyle = "#000000";
}

function updateFen() {
    let _lines = ["", "", "", "", "", "", "", ""];
    let count;
    for (i = 0; i < 8; ++i)
    {
        count = 0;
        for (j = 0; j < 8; ++j)
        {
            if (board[i][j] === ' ' )
            {
                count++;
            }
            else
            {
                if (count > 0)
                {
                    _lines[i] += count;
                    count = 0;
                }
                _lines[i] += board[i][j];
            }
        }
        if (count > 0)
            _lines[i] += count;
    }
    fen = _lines.join("/");
    _id("fen").value = fen;
}

function board2Lines(font) {
    let result = chars[font].empty;
    for (let j = 0; j < 8; ++j) {
        for (let i = 0; i < 8; ++i) {
            if (board[j][i] !== ' ') {
                let code = board[j][i] + (i + j+1) % 2;
                result[j + 1] = result[j + 1].substr(0, i + 1) + chars[font][code] + result[j + 1].substr(i + 2, 10);
            }
            else{
                let code = ((i + j) % 2)? "light" : "dark";
                result[j + 1] = result[j + 1].substr(0, i + 1) + chars[font][code] + result[j + 1].substr(i + 2, 10);
            }
        }
    }

    return result;
}