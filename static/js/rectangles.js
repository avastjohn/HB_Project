// length and width in pixels of the squares on the map
var UNIT_SIZE = 100;


// this data will eventually come from the database:
                    // level one
                var backMap1 = "GGG ppp GGG";
                var petStart1 = (0,1);
                var treatPos1 = (2,1);
                    // level two
                var backMap2 = "GGGG GppG ppGG GGGG";
                var petStart2 = (0,2);
                var treatPos2 = (2,1);
                    // level three
                var backMap3 = "GGGp GGpp GppG ppGG";
                var petStart3 = (0,3);
                var treatPos3 = (3,0);

var gameBoard = function(backMap) {
    this.backMap = backMap;

    this.myCanvas = document.getElementById('myCanvas');
    this.context = myCanvas.getContext("2d");

    this.tiles = {
        "G": "#197c57",
        "p": "#96b124",
    };

    this.parseMap = function() {
        // takes mapstring and parses into an array of arrays
        var rows = this.backMap.split(" ");
        var parsedRows = [];
        for (var i=0; i < rows.length; i++) {
            var letters = rows[i].split("");
            parsedRows.push(letters);
        }
        return parsedRows;
    };    

    this.mkSquare = function(x, y, color) {
        // draws a square at position specified and of specified color
        this.context.beginPath();
        this.context.rect((x*UNIT_SIZE+30), (y*UNIT_SIZE+30), UNIT_SIZE, UNIT_SIZE);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#d35577";
        this.context.stroke();
    };

    this.drawBoard = function() {
        // draws the game board according to the mapstring
        // using parseMap() and mkSquare()
        var parsedMap = this.parseMap();
        for (var i=0; i < parsedMap.length; i++) {
            for (var j=0; j < parsedMap[i].length; j++) {
                var color = parsedMap[i][j];
                this.mkSquare(j, i, this.tiles[color]);
            }
        }
    };

};

var pet = function(pettype, petname, gender) {
    this.pettype = pettype;
    this.petname = petname;
    this.gender = gender;

    var treats = {
        "dog": "bone",
        "bunny": "carrot"
    };

    var images = {
        "bunny": "http://i.imgur.com/3i4vM4S.png",
        "carrot": "http://i.imgur.com/F1n6SZW.png",
        "dog": "http://i.imgur.com/sPvA7yE.png",
        "bone": "http://i.imgur.com/nczpv7L.png"
    }

    var move = function(direction) {
        // change coordinates? or delete and redraw...
        return;
    };

    var sleep = function(delay) {
        // time delay keep bunny in same place
        return;
    };

    var eatTreat = function() {
        // make this function later. it will make stars 
        // appear or something when bunny reaches carrot.
        return;
    };
};


window.onload = function() {

    var currentBoard = new gameBoard(backMap3);
    currentBoard.drawBoard();

    

    

    // var placeGraphic = function(x, y, imgsrc, tall) {
    //     var graphic = new Image();
    //     if (tall == true) {
    //         graphic.onload = function() {
    //             context.drawImage(graphic, (x*UNIT_SIZE+30), (y*UNIT_SIZE));
    //         };
    //     } else {
    //         graphic.onload = function() {
    //             context.drawImage(graphic, (x*UNIT_SIZE+30), (y*UNIT_SIZE+30));
    //         };
    //     }
    //     graphic.src = imgsrc;
    // }





    // var drawFront = function(mapString) {
    //     var parsedMap = parseMap(mapString);
    //     for (var i=0; i < parsedMap.length; i++) {
    //         for (var j=0; j < parsedMap[i].length; j++) {
    //             if (parsedMap[i][j] == "a") {
    //                 placeGraphic(j, i, tiles[parsedMap[i][j]], true);
    //             } else if (parsedMap[i][j] == "t") {
    //                 placeGraphic(j, i, tiles[parsedMap[i][j]], false);
    //             }
    //         }
    //     }
    // }

    // var backTester = drawBack(backMap);
    // var foreTester = drawFront(foreMap);

};
