var canvas;
var context;
var fieldSize = 26;
var boardMargin = 0;
var boardSize = fieldSize * 10 + boardMargin * 2;
var font = fonts[0];
var fen = "8/8/8/8/8/8/8/8";
var lines = chars[font].empty;
var charTool = [
    ["k", "q", "r", "b", "n", "p"],
    ["l", "w", "t", "v", "m", "o"]
];
var actionPanel;
var selected = null;

var board = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
];

function init(){
    generateImage();
    initActionPanel();
    
}

function initActionPanel(){
    actionPanel = _id("actionPanel");
    actionPanel.setAttribute("width", 30*6+2);
    actionPanel.setAttribute("height", 30*2+2);
    cd = actionPanel.getContext("2d");
    cd.fillStyle = "#000000";
    cd.fillRect(0, 0, 30*6+2, 30*2+2);
    cd.fillStyle = "#ffffff";
    cd.fillRect(1, 1, 30*6, 30*2);
    cd.fillStyle = "#000000";
    cd.font = "30px " + fonts[0];
    cd.fillText(charTool[0].join(""), 1, 31, 30*6);
    cd.fillText(charTool[1].join(""), 1, 61, 30*6);
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
    var x = Math.floor((event.pageX - canvas.offsetLeft) / fieldSize);
    var y = Math.floor((event.pageY - canvas.offsetTop) / fieldSize);
    
    //lines[y] = lines[y].substr(0, x) + chars[font][selected+(x+y)%2] + lines[y].substr(x+1, 10);
    //_debug("selected: " + selected);
    board[y][x] = selected;
    updateFen();
    
    //_debug("board[ "+y+" ][ "+x+" ] = "+ board[y][x]);
    
    generateImage();
    //_debug(lines);
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
    var l = fen.split(" ")[0].split("/");
    var k;

    for (i = 0; i < 8; ++i) {
        k = 0;
        for (j = 0; j < l[i].length; ++j) {
            if (isDigit(l[i][j])) {
                k += parseInt(l[i][j]);
            }
            else {
                var tmp = l[i][j].toString() + (i + k) % 2;
                pos[i][k] = l[i][j];
                k++;
            }
        }
    }

    generateImage();
}

function selectAction(event, object){
    var x = event.pageX - object.offsetLeft;
    var y = event.pageY - object.offsetTop;
        
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    selected = (j == 1) ? charTool[0][i] : charTool[0][i].toUpperCase();
    
    
    initActionPanel();
    cd.fillStyle = "#ff0000";
    cd.fillText(selected, 1+30*i, 31+30*j, 30);
    cd.fillStyle = "#000000";
   _debug("selected: " + selected);
}

function updateFen(){
    var _lines = ["", "", "", "", "", "", "", ""];
    for(i = 0; i < 8; ++i)
    {
        count = 0;
        for(j = 0; j < 8; ++j)
        {
            if(board[i][j] == 0)
            {
                count++;
            }
            else
            {
                if(count > 0)
                {
                    _lines[i] += count;
                    count = 0;
                }
                _lines[i] += board[i][j];
            }
        }
        if(count > 0)
            _lines[i] += count;
    }
    fen = _lines.join("/");
    _id("fen").value = fen;
}

function board2Lines(font){
    var result = chars[font].empty;
    for(var j = 0; j != 8; ++j){
        for(var i = 0; i != 8; ++i){
            if(board[j][i] !== ' '){
                //result[i+1][j+1] = chars[font][board[i][j]];
                var code = board[j][i]+(i+j)%2;
                //_debug(code);
                result[j] = result[j].substr(0, i) + chars[font][code] + result[j].substr(i+1, 10);
            }
        }
    }

    return result;
}