// length and width in pixels of the squares on the map
var UNIT_SIZE = 100;

var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext("2d");

var message = document.getElementById('message');

// level class
var level = function(backMap, petStart, treatPos) {
    this.backMap = backMap;
    this.petStart = petStart;
    this.treatPos = treatPos;
}

// this data will eventually come from the database:
var level1 = new level("GGG ppp GGG", [0,1], [2,1]);
var level2 = new level("GGGG GppG ppGG GGGG", [0,2], [2,1]);
var level3 = new level("GGGp GGpp GppG ppGG", [0,3], [3,0]);

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
        context.rect((x*UNIT_SIZE+2), (y*UNIT_SIZE+2), UNIT_SIZE, UNIT_SIZE);
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

    this.getSquare = function(x, y) {
        // takes coordinates and returns what kind of square is at that spot
        var rows = this.level.backMap.split(" ");
        if ((x < 0) || (x > rows[0].length - 1) || (y < 0) || (y > rows.length - 1)) {
            return "outside";
        } else {
            return rows[y][x];
        }
    };

    this.authorize = function(x, y) {
        return ((this.getSquare(x, y) != "G") && (this.getSquare(x, y) != "outside"));
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
        "bunny": "carrot",
        "penguin": "fish"
    };

    this.images = {
        "bunny": "http://i.imgur.com/3V353g6.png",
        "carrot": "http://i.imgur.com/0e4zWUp.png",
        "dog": "http://i.imgur.com/SImMv4T.png",
        "bone": "http://i.imgur.com/KXDEPVW.png",
        "penguin": "http://i.imgur.com/xBJDNUs.png",
        "fish": "http://i.imgur.com/SxB5DrK.png"
    }

    this.image = this.images[this.pettype];
    this.treat = this.treats[this.pettype];
    this.treatImage = this.images[this.treat];

    var petImageObj = new Image();
    var treatImageObj = new Image();

    this.drawPet = function(pos) {
        petImageObj.onload = function() {
            context.drawImage(petImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE)+2);
        };
        petImageObj.src = this.image;
        this.currentPos = pos;
    };

    this.redrawPet = function(pos) {
        context.drawImage(petImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE)+2);
        this.currentPos = pos;
    };    

    this.drawTreat = function(pos) {
        treatImageObj.onload = function() {
            context.drawImage(treatImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE+2));
        };
        treatImageObj.src = this.treatImage;
    };

    this.redrawTreat = function(pos) {
        context.drawImage(treatImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE)+2);
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

    this.getNextPos = function(direction) {
        var that = this;
        var nextPos;
        if (direction == "up") {
            that.nextPos = [that.currentPos[0], that.currentPos[1] - 1];
        } else if (direction == "down") {
            that.nextPos = [that.currentPos[0], that.currentPos[1] + 1];
        } else if (direction == "right") {
            that.nextPos = [that.currentPos[0] + 1, that.currentPos[1]];
        } else if (direction == "left") {
            that.nextPos = [that.currentPos[0] - 1, that.currentPos[1]];
        }
    }

    var time = 0;

    this.move = function(direction, gameBoard) {
        var that = this;
        that.mover = setTimeout(function() {
            that.getNextPos(direction);
            if (gameBoard.authorize(that.nextPos[0], that.nextPos[1])) {
                gameBoard.drawBoard();
                that.redrawTreat(that.treatPos);
                that.redrawPet(that.nextPos);
                message.innerHTML = "<h3>" + mrSnuffles.petname + " went " + direction + "</h3>";
            } else {
                clearTimeout(that.mover);
                message.innerHTML = "<h3>Uh-oh, " + mrSnuffles.petname + " cannot go " + direction + " :(</h3>";
            }
        }, (time + 1000));
        time += 1000;
    };

    var movementCode = {
        "r":"right",
        "l":"left",
        "u":"up",
        "d":"down"
    };

    this.run = function(runList, gameBoard) {
        for (var i = 0; i < runList.length; i++) {
            this.move(movementCode[runList[i]], gameBoard);
        }
    };


    this.eatTreat = function() {
        // make this function later. it will make stars 
        // appear or something when bunny reaches carrot.
        return;
    };
};

var mrSnuffles = new pet("bunny", "Mr. Snuffles", "m", level3);
var currentBoard = new gameBoard(level3);

// onload function
window.onload = function() {
    currentBoard.drawBoard();
    mrSnuffles.drawPet(mrSnuffles.currentPos);
    mrSnuffles.drawTreat(mrSnuffles.treatPos);
    mrSnuffles.run(["r", "u", "r", "u", "l", "r"], currentBoard);
    message.innerHTML = "<h3> Help " + mrSnuffles.petname + " get to his " + mrSnuffles.treat + "!</h3>";
};

