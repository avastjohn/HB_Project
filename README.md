##Progress so far:



plans for Monday:
- figure out how to move pet from one spot to another
- figure out how to use setTimeout to delay between movements of pet
- try to get hard-coded arrow string to inform execution of movement of pet

Nov 8 (Fri):
- tried to get setTimeout to work, couldn't figure out why it wasn't redrawing the pet and treat
    --> turns out my pet and treat draw methods only work for onload
- tried to load the image of the pet, save a snapshot of the image using getImageData() and putImageData(), but it turns out it will not save any actual images - just what's been drawn on the canvas

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
- Christian asked me to read this article: http://www.chris-granger.com/2012/12/11/anatomy-of-a-knockout and I'm trying to understand it/understand why he wants me to learn this.

Nov 5 (Tues):
- made seed.py/put in sample data
- got databse working
- created canvas with js functions that convert map string to actual squares on canvas

Nov 4 (Mon):
- got github repo working
- cloned templates
- figured out structure for db, made proto in sqlite3
