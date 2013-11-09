// length and width in pixels of the squares on the map
var UNIT_SIZE = 100;

var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext("2d");

// level class
var level = function(backMap, petStart, treatPos) {
    this.backMap = backMap;
    this.petStart = petStart;
    this.treatPos = treatPos;
}

// this data will eventually come from the database:
var level1 = new level("GGG ppp GGG", [0,1], [2,1]);
var level2 = new level("GGGG GppG ppGG GGGG", [0,2], [2,1]);
var level3 = new level("GGGp GGpp GppG gpGG", [0,3], [3,0]);

// gameBoard class
var gameBoard = function(level) {
    this.level = level;

    this.tiles = {
        "G": "#197c57",
        "p": "#96b124",
        "g": "Gold"
    };

    this.parseMap = function() {
        // takes mapstring and parses into an array of arrays
        var rows = this.level.backMap.split(" ");
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

// pet class
var pet = function(pettype, petname, gender, level) {
    this.pettype = pettype;
    this.petname = petname;
    this.gender = gender;
    this.level = level;
    this.currentPos = level.petStart;
    this.treatPos = level.treatPos;

    this.treats = {
        "dog": "bone",
        "bunny": "carrot"
    };

    this.images = {
        "bunny": "http://i.imgur.com/3V353g6.png",
        "carrot": "http://i.imgur.com/F1n6SZW.png",
        "dog": "http://i.imgur.com/SImMv4T.png",
        "bone": "http://i.imgur.com/nczpv7L.png"
    }

    this.image = this.images[this.pettype];
    this.treat = this.treats[this.pettype];
    this.treatImage = this.images[this.treat];

    var petImageObj = new Image();
    var treatImageObj = new Image();

    this.drawPet = function(pos) {
        petImageObj.onload = function() {
            context.drawImage(petImageObj, (pos[0]*UNIT_SIZE+30), (pos[1]*UNIT_SIZE)+30);
        };
        petImageObj.src = this.image;
        this.currentPos = pos;
    };

    this.drawTreat = function(pos) {
        treatImageObj.onload = function() {
            context.drawImage(treatImageObj, (pos[0]*UNIT_SIZE+30), (pos[1]*UNIT_SIZE+30));
        };
        treatImageObj.src = this.treatImage;
    };

    this.sleep = function(millsec) {
        // time delay keep bunny in same place
        var start = new Date().getTime();
        for (var i = 0; i < 999999999; i++) {
            if ((new Date().getTime() - start ) > millsec) {
                break;
            }
        }
    };

    this.move = function(direction, gameBoard) {
        // gameBoard.drawBoard();
        var savedPet = context.getImageData(this.currentPos[0]*UNIT_SIZE+30, 
                                            this.currentPos[1]*UNIT_SIZE+30, 
                                            UNIT_SIZE, UNIT_SIZE);
        
        // this.drawTreat(this.treatPos);
        if (direction == "up") {
            context.putImageData(savedPet, this.currentPos[0]*UNIT_SIZE+30, (this.currentPos[1] - 1)*UNIT_SIZE+30);
        } else if (direction == "down") {
            this.drawPet([this.currentPos[0], this.currentPos[1] + 1]);
        } else if (direction == "right") {
            this.drawPet([this.currentPos[0] + 1, this.currentPos[1]]);
        } else if (direction == "left") {
            this.drawPet([this.currentPos[0] - 1, this.currentPos[1]]);
        } else {
            console.log("grrrrrrr");
        };
    };



    this.eatTreat = function() {
        // make this function later. it will make stars 
        // appear or something when bunny reaches carrot.
        return;
    };
};

var mrSnuffles = new pet("bunny", "Mr. Suffles", "m", level3);
var currentBoard = new gameBoard(level3);

// onload function
window.onload = function() {
    mrSnuffles.drawPet(mrSnuffles.currentPos);
    currentBoard.drawBoard();

    mrSnuffles.drawTreat(mrSnuffles.treatPos);
//    mrSnuffles.move("up", currentBoard);
    
    //mrSnuffles.move("up", currentBoard);
};


// mrSnuffles.move("right", currentBoard);
// mrSnuffles.move("up", currentBoard);
// mrSnuffles.move("left", currentBoard);

