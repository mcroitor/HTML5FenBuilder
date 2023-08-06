class DiagramBuilder {
    constructor(elementId) {
        // attached to element
        this.container = document.getElementById(elementId);
        
        // chess board
        this.board = new ChessBoard();
        
        // diagram configuration
        this.fieldSize = 26;
        this.font = Object.keys(FONTS)[0];
        this.boardMargin = 0;
        this.boardSize = this.fieldSize * 10 + this.boardMargin * 2;
        this.lines = FONTS[this.font].empty;
        this.container.className = "diagram-builder-widget";
        this.container.style.width = this.boardSize + 'px';

        // selected pieces
        this.selected = null;
        // allow preview
        this.preview = false;

        // panel elements
        this.toolbarPanel = null;
        this.actionPanel = null;
        this.boardPanel = null;
        this.previewPanel = null;

        this.html();
        this.actionPanel.addEventListener("click", this.actionPanelClick.bind(this));
        this.boardPanel.addEventListener("click", this.boardPanelClick.bind(this));

        document.getElementById("fontSelection").addEventListener("click", this.changeFont.bind(this));
        document.getElementById("fieldSize").addEventListener("click", this.changeSize.bind(this));
        this.generateImage();
        this.updatePreview();
    }

    static get MIN_FIELD_SIZE() {
        return 20;
    }

    static get MAX_FIELD_SIZE() {
        return 50;
    }

    resetActionPanel() {
        let actionPanelContext = this.actionPanel.getContext("2d");
        actionPanelContext.fillStyle = "#000000";
        actionPanelContext.fillRect(0, 0, 30 * 7 + 2, 30 * 2 + 2);
        actionPanelContext.fillStyle = "#ffffff";
        actionPanelContext.fillRect(1, 1, 30 * 7, 30 * 2);
        actionPanelContext.fillStyle = "#000000";
        actionPanelContext.font = "30px " + Object.keys(FONTS)[0];
        actionPanelContext.fillText(CHAR_TOOL[0].join(""), 1, 31, 30 * 7);
        actionPanelContext.fillText(CHAR_TOOL[1].join(""), 1, 61, 30 * 7);
        return actionPanelContext;
    }

    html() {

        let labelFontSelection = document.createElement("label");
        labelFontSelection.setAttribute("for", "fontSelection");
        labelFontSelection.appendChild(document.createTextNode("Font: "));
        let fontSelection = document.createElement("select");
        fontSelection.setAttribute("id", "fontSelection");
        Object.keys(FONTS).forEach((font) => {
            let option = document.createElement("option");
            option.setAttribute("value", font);
            option.appendChild(document.createTextNode(font));
            fontSelection.appendChild(option);
        });
        let fontContainer = document.createElement("div");
        fontContainer.className = "right";
        fontContainer.appendChild(labelFontSelection);
        fontContainer.appendChild(fontSelection);
        
        let labelFieldSizeSelection = document.createElement("label");
        labelFieldSizeSelection.setAttribute("for", "fieldSize");
        labelFieldSizeSelection.appendChild(document.createTextNode("Field Size: "));
        let fieldSizeSelection = document.createElement("input");
        fieldSizeSelection.setAttribute("id", "fieldSize");
        fieldSizeSelection.setAttribute("value", this.fieldSize);
        fieldSizeSelection.setAttribute("type", "number");
        fieldSizeSelection.setAttribute("min", DiagramBuilder.MIN_FIELD_SIZE);
        fieldSizeSelection.setAttribute("max", DiagramBuilder.MAX_FIELD_SIZE);
        let fieldSizeContainer = document.createElement("div");
        fieldSizeContainer.className = "right";
        fieldSizeContainer.appendChild(labelFieldSizeSelection);
        fieldSizeContainer.appendChild(fieldSizeSelection);

        this.toolbarPanel = document.createElement("div");
        this.toolbarPanel.setAttribute("id", "toolbar");
        this.toolbarPanel.setAttribute("class", "container");
        this.toolbarPanel.appendChild(fontContainer);
        this.toolbarPanel.appendChild(fieldSizeContainer);

        let ap = document.createElement("div");
        ap.setAttribute("class", "container");
        this.actionPanel = document.createElement("canvas");
        this.actionPanel.setAttribute("id", "actionPanel");
        this.actionPanel.setAttribute("width", 30 * 7 + 2);
        this.actionPanel.setAttribute("height", 30 * 2 + 2);
        this.resetActionPanel();
        ap.appendChild(this.actionPanel);

        this.boardPanel = document.createElement("canvas");
        this.boardPanel.setAttribute("id", "boardPanel");

        if(this.preview) {
            this.previewPanel = document.createElement("div");
            this.previewPanel.setAttribute("id", "previewPanel");
            let previewImage = document.createElement("img");
            previewImage.setAttribute("src", "");
            previewImage.setAttribute("id", "previewImage");
            previewImage.setAttribute("alt", "preview");
            this.previewPanel.appendChild(previewImage);
        }
        
        this.container.appendChild(this.toolbarPanel);
        this.container.appendChild(ap);
        this.container.appendChild(this.boardPanel);
        if(this.preview) {
            this.container.appendChild(this.previewPanel);
        }
    }

    generateImage() {
        const lines = this.board.toLines(this.font);

        // let canvas = document.getElementById("boardPanel");
        this.boardPanel.setAttribute("width", this.boardSize.toString());
        this.boardPanel.setAttribute("height", this.boardSize.toString());
        let context = this.boardPanel.getContext("2d");
        context.fillStyle = "#000000";

        context.font = this.fieldSize.toString() + "px " + this.font;
        for (let i = 0; i !== 10; ++i) {
            context.fillText(lines[i],
                this.boardMargin,
                (i + 1) * this.fieldSize + this.boardMargin,
                10 * this.fieldSize);
        }

        // document.getElementById("previewImage").src = canvas.toDataURL();
        // canvas.addEventListener("click", this.mouseClick, false);
    }

    boardPanelClick(event) {
        let canvas = this.boardPanel;
        let offsetLeft = canvas.offsetLeft;
        let offsetTop = canvas.offsetTop;
        const x = Math.floor((event.pageX - offsetLeft) / this.fieldSize);
        const y = Math.floor((event.pageY - offsetTop) / this.fieldSize);

        if (this.selected !== null && y > 0 && x > 0 && y < 10 && x < 10) {
            this.board.setPiece(x - 1, y - 1, this.selected);
            this.generateImage();
            this.updatePreview();
        }
    }

    actionPanelClick(event) {
        let x = event.pageX - this.actionPanel.offsetLeft;
        let y = event.pageY - this.actionPanel.offsetTop;

        let i = Math.floor(x / 30);
        let j = Math.floor(y / 30);
        this.selected = (j === 1) ? CHAR_TOOL[0][i] : CHAR_TOOL[0][i].toUpperCase();


        let actionPanelContext = this.resetActionPanel();
        actionPanelContext.fillStyle = "#ff0000";
        actionPanelContext.fillText(CHAR_TOOL[0][i].toUpperCase(), 1 + 30 * i, 31 + 30 * j, 30);
        actionPanelContext.fillStyle = "#000000";
    }

    changeFont() {
        this.font = document.getElementById("fontSelection").value;
        this.generateImage();
        this.updatePreview();
    }
    
    changeSize() {
        this.fieldSize = document.getElementById("fieldSize").value;
        this.boardSize = this.fieldSize * 10 + this.boardMargin * 2;
        this.generateImage();
        this.updatePreview();
    }

    updatePreview() {
        if(this.preview) {
            document.getElementById("previewImage").src = this.boardPanel.toDataURL();
        }
    }
    
}
