window.onload = function() {

    var myCanvas = document.getElementById('myCanvas');
    var context = myCanvas.getContext("2d");

    var UNIT_SIZE = 100;

    var sampleMap = "GGGp GGpp GppG ppGG"

    var tiles = {
        "G": "#197c57",
        "p": "#96b124"
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

    var parseMap = function(string) {
        var rows = string.split(" ");
        var parsedRows = [];
        for (var i=0; i < rows.length; i++) {
            var letters = rows[i].split("");
            parsedRows.push(letters);
        }
        return parsedRows;
    }

    var drawMap = function(mapString) {
        var parsedMap = parseMap(mapString);
        for (var i=0; i < parsedMap.length; i++) {
            for (var j=0; j < parsedMap[i].length; j++) {
                var color = parsedMap[i][j];
                mkSquare(j, i, tiles[color]);
            }
        }
    }

    // var square1 = mkSquare(0, 0, "Gold");
    // var square2 = mkSquare(0, 1, "Blue");
    // var square3 = mkSquare(1, 0, "HotPink");
    // var square4 = mkSquare(2, 0, "Orange")

    // var tester = parseMap("I heart ponies");
    var tester = drawMap(sampleMap);

}
