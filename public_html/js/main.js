var canvas;
var context;
var fieldSize = 26;
var boardMargin = 0;
var boardSize = fieldSize * 10 + boardMargin * 2;
var font = fonts[4];
var fen = "8/8/8/8/8/8/8/8";
var lines = chars[font].empty;

function generateImage() {
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
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    _debug("( " + x + ", " + y + ")");
}

function changeFont() {
    font = fonts[document.getElementById("font").value];
    lines = chars[font].empty;
    setBoard();
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
    lines = chars[font].empty;
    var light = chars[font].light;
    var dark = chars[font].dark;

    var pos = [
        [light, dark, light, dark, light, dark, light, dark],
        [dark, light, dark, light, dark, light, dark, light],
        [light, dark, light, dark, light, dark, light, dark],
        [dark, light, dark, light, dark, light, dark, light],
        [light, dark, light, dark, light, dark, light, dark],
        [dark, light, dark, light, dark, light, dark, light],
        [light, dark, light, dark, light, dark, light, dark],
        [dark, light, dark, light, dark, light, dark, light]
    ];
    var k;

    for (i = 0; i < 8; ++i) {
        k = 0;
        for (j = 0; j < l[i].length; ++j) {
            if (isDigit(l[i][j])) {
                k += parseInt(l[i][j]);
            }
            else {
                var tmp = l[i][j].toString() + (i + k) % 2;
                pos[i][k] = chars[font][tmp];
                k++;
            }
        }
    }

    for (i = 0; i < 8; ++i) {
        lines[i + 1] = lines[i + 1].replace(lines[i + 1].substr(1, 8), pos[i].join(""));
    }

    generateImage();
}


