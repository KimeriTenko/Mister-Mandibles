# Mister-Mandibles
A throwback to the famous Atari classic Centipede, this game is an updated browser based version perfect for use with a trackball mouse. Use your bug blaster to fire darts at an advancing neon centipede through a forest of mushrooms, collecting bonuses for catching stray fleas, spiders, and scorpions. If you fail to stop their terrifying advance then the arthropods formally declare their dominion over Earth.

# Game Logic
The screen will render the primary game logic and a score box to track the player's performance.
Describe the logic involved in player decisions. 
  - What are the choices available to the player? 
  - What happens when the player makes a choice?
Describe the logic that evaluates the player's victory/loss/progress status.

# MVP Criteria
 Player's bug blaster moves left and right and can fire darts.
 Bugs enter the screen uniformly and assemble in formation.
 Darts destroy centipede segments and other enemies, awarding points.
 Bugs move according to their type, predators targeting Player, and Mr. Mandibles segments will separate and reform to break formation and move    
  downwards, either colliding with and destroying the bug blaster or missing and reappearing at the top of the screen to re-enter the field. 
 
# Post-MVP Plans
I would like to give the game elements a neon glow and simple outlines for a pleasant, modern feel.
It would also be nice to make a custom art title screen.
Eventually it would be nice to make an app version, but only if Atari wouldn't skin me alive:)

# Project Planning
Mr. Mandibles will use plain JavaScript, CSS, and HTML5 to render and animate the game. The game's main components will be broken down as follows:

field.js: this file will construct the background and initialize the primary game loop. The field will contain a bug blaster at the bottom and have predetermined spaces for where enemies can spawn and settle into formation.

blaster.js: this file will contain the logic for controlling the player's bug blaster, allowing it to move, and keeping track of whether the player has collided with an enemy and lost.

enemy.js: this file will contain the logic for an enemy's movement when entering the field, when breaking formation to attack the bug blaster, and when re-entering formation after an attack. Enemy destruction will result in a score increase.

pewpewdarts.js: this file will act as a helper for blaster.js and enemy.js, rendering the blaster's dart shot movement and detecting enemy collision.

utility.js: this file will contain helper methods for collision detection and shared movements of objects.


# Date	Goals
Thu. 06/23	Create GitHub repository. Complete README.md.

Sun. 06/26	Layout the skeleton for mr-mandibles.js to render and interact with the canvas, initializing a game loop that will requestAnimationFrame() and allow for animations. Once animations can be drawn, create bugblaster.js and have it respond to keypresses to move Player left and right, then create pewpewdarts.js and have bug blaster be able to shoot.

Tue. 06/28	Create bugs with enemies.js and have them enter the screen and go towards an empty space in the formation and remain in formation according to type. Create divergent spider,scorpion, and flea patterns. Implement dart collision detection so that enemies are destroyable and grant points.

Thu. 06/30	Introduce the capability for centipede to break formation, regrow head, and pursue separate paths downward toward the bug blaster with potential to cause a game over. Have the enemy re-enter formation if the attack misses. Polish the background and add in sound effects for blaster shots, dart collision, bug to blaster collision, and the main Centipede theme song. 

Sun. 07/03	Deploy MVP to GitHub Pages.

Tue. 07/05	Submit completed project. Project presentations.
