##Progress Log

goals for today/this weekend:
- be able to read code from arrows dropped in codeboxes
- fix droppables so that arrows snap-to better
- make arrows jump back to original position if not dropped in droppable

Nov 15 (Fri):
- implemented changes to move() and run() so that pet tries again if arrowcode is unfinished

Nov 14 (Thurs):
- figured out way to make pet try again if arrowcode is unfinished but correct so far
- made droppable actually do something
- make the draggable arrows stick to the codeboxes
- fixed the button placements

Nov 13 (Wed):
- got jQuery ui functions working - can drag arrows around screen
- created position class with method that evaluates whether two positions are equivalent or not
- run() now evaluates when the pet has reached the treat, and all timers get cleared
- made the pet's position reset to petStart once an "error" in the code list has been detected, and all timers get cleared

Nov 12 (Tues):
- created customized message that updates as events occur
- researched jquery, took a couple of lessons on codecademy, tried to load jquery

Nov 11 (Mon):
- put restrictions on when pet can move in certain directions
- made divs for the user to put their "code buttons" in
- placed code buttons in html doc

Weekend:
- got hard-coded list to inform execution of movement of pet
- made getSquare function to figure out what kind of square is on any given part of the gameboard

Nov 8 (Fri):
- made move() method that redraws the board and redraws pet in new location after delay
- that was a huge effing accomplishment, so I'm pretty happy with just that

Nov 7 (Thurs):
- organized rectangles.js into classes
- researched removing/moving/redrawing images on the canvas
    --> looks like I will need to cover images up and redraw them
    --> made bunny fit into one square so that I can cover him with a square

Nov 6 (Wed):
- created bunny and carrot graphics to use on the game board
- split the game map into two maps - foreground and background
- edited js functions so that they place the bunny and carrot according to the foreground map
- researched js game engines, thinking about not using a game engine at all
- Christian asked me to read this article: http://www.chris-granger.com/2012/12/11/anatomy-of-a-knockout and I'm trying to understand it/understand why he wants me to learn this

Nov 5 (Tues):
- made seed.py/put in sample data
- got databse working
- created canvas with js functions that convert map string to actual squares on canvas

Nov 4 (Mon):
- got github repo working
- cloned templates
- figured out structure for db, made proto in sqlite3
