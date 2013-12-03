##Progress Log

next goals:
- be able to update db with changes to the user's account

Dec 3 (Tues):
- made demo version with only two levels

Dec 2 (Mon):
- upgraded graphics
- made tabs draggable/droppable, but they don't do anything yet

Dec 1 (Sun):
- added border to each arrow as it executes, but css goes wonky
- fixed css
- added two new levels with potential for conditionals

Nov 30 (Sat):
- added a page for when the user has completed all levels

Nov 29 (Fri):
- created pop-up when pet reaches treat
- used json/ajax to redraw board for next level/update db
- fixed run button so that it doesn't make the pet run when it isn't supposed to

Nov 28 (Thurs):
- ate thanksgiving dinner
- played dreidel

Nov 27 (Wed):
- new users go straight to game after registration
- worked on an instruction page

Nov 26 (Tues):
- got arrows to regenerate properly!!!
- that only took several days, several instructors, and one nervous breakdown

Nov 25 (Mon):
- majorly upgraded the style, added logo
- not planning to do a lot more styling until polishing time
- attempted to make arrows regenerate

Weekend:
- fixed message changes (no longer says "Gummy went loop")
- fixed weird buggy game state problems
- stylistic changes

Nov 22 (Fri):
- made it so that arrows moved out of the codebar update the runList also
- created registration data persistence
- tried to make arrows regenerate

Nov 21 (Thurs):
- spent most of the day doing a workshop in class
- worked on css a little
- did some testing

Nov 20 (Wed): 
- slept a lot and tried to not be sick

Nov 19 (Tues):
- fixed run button so that it doesn't just freak out when you press it
- rearranged/debugged Pet.run(), created GameBoard.getGameState() and GameBoard.updateMessage()
- started working on registration page, but it doesn't actually do anything yet

Nov 18 (Mon):
- login page actually manages the session
- logout link allows user to log out for the session
- game loads according to the current level that the user is on and takes their pettype, petname, petgender from the database

Weekend:
- codebar reads arrows and updates runList accordingly, but moving them out of the codebar doesn't change anything
- created login page but doesn't actually manage session properly...?

Nov 15 (Fri):
- implemented changes to move() and run() so that pet tries again if arrowcode is unfinished
- made arrows revert when not dropped
- added "loop" as a direction, which makes your arrow code repeat over and over from the beginning
- tried to read what type of arrow has been dropped, failed miserably

Nov 14 (Thurs):
- figured out way to make pet try again if arrowcode is unfinished but correct so far
- made droppable actually do something
- made the draggable arrows stick to the codeboxes
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
