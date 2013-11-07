window.onload = function() {

    var myCanvas = document.getElementById('myCanvas');
    var context = myCanvas.getContext("2d");

    var UNIT_SIZE = 100;

        // level one
    var backMap = "GGG ppp GGG"
    var foreMap = "nnn dnb nnn"
        // level two
    // var backMap = "GGGG GppG ppGG GGGG"
    // var foreMap = "nnnn nnbn dnnn nnnn"
        // level three
    // var backMap = "GGGp GGpp GppG ppGG"
    // var foreMap = "nnnb nnnn nnnn dnnn"

// split this dictionary into two and choose image according to pettype
    var tiles = {
        "G": "#197c57",
        "p": "#96b124",
        "a": "http://i.imgur.com/3i4vM4S.png",
        "t": "http://i.imgur.com/F1n6SZW.png",
        "d": "http://i.imgur.com/sPvA7yE.png",
        "b": "http://i.imgur.com/nczpv7L.png"
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

    var placeGraphic = function(x, y, imgsrc, tall) {
        var graphic = new Image();
        if (tall == true) {
            graphic.onload = function() {
                context.drawImage(graphic, (x*UNIT_SIZE+30), (y*UNIT_SIZE));
            };
        } else {
            graphic.onload = function() {
                context.drawImage(graphic, (x*UNIT_SIZE+30), (y*UNIT_SIZE+30));
            };
        }
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
                if (parsedMap[i][j] == "d") {
                    placeGraphic(j, i, tiles[parsedMap[i][j]], true);
                } else if (parsedMap[i][j] == "b") {
                    placeGraphic(j, i, tiles[parsedMap[i][j]], false);
                }
            }
        }
    }

    var backTester = drawBack(backMap);
    var foreTester = drawFront(foreMap);

}
