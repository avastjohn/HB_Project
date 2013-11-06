window.onload = function() {

    var myCanvas = document.getElementById('myCanvas');
    var context = myCanvas.getContext("2d");

    var UNIT_SIZE = 100;

    var backMap = "GGGp GGpp GppG ppGG"
    var foreMap = "nnnt nnnn nnnn annn"

    var tiles = {
        "G": "#197c57",
        "p": "#96b124",
        "a": "http://i278.photobucket.com/albums/kk90/thrila_from_manila/tiny%20graphics/bth_56916f0f.gif",
        "t": "http://a0.twimg.com/profile_images/2187028467/tiny_star_normal.png"
    }

    var mkSquare = function(x, y, color) {
        context.beginPath();
        context.rect((x*UNIT_SIZE+30), (y*UNIT_SIZE+30), UNIT_SIZE, UNIT_SIZE);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#d35577";
        context.stroke();
    }

    var placeGraphic = function(x, y, imgsrc) {
        var graphic = new Image();
        graphic.onload = function() {
            context.drawImage(graphic, (x*UNIT_SIZE+30), (y*UNIT_SIZE+30));
        };
        graphic.src = imgsrc;
    }

    var parseMap = function(string) {
        var rows = string.split(" ");
        var parsedRows = [];
        for (var i=0; i < rows.length; i++) {
            var letters = rows[i].split("");
            parsedRows.push(letters);
        }
        return parsedRows;
    }

    var drawBack = function(mapString) {
        var parsedMap = parseMap(mapString);
        for (var i=0; i < parsedMap.length; i++) {
            for (var j=0; j < parsedMap[i].length; j++) {
                var color = parsedMap[i][j];
                mkSquare(j, i, tiles[color]);
            }
        }
    }

    var drawFront = function(mapString) {
        var parsedMap = parseMap(mapString);
        for (var i=0; i < parsedMap.length; i++) {
            for (var j=0; j < parsedMap[i].length; j++) {
                if (parsedMap[i][j] == "a" || parsedMap[i][j] == "t") {
                    placeGraphic(j, i, tiles[parsedMap[i][j]]);
                }
            }
        }
    }

    var backTester = drawBack(backMap);
    var foreTester = drawFront(foreMap);

}
