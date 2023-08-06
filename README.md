# HTML5 Fen Builder

Sample project for creating chess diagrams using Javascript.

Usage example:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>sample</title>
        <link rel="stylesheet" href="styles/main.css">
        <script src="js/Fonts.js"></script>
        <script src="js/ChessBoard.js"></script>
        <script src="js/DiagramBuilder.js"></script>
    </head>
    <body>
        <div id="container"></div>
    </body>
    <script>
        let builder = new DiagramBuilder("container");
    </script>
</html>
```