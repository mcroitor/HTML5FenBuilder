class ChessBoard {
    constructor() {
        this.board = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ];
        this.fen = "8/8/8/8/8/8/8/8";
    }

    setFen(fen) {
        this.fen = fen;
        let line = fen.split(" ")[0].split("/");
        let k;

        for (let i = 0; i < 8; ++i) {
            k = 0;

            for (const field of line[i]) {
                if (isDigit(field)) {
                    k += parseInt(field);
                }
                else {
                    this.board[i][k] = field;
                    k++;
                }
            };
        }
    }

    updateFen() {
        let _lines = ["", "", "", "", "", "", "", ""];
        let count;
        for (let i = 0; i < 8; ++i) {
            count = 0;
            for (let j = 0; j < 8; ++j) {
                if (this.board[i][j] === ' ') {
                    count++;
                }
                else {
                    if (count > 0) {
                        _lines[i] += count;
                        count = 0;
                    }
                    _lines[i] += this.board[i][j];
                }
            }
            if (count > 0)
                _lines[i] += count;
        }
        this.fen = _lines.join("/");
        return this.fen;
    }

    toLines(font) {
        let result = FONTS[font].empty;
        for (let j = 0; j < 8; ++j) {
            for (let i = 0; i < 8; ++i) {
                if (this.board[j][i] !== ' ') {
                    let code = this.board[j][i] + (i + j + 1) % 2;
                    result[j + 1] = result[j + 1].substr(0, i + 1) +
                        FONTS[font][code] + result[j + 1].substr(i + 2, 10);
                }
                else {
                    let code = ((i + j) % 2) ? "light" : "dark";
                    result[j + 1] = result[j + 1].substr(0, i + 1) +
                        FONTS[font][code] + result[j + 1].substr(i + 2, 10);
                }
            }
        }

        return result;
    }

    setPiece(column, row, piece) {
        this.board[row][column] = piece;
        this.updateFen();
    }
}
