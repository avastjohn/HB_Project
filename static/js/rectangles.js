// length and width in pixels of the squares on the map
var UNIT_SIZE = 100;

var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext("2d");


// this data will eventually come from the database:
                    // level one
                var backMap1 = "GGG ppp GGG";
                var petStart1 = [0,1];
                var treatPos1 = [2,1];
                    // level two
                var backMap2 = "GGGG GppG ppGG GGGG";
                var petStart2 = [0,2];
                var treatPos2 = [2,1];
                    // level three
                var backMap3 = "GGGp GGpp GppG ppGG";
                var petStart3 = [0,3];
                var treatPos3 = [3,0];

var gameBoard = function(backMap) {
    this.backMap = backMap;

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
        context.beginPath();
        context.rect((x*UNIT_SIZE+30), (y*UNIT_SIZE+30), UNIT_SIZE, UNIT_SIZE);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#d35577";
        context.stroke();
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

    this.treats = {
        "dog": "bone",
        "bunny": "carrot"
    };

    this.images = {
        "bunny": "http://i.imgur.com/3i4vM4S.png",
        "carrot": "http://i.imgur.com/F1n6SZW.png",
        "dog": "http://i.imgur.com/sPvA7yE.png",
        "bone": "http://i.imgur.com/nczpv7L.png"
    }

    this.image = this.images[this.pettype];
    this.treat = this.treats[this.pettype];
    this.treatImage = this.images[this.treat];

    this.drawPet = function(pos) {
        //draw pet at position (later will call function by passing in petStart)
        var petImage = new Image();
            petImage.onload = function() {
                context.drawImage(petImage, (pos[0]*UNIT_SIZE+30), (pos[1]*UNIT_SIZE));
            };
        petImage.src = this.image;
    };

    this.drawTreat = function(pos) {
        // draw treat at position (later will call function by passing in treatPos)
        return;
    };

    this.move = function(direction) {
        // change coordinates? or delete and redraw...
        return;
    };

    this.sleep = function(delay) {
        // time delay keep bunny in same place
        return;
    };

    this.eatTreat = function() {
        // make this function later. it will make stars 
        // appear or something when bunny reaches carrot.
        return;
    };
};


window.onload = function() {

    var currentBoard = new gameBoard(backMap3);
    currentBoard.drawBoard();

    var mrSnuffles = new pet("bunny", "Mr. Suffles", "m");
    mrSnuffles.drawPet(petStart3);
    
};
