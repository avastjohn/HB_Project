// length and width in pixels of the squares on the map
var UNIT_SIZE = 100;

var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext("2d");
var helptext = document.getElementById('helptext');
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
    // message indicates what is happening in the game
    this.message = document.getElementById('message');
    this.level = level;
    this.tiles = {
        // G spaces are illegal, p (path) spaces are legal, 
        // g spaces don't have a raison d'être yet
        "G": "#7150f9",
        "p": "#a671f3",
        "g": "Gold"
    };

    // berry pink f44d74

    this.getGameState = function(pet) {
        // uses the pet's position to determine the gamestate
        if (pet.nextPos.x == 100) {
            gameState = "tryAgain";
        } else if (this.authorize(pet.nextPos.x, pet.nextPos.y)) {
            gameState = "valid";
            if ((pet.nextPos).eq(pet.treatPos)) {
                gameState = "solved";
            }
        } else {
            gameState = "notValid";
        }
        return gameState;
    };

    this.pronouns = {
        "shehe": ["she", "he"],
        "herhis": ["her", "his"]
    };

    this.updateMessage = function(pet) {
        // updates message based on gamestate
        gameBoard = this;
        var messages = {
            "solved": "<h3>Yay! " + pet.petname + " got to " 
                    + gameBoard.pronouns["herhis"][pet.gender] + " " + pet.treat + "!</h3>",
            "valid": "<h3>Going " + pet.direction + "...</h3>",
            "notValid": "<h3>Uh-oh, " + pet.petname + " can't go " + pet.direction + " :(</h3>"
        };
        if (gameBoard.getGameState(pet) == "tryAgain") {
            return;
        }
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
        context.strokeStyle = "#6736d1";
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
        // determines whether the space is legal or not
        return ((this.getSquare(x, y) != "G") && (this.getSquare(x, y) != "outside"));
    };
};

var completeLevel = function() {
    return;
};

// Pet class
var Pet = function(pettype, petname, gender, level) {
    this.pettype = pettype;
    this.petname = petname;
    this.level = level;
    this.currentPos = new Position(level.petStart.x, level.petStart.y);
    this.treatPos = level.treatPos;
    this.runList = [];
    if (gender == "f") {
        this.gender = 0;
    } else {
        this.gender = 1;
    }

    this.treats = {
        "dog": "bone",
        "bunny": "carrot",
        "penguin": "fish"
    };

    // image sources
    this.images = {
        "bunny": "http://i.imgur.com/3V353g6.png",
        "carrot": "http://i.imgur.com/0e4zWUp.png",
        "dog": "http://i.imgur.com/SImMv4T.png",
        "bone": "http://i.imgur.com/KXDEPVW.png",
        "penguin": "http://i.imgur.com/xBJDNUs.png",
        "fish": "http://i.imgur.com/SxB5DrK.png"
    };

    // assigning image sources to the pet and treat, according to pettype
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
        context.drawImage(treatImageObj, (pos[0]*UNIT_SIZE+2), (pos[1]*UNIT_SIZE)+2);
    };

    this.getNextPos = function(direction) {
        // uses direction and current position to determine next position
        var pet = this;
        if (direction == "up") {
            pet.nextPos = new Position(pet.currentPos.x, (pet.currentPos.y - 1));
        } else if (direction == "down") {
            pet.nextPos = new Position(pet.currentPos.x, parseInt(pet.currentPos.y) + 1);
        } else if (direction == "right") {
            pet.nextPos = new Position(parseInt(pet.currentPos.x) + 1, pet.currentPos.y);
        } else if (direction == "left") {
            pet.nextPos = new Position(pet.currentPos.x - 1, pet.currentPos.y);
        } else {
            pet.nextPos = new Position(100, 100);
        }
        pet.direction = direction;
    };

    this.tryAgain = function(gameBoard) {
        // waits three seconds, then moves the pet back to the starting position
        var pet = this;
        pet.startOver = setTimeout(function() {
            gameBoard.message.innerHTML = "<h3>Try again!</h3>";
            pet.currentPos = new Position(pet.level.petStart.x, pet.level.petStart.y);
            gameBoard.drawBoard();
            pet.redrawTreat([pet.treatPos.x, pet.treatPos.y]);
            pet.redrawPet([pet.currentPos.x, pet.currentPos.y]);
        }, 2700);
    };

    this.eatTreat = function(gameBoard) {
        // improve this function later - reaction when pet reaches treat
        var pet = this;
        gameBoard.drawBoard();
        pet.redrawPet([pet.nextPos.x, pet.nextPos.y]);
        pet.redrawTreat([pet.treatPos.x, pet.treatPos.y]);
        setTimeout(function() {
            $("body").append('<div id="pop-up"></div>');
        }, 1000);
    };

    this.move = function(gameBoard) {
        // moves the pet to the nextPos
        var pet = this;
        gameBoard.drawBoard();
        pet.redrawTreat([pet.treatPos.x, pet.treatPos.y]);
        pet.redrawPet([pet.nextPos.x, pet.nextPos.y]);
    };

    this.getDirectionFromArrows = function(image) {
        // uses arrow images' class to determine the direction
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
        } else {
            return "n";
        }
    };

    this.run = function(gameBoard) {
        // takes a list of movement commands and moves pet accordingly
        var pet = this;
        // iterator
        var i = 0;
        var movementCode = {
            "r":"right",
            "l":"left",
            "u":"up",
            "d":"down",
            "L":"loop",
            "n":"none"
        };
        // sets interval, call function every second
        var intervalID = setInterval(function() {
            // determine the direction of the i-th item of the runList
            var direction = movementCode[pet.getDirectionFromArrows(pet.runList[i])];
            if (direction) {
                pet.getNextPos(direction);
                gameBoard.updateMessage(pet);
                // case: this move is legal
                if (gameBoard.authorize(pet.nextPos.x, pet.nextPos.y)) {
                    pet.move(gameBoard)
                    // case: this move also means the pet has reached the treat
                    if ((pet.nextPos).eq(pet.treatPos)) {
                        pet.eatTreat(gameBoard);
                        clearInterval(intervalID);
                        return;
                    }
                // case: loop - loops back to beginning of code
                } else if (direction == "loop") {
                    i = 0;
                    return;
                // case: this move is not legal
                } else {
                    clearInterval(intervalID);
                    pet.tryAgain(gameBoard)
                }
                // case this was the last item in the runList and the pet has 
                // not yet reached the treat
                if (i >= (pet.runList.length - 1)) {
                    clearInterval(intervalID);
                    pet.tryAgain(gameBoard);
                }
                i+=1;
            // if there isn't a direction (to prevent the run button from doing 
            // weird things when the runList is empty)
            } else {
                clearInterval(intervalID);
            }
        // interval in ms between each function call
        },1200);
    };
};

// on pageload:
$(function() {
    for (var i = 0; i < 7; i++) {
        // loop through the codeboxes to make them droppable
        $(".box"+i).droppable();
        $(".box"+i).on('drop', null, {boxNum:i}, dropResponder);
        $(".box"+i).on('dropout', clearArrow);
    }

    function dropResponder(event, ui){
        // updates the runList when an arrow is dropped into a codebox
        mrSnuffles.runList[event.data.boxNum] = ui.draggable[0];
        ui.draggable.addClass("dropped");
        $(".box" + event.data.boxNum).html(ui.draggable[0]);
        drawNewArrow(ui.draggable[0].id);
        $(ui.draggable).attr("id", "");
        $(ui.draggable).attr("style", "");
    };

    function clearArrow(event, ui){
        // updates the runList when an arrow is removed from a codebox
        for (var i = 0; i < mrSnuffles.runList.length; i++){
            if (ui.draggable[0] == mrSnuffles.runList[i]) {
                mrSnuffles.runList[i] = "n";
            }
        }
    };

    // initialize drawing of board, pet, treat, message for this level
    currentBoard.drawBoard();
    mrSnuffles.drawPet([mrSnuffles.currentPos.x, mrSnuffles.currentPos.y]);
    mrSnuffles.drawTreat([mrSnuffles.treatPos.x, mrSnuffles.treatPos.y]);
    currentBoard.message.innerHTML = "<h3>Help " + mrSnuffles.petname + " get to "
                         + currentBoard.pronouns["herhis"][mrSnuffles.gender] + " "
                         + mrSnuffles.treat + "!</h3>";


    helptext.innerHTML = "<h4>Your directions for " + mrSnuffles.petname + ":</h4>";
    var drawNewArrow = function(direction) {
        //draws a new arrow
        var arrow = $('<img src="../static/img/arrow' + direction + '.png" id="' + direction 
            + '" class="ui-widget-content arrow ' + direction + '"></img>')
        arrow.draggable({ snap: ".ui-widget-header", snapMode: "inner", revert: "invalid"});
        $("#holder" + direction).html(arrow);
    };

    $(".arrow").draggable({ snap: ".ui-widget-header", snapMode: "inner", revert: "invalid"});

    // make arrow box also droppable (so that user can remove arrows)
    $("#arrows").droppable();
    // call run method when user clicks go button
    $(".go").click(function() {
        mrSnuffles.run(currentBoard)
    });
});