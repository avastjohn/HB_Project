// length and width in pixels of the squares on the map
var UNIT_SIZE = 100;

var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext("2d");

// Position class
var Position = function(x, y) {
    this.x = x;
    this.y = y;

    this.eq = function(pos) {
        // returns true if the two Positions are equivilant
        return ((this.x == pos.x) && (this.y == pos.y))
    };
};

// Level class
var Level = function(backMap, petStart, treatPos) {
    this.backMap = backMap;
    petStart = petStart.split(" ");
    treatPos = treatPos.split(" ");
    this.petStart = new Position(petStart[0], petStart[1]);
    this.treatPos = new Position(treatPos[0], treatPos[1]);
};

// GameBoard class
var GameBoard = function(level) {
    this.message = document.getElementById('message');
    this.level = level;
    this.tiles = {
        "G": "#197c57",
        "p": "#96b124",
        "g": "Gold"
    };

    this.getGameState = function(pet) {
        // uses the pet's position to determines the gamestate
        if (this.authorize(pet.nextPos.x, pet.nextPos.y)) {
            gameState = "valid";
            if ((pet.nextPos).eq(pet.treatPos)) {
                gameState = "solved";
            }
        } else {
            gameState = "notValid";
        }
        return gameState;
    };

    this.updateMessage = function(pet) {
        gameBoard = this;
        var messages = {
            "solved": "<h3>You made " + pet.petname + " very happy! Yay!!!!!!</h3>",
            "valid": "<h3>" + pet.petname + " went " + pet.direction + "</h3>",
            "notValid": "<h3>Uh-oh, " + pet.petname + " cannot go " + pet.direction + " :(</h3>"
        };
        gameBoard.message.innerHTML = messages[gameBoard.getGameState(pet)];
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

// Arrow class
var Arrow = function(dirCode) {
    this.dirCode = dirCode;
};

var completeLevel = function() {
    return;
};

// Pet class
var Pet = function(pettype, petname, gender, level) {
    this.pettype = pettype;
    this.petname = petname;
    this.gender = gender;
    this.level = level;
    this.currentPos = new Position(level.petStart.x, level.petStart.y);
    this.treatPos = level.treatPos;
    this.movers = [];
    this.runList = [];
        //////////// for testing purposes
        // case: win
    //this.runList = ["r", "u", "r"];
        // case: not win
    //this.runList = ["r", "u", "l", "u", "l"];
        // case: not finish
    //this.runList = ["r", "u"];

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
    };

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
        this.currentPos.x = pos[0];
        this.currentPos.y = pos[1];
    };

    this.redrawPet = function(pos) {
        context.drawImage(petImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE)+2);
        this.currentPos.x = pos[0];
        this.currentPos.y = pos[1];
    };    

    this.drawTreat = function(pos) {
        treatImageObj.onload = function() {
            context.drawImage(treatImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE+2));
        };
        treatImageObj.src = this.treatImage;
    };

    this.redrawTreat = function(pos) {
        // why won't you let me collapse this, sublimetext?
        context.drawImage(treatImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE)+2);
    };

    this.getNextPos = function(direction) {
        var pet = this;
        if (direction == "up") {
            pet.nextPos = new Position(pet.currentPos.x, (pet.currentPos.y - 1));
        } else if (direction == "down") {
            pet.nextPos = new Position(pet.currentPos.x, parseInt(pet.currentPos.y) + 1);
        } else if (direction == "right") {
            pet.nextPos = new Position(parseInt(pet.currentPos.x) + 1, pet.currentPos.y);
        } else if (direction == "left") {
            pet.nextPos = new Position(pet.currentPos.x - 1, pet.currentPos.y);
        }
        pet.direction = direction;
    };

    this.tryAgain = function(gameBoard) {
        var pet = this;
        pet.startOver = setTimeout(function() {
            gameBoard.message.innerHTML = "<h3>Try again!</h3>";
            pet.currentPos = new Position(pet.level.petStart.x, pet.level.petStart.y);
            gameBoard.drawBoard();
            pet.redrawTreat([pet.treatPos.x, pet.treatPos.y]);
            pet.redrawPet([pet.currentPos.x, pet.currentPos.y]);
        }, 3000);
    };

    this.eatTreat = function(gameBoard) {
        // improve this function later
        var pet = this;
        gameBoard.drawBoard();
        pet.redrawPet([pet.nextPos.x, pet.nextPos.y]);
        pet.redrawTreat([pet.treatPos.x, pet.treatPos.y]);
    };

    this.move = function(gameBoard) {
        // moves the pet to the nextPos
        var pet = this;
        gameBoard.drawBoard();
        pet.redrawTreat([pet.treatPos.x, pet.treatPos.y]);
        pet.redrawPet([pet.nextPos.x, pet.nextPos.y]);
    };

    this.getDirectionFromArrows = function(image) {
        image = $(image)
        if (image.hasClass("down")) {
            return "d";
        } else if (image.hasClass("up")) {
            return "u";
        } else if (image.hasClass("left")) {
            return "l";
        } else if (image.hasClass("right")) {
            return "r";
        } else if (image.hasClass("loop")) {
            return "L";
        }

    };

    this.run = function(gameBoard) {
        // takes a list of movement commands and moves pet accordingly
        var pet = this;
        var i = 0;
        var movementCode = {
            "r":"right",
            "l":"left",
            "u":"up",
            "d":"down",
            "L":"loop"
        };
        var intervalID = setInterval(function() {
            var direction = movementCode[pet.getDirectionFromArrows(pet.runList[i])];
            if (direction) {
                pet.getNextPos(direction);
                gameBoard.updateMessage(pet);
                if (gameBoard.authorize(pet.nextPos.x, pet.nextPos.y)) {
                    pet.move(gameBoard)
                    if ((pet.nextPos).eq(pet.treatPos)) {
                        pet.eatTreat(gameBoard);
                        clearInterval(intervalID);
                        return;
                    }
                } else {
                    clearInterval(intervalID);
                    pet.tryAgain(gameBoard);
                }
                if (direction == "loop") {
                    i = 0;
                    return;
                }
                if (i >= (pet.runList.length - 1)) {
                    clearInterval(intervalID);
                    pet.tryAgain(gameBoard);
                }
                i+=1;
            } else {
                clearInterval(intervalID);
            }
        },1000);
    };
};

// on pageload:
$(function() {
    // the drop is the event, the ui.draggable is the arrow
    for (var i = 0; i < 7; i++) {
        $(".box"+i).droppable();
        $(".box"+i).on('drop', null, {boxNum:i}, dropResponder);
        $(".box"+i).on('dropout', clearArrow);
    }    
    // also have it repopulate the div
    // use drop out() to listen for arrow leaving div

    function dropResponder(event, ui){
        console.log("dropped ui" + ui.draggable[0].src);
        mrSnuffles.runList[event.data.boxNum] = ui.draggable[0];


        ui.draggable.addClass("dropped");
        //console.log(mrSnuffles.runList);
    }

    function clearArrow(event, ui){
        console.log("called clearArrow()");
        for (var i = 0; i < mrSnuffles.runList.length; i++){
            if (ui.draggable[0] == mrSnuffles.runList[i]) {
                mrSnuffles.runList[i] = null;
            }
        }
    }

    $(".arrow").draggable({ snap: ".ui-widget-header", snapMode: "inner", revert: "invalid" });
    currentBoard.drawBoard();
    $("#arrows").droppable();
    mrSnuffles.drawPet([mrSnuffles.currentPos.x, mrSnuffles.currentPos.y]);
    mrSnuffles.drawTreat([mrSnuffles.treatPos.x, mrSnuffles.treatPos.y]);
    currentBoard.message.innerHTML = "<h3> Help " + mrSnuffles.petname + " get to the "
                         + mrSnuffles.treat + "!</h3>";

    $(".go").click(function() {

        mrSnuffles.run(currentBoard)} );
    // for testing:
    //mrSnuffles.run(currentBoard);
});