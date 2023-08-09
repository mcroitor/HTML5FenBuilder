
class ChessDiagram {
    constructor(config) {
        this.board = new ChessBoard();

        this.config = {
            "fieldSize": config.fieldSize || this.DEFAULT_FIELD_SIZE,
            "marginSize": config.marginSize || 0,
            "fontName": config.fontName || this.DEFAULT_FONT_NAME
        };

        this.view = document.createElement("canvas");
        this.updateView();
    }

    get size() { return this.config.fieldSize * 10 + this.config.marginSize * 2; }
    get fen() { return this.board.fen; }

    static get DEFAULT_FIELD_SIZE() { return 26; }
    static get DEFAULT_FONT_NAME() { return Object.keys(FONTS)[0]; }

    setFen(fen) {
        this.board.setFen(fen);
    }

    updateView() {
        const lines = this.board.toLines(this.config.fontName);

        this.view.setAttribute("width", this.size.toString());
        this.view.setAttribute("height", this.size.toString());

        const context = this.view.getContext("2d");
        context.fillStyle = "#000000";

        const fontName = FONTS[this.config.fontName].fontName;
        context.font = this.config.fieldSize.toString() + "px " + fontName;
        for (let i = 0; i < 10; ++i) {
            context.fillText(lines[i],
                this.config.marginSize,
                (i + 1) * this.config.fieldSize + this.config.marginSize,
                10 * this.config.fieldSize);
        }
    }
}