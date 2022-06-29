/* Constants */
const playingGame = 2;

/* Global Variables */
let gameWidth = window.innerWidth - 20;
let gameHeight = window.innerHeight - 20;
let canvas
let blaster
let keys = [];
let currentScene = playingGame;
/* Canvas Setup */
function setup() {
    if (gamewidth > 700) {
        gamewidth = 700;
    }
}
canvas = createCanvas(gameWidth, gameHeight);
centerCanvas();
textAlign(CENTER, CENTER);
noCursor(); //Reomve this line if adding trackball functionality//

blaster = new Blaster(width / 1, 0.85 * height, 15, 1);


function centerCanvas() {
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y);
}

/* Scenes */
function gamePlayScene() {
    background(0, 0, 0);
    blaster.update;
}

/* Animation Loop */
function draw() {
    switch(currentScene) {
        case playingGame:
            gamePlayScene();
            break;
    }
}


/* Event Handlers */
function keyPressed() {
    keys[keyCode] = true;
}
function keyReleased(){
    key[keyCode] = false;
}