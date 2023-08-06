class DiagramBuilder {
    constructor(elementId) {
        // attached to element
        this.container = document.getElementById(elementId);
        this.container.className = "diagram-builder-widget";
        
        // chess board
        this.board = new ChessBoard();
        
        // diagram
        this.diagram = new ChessDiagram({
            "fieldSize": ChessDiagram.DEFAULT_FIELD_SIZE,
            "marginSize": 0,
            "fontName": ChessDiagram.DEFAULT_FONT_NAME
        });

        // selected pieces
        this.selected = null;
        // allow preview
        this.preview = false;

        // panel elements
        this.toolbarPanel = null;
        this.actionPanel = null;
        this.previewPanel = null;

        this.html();
        this.updatePreview();
        
        this.actionPanel.addEventListener("click", this.actionPanelClick.bind(this));
        this.diagram.view.addEventListener("click", this.diagramClick.bind(this));
        
        document.getElementById("fontSelection").addEventListener("click", this.changeFont.bind(this));
        document.getElementById("fieldSize").addEventListener("click", this.changeSize.bind(this));

    }

    static get MIN_FIELD_SIZE() {
        return 20;
    }

    static get MAX_FIELD_SIZE() {
        return 50;
    }

    resetActionPanel() {
        const actionPanelContext = this.actionPanel.getContext("2d");
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

        const labelFontSelection = document.createElement("label");
        labelFontSelection.setAttribute("for", "fontSelection");
        labelFontSelection.appendChild(document.createTextNode("Font: "));
        const fontSelection = document.createElement("select");
        fontSelection.setAttribute("id", "fontSelection");
        Object.keys(FONTS).forEach((font) => {
            const option = document.createElement("option");
            option.setAttribute("value", font);
            option.appendChild(document.createTextNode(font));
            fontSelection.appendChild(option);
        });
        const fontContainer = document.createElement("div");
        fontContainer.className = "right";
        fontContainer.appendChild(labelFontSelection);
        fontContainer.appendChild(fontSelection);
        
        const labelFieldSizeSelection = document.createElement("label");
        labelFieldSizeSelection.setAttribute("for", "fieldSize");
        labelFieldSizeSelection.appendChild(document.createTextNode("Field Size: "));
        const fieldSizeSelection = document.createElement("input");
        fieldSizeSelection.setAttribute("id", "fieldSize");
        fieldSizeSelection.setAttribute("value", this.diagram.config.fieldSize);
        fieldSizeSelection.setAttribute("type", "number");
        fieldSizeSelection.setAttribute("min", DiagramBuilder.MIN_FIELD_SIZE);
        fieldSizeSelection.setAttribute("max", DiagramBuilder.MAX_FIELD_SIZE);
        const fieldSizeContainer = document.createElement("div");
        fieldSizeContainer.className = "right";
        fieldSizeContainer.appendChild(labelFieldSizeSelection);
        fieldSizeContainer.appendChild(fieldSizeSelection);

        this.toolbarPanel = document.createElement("div");
        this.toolbarPanel.setAttribute("id", "toolbar");
        this.toolbarPanel.setAttribute("class", "container");
        this.toolbarPanel.appendChild(fontContainer);
        this.toolbarPanel.appendChild(fieldSizeContainer);

        const ap = document.createElement("div");
        ap.setAttribute("class", "container");
        this.actionPanel = document.createElement("canvas");
        this.actionPanel.setAttribute("id", "actionPanel");
        this.actionPanel.setAttribute("width", 30 * 7 + 2);
        this.actionPanel.setAttribute("height", 30 * 2 + 2);
        this.resetActionPanel();
        ap.appendChild(this.actionPanel);

        if(this.preview) {
            this.previewPanel = document.createElement("div");
            this.previewPanel.setAttribute("id", "previewPanel");
            const previewImage = document.createElement("img");
            previewImage.setAttribute("src", "");
            previewImage.setAttribute("id", "previewImage");
            previewImage.setAttribute("alt", "preview");
            this.previewPanel.appendChild(previewImage);
        }
        
        this.container.appendChild(this.toolbarPanel);
        this.container.appendChild(ap);
        this.container.appendChild(this.diagram.view);
        if(this.preview) {
            this.container.appendChild(this.previewPanel);
        }
        this.container.style.width = this.diagram.size + 'px';
    }

    diagramClick(event) {
        const canvas = this.diagram.view;
        const offsetLeft = canvas.offsetLeft;
        const offsetTop = canvas.offsetTop;
        const x = Math.floor((event.pageX - offsetLeft) / this.diagram.config.fieldSize);
        const y = Math.floor((event.pageY - offsetTop) / this.diagram.config.fieldSize);

        if (this.selected !== null && y > 0 && x > 0 && y < 10 && x < 10) {
            this.diagram.board.setPiece(x - 1, y - 1, this.selected);
            this.diagram.updateView();
            this.updatePreview();
        }
    }

    actionPanelClick(event) {
        const x = event.pageX - this.actionPanel.offsetLeft;
        const y = event.pageY - this.actionPanel.offsetTop;

        const i = Math.floor(x / 30);
        const j = Math.floor(y / 30);
        this.selected = (j === 1) ? CHAR_TOOL[0][i] : CHAR_TOOL[0][i].toUpperCase();


        const actionPanelContext = this.resetActionPanel();
        actionPanelContext.fillStyle = "#ff0000";
        actionPanelContext.fillText(CHAR_TOOL[0][i].toUpperCase(), 1 + 30 * i, 31 + 30 * j, 30);
        actionPanelContext.fillStyle = "#000000";
    }

    changeFont() {
        this.diagram.config.fontName = document.getElementById("fontSelection").value;
        this.diagram.updateView();
        this.updatePreview();
    }
    
    changeSize() {
        this.diagram.config.fieldSize = document.getElementById("fieldSize").value;
        this.diagram.updateView();
        this.updatePreview();
    }

    updatePreview() {
        if(this.preview) {
            document.getElementById("previewImage").src = this.boardPanel.toDataURL();
        }
    }
    
}
