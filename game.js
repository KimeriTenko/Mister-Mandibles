/*Opening Menu Content*/
const menu = {};
menu.initialize = () => {
    menu.scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
    menu.state = "main";
    menu.controls = localStorage.getItem("controls") ? JSON.parse(localStorage.getItem("controls")) : {
        "moveUp": "ArrowUp",
        "moveDown": "ArrowDown",
        "moveLeft": "ArrowLeft",
        "moveRight": "ArrowRight",
        "shoot": "Space",
    };
}
menu.setState = (state) => {
    menu.state = state;
    menu.draw();
}
menu.reRegisterKeys = () => {
    Object.keys(game.keyboard.handlers).map(key => game.keyboard.unregisterCommand(key));
    //     game.keyboard.registerCommand(menu.controls.moveUp, game.blaster.moveUp);
    //     game.keyboard.registerCommand(menu.controls.moveDown, game.blaster.moveDown);
    //     game.keyboard.registerCommand(menu.controls.moveLeft, game.blaster.moveLeft);
    //     game.keyboard.registerCommand(menu.controls.moveRight, game.blaster.moveRight);
    //     game.keyboard.registerCommand(menu.controls.shoot, game.blaster.shoot);
    //     game.keyboard.registerCommand("Escape", () => { menu.draw(); game.stopped = true; });
    //     localStorage.setItem("controls", JSON.stringify(menu.controls))
}
menu.hide = () => {
    const menuElement = document.getElementById("menu");
    menuElement.style.display = "none";
    menu.reRegisterKeys();
    game.resume();
}
menu.listenFor = (action, elementId) => {
    const element = document.getElementById(elementId);
    element.innerHTML = "Listening...";
    const handleKey = (event) => {
        window.removeEventListener("keydown", handleKey);
        if (event.key == "Escape") {
            element.innerHTML = menu.controls[action];
            return;
        }
        menu.controls[action] = event.key;
        element.innerHTML = event.key;
    }
    window.addEventListener("keydown", handleKey);
}
menu.draw = () => {
    const menuElement = document.getElementById("menu");
    menuElement.style.display = "block";
    menuElement.innerHTML = `<h1>Mr. Mandibles</h1>`;
    if (menu.state == "main") {
        menuElement.innerHTML += `
      <div class='menu-button' onclick='menu.setState("controls")'>Change Controls</div>
    `;
    }
    else if (menu.state == "controls") {
        menuElement.innerHTML += `
      <div>
        <p>
          Move left: <button id="moveLeft" onclick='menu.listenFor("moveLeft", "moveLeft")'>${menu.controls.moveLeft}</button>
          <br>
        Move right: <button id="moveRight" onclick='menu.listenFor("moveRight", "moveRight")'>${menu.controls.moveRight}</button>
          <br>
          Move up: <button id="moveUp" onclick='menu.listenFor("moveUp", "moveUp")'>${menu.controls.moveUp}</button>
          <br>
          Move down: <button id="moveDown" onclick='menu.listenFor("moveDown", "moveDown")'>${menu.controls.moveDown}</button>
          <br>
          Shoot: <button id="shoot" onclick='menu.listenFor("shoot", "shoot")'>${menu.controls.shoot}</button>
        </p>
      </div>
      `
    } else if (menu.state == "credits") {
        menuElement.innerHTML += `
      <div>
        <p>
          Sounds from <a href="https://opengameart.org/content/laser-fire">dklon</a>
          <br>
          Sprites from <a href="https://www.pngkit.com/view/u2w7r5u2e6u2a9r5_general-sprites-centipede-arcade-game-sprites/">PNGKit</a>
          <br>
          Some code from <a href="https://www.usu.edu/directory/?person=56DB0BFCCAEECEC8D5">Dr. Mathias</a>
          <br>
          Developed by Logan Hunt
        </p>
      </div>
    `
    } else if (menu.state == "scores") {
        menuElement.innerHTML += `
      <div>
        <p>
        ${menu.scores.map((score, index) => `${index + 1}: ${score}<br>`).join("")}
        </p>
      </div>
    `
    } else if (menu.state == "game-over") {
        menuElement.innerHTML += `
      <div>
        <p>
          Game Over
          <br>
          Your final score was: ${game.score}
      </div>
    `
    }

    menuElement.innerHTML += "<div class='menu-button' onclick='menu.hide()'>Resume Game</div>"
    if (menu.state !== "main") {
        menuElement.innerHTML += "<div class='menu-button' onclick='menu.setState(\"main\")'>Back</div>"
    }
}

menu.initialize();



/*Initial Game Graphics*/
console.log(Phaser.game)
// `var Phaser = Phaser || {}`
// class Game extends Phaser.Game {
//     constructor() {
//         super('100%', '100%', Phaser.AUTO, 'gameArea');}
var game = new Phaser.Game(744, 1281, Phaser.CANVAS,'Mr. Mandibles', {
    preload:preload, create:create, update:update});

// game.state.add("GameState", "GameState");

let gameState = {
    preload: function () {
        game.load.image('centipede', 'assets/centipede.png');
        game.load.image('mushroom', 'assets/mushroom.png');
        game.load.image('blaster', 'assets/blaster.png');
        game.load.image('dart', 'assets/dart.png');
        game.load.image('explosion', 'assets/explosion.png');
        game.load.image('spider', 'assets/spider.png');
        game.load.image('scorpion', 'assets/scorpion.png');
        game.load.image('flea', 'assets/flea.png');
        game.load.atlas('')
    },
    create: function () {

    },
    update: function () {

    }
};
// new Game();


Phaser.StateManager = function (game, pendingState) { };
game.state.start("GameState");



game.graphics = (
    (context) => {
        context.imageSmoothingEnabled = false;
        const clear = () => {
            context.clearRect(0, 0, game.width, game.height);
        };

        const Sprite = ({ sheetSrc, spriteX, spriteY, spriteWidth, spriteHeight, timePerFrame, cols, rows, numFrames, drawFunction }) => {
            timePerFrame = timePerFrame ?? 100;
            numFrames = numFrames ?? 1;
            cols = cols ?? numFrames;
            rows = rows ?? 1;

            let ready = false;

            let image;
            if (sheetSrc) {
                image = new Image();
                image.src = sheetSrc;
                image.onload = () => { ready = true; };
            }

            let currentFrame = 0;
            let lastTime = performance.now();

            let draw;
            if (!drawFunction) {
                draw = (_elapsedTime, { x, y, rot, width, height }) => {

                    if (ready) {
                        if (numFrames > 1) {
                            if (performance.now() - lastTime > timePerFrame) {
                                lastTime = performance.now();
                                currentFrame = (currentFrame + 1) % numFrames;
                            }
                        }
                        context.save();
                        context.translate(x + width / 2, y + height / 2);
                        context.rotate(rot * Math.PI / 180);
                        context.translate(-x - width / 2, -y - height / 2);
                        const row = currentFrame % rows;
                        const col = Math.floor(currentFrame / rows);
                        context.drawImage(image, spriteX + col * spriteWidth, spriteY + row * spriteHeight, spriteWidth, spriteHeight, x, y, width, height);
                        context.restore();
                    }
                };
            } else {
                draw = (elapsedTime, drawSpec) => drawFunction(elapsedTime, drawSpec, context);
            }
            return { draw, timePerFrame, numFrames };
        }

        return { clear, Sprite };
    }
)(document.getElementById("game-canvas").getContext("2d"));



/*Primary Game Elements*/
// const game = {
//     stopped: false,
//     width: document.getElementById('game-canvas').width,
//     height: document.getElementById('game-canvas').height,
//     level: 1,
// };

game.resume = () => {
    game.stopped = false;
    game.lastTimeStamp = performance.now();
    menu.reRegisterKeys();
    requestAnimationFrame(gameLoop);
}

game.resetObjects = () => {
    game.blaster.x = game.width / 2;
    game.blaser.y = game.height / 2;
    game.darts = [];
    game.explosions = [];
    game.mushroomDims = { width: 40, height: 40 };
    game.mushrooms = game.Mushroom.generateMushrooms(game.mushroomDims);
    game.centipede = game.Centipede({ segments: Math.min(game.level * 5 + 5, 15), startX: game.width / 2, startY: 0, rot: 180, width: 40, height: 40, dx: 0.2, dy: 0 });
    game.spiders = [];
    game.fleas = [];
    game.scorpions = [];
}

game.gameOver = () => {
    menu.showMenu();
    menu.setState('game-over');
    menu.addScore(game.score);

    menu.onHide = initialize;
}

game.getObjects = () => [game.player, ...game.bullets, ...game.mushrooms, ...game.spiders, ...game.fleas, ...game.scorpions, game.centipede, ...game.explosions];
game.getDartCollidableObjects = () => [...game.mushrooms, ...game.spiders, ...game.fleas, ...game.scorpions, game.centipede];
game.getMushroomCollidableObjects = () => [game.player, ...game.scorpions, game.centipede];
game.getBlasterCollidableObjects = () => [...game.spiders, ...game.fleas, ...game.scorpions, game.centipede]

/*Primary Game Objects and Modifiers*/

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight



const initialize = () => {
    game.score = 0;
    game.totalTime = 0;
    game.lastTimeStamp = performance.now();

    // game.blaster = game.Blaster({ x: game.width / 2 - 20, y: game.height - 40, width: 40, height: 40, sprite: game.sprites.blaster });
    game.darts = [];
    // game.mushrooms = game.Mushroom.generateMushrooms({ width: 40, height: 40 });
};

const update = (elapsedTime) => {
    game.totalTime += elapsedTime;

    game.blaster.update(elapsedTime);
    game.getObjects().map((object) => object.update(elapsedTime));
    game.darts.map((dart) => game.getDartCollidableObjects().filter((object) => object.intersects(dart))).map((objects, i) => {
        if (objects.length > 0) {
            game.darts[i].alive = false;
        }
        objects.map((object) => object.onDartHit ? object.onDartHit() : null)
    })
    game.darts = game.bullets.filter((dart) => dart.alive);
    game.mushrooms = game.mushrooms.filter((mushroom) => mushroom.state > 0);
};

const render = (elapsedTime) => {
    game.graphics.clear();
    game.getObjects().map((object) => object.draw(elapsedTime));

    document.getElementById("hud").innerHTML = `Score: ${game.score} `;
};

const gameLoop = (time) => {
    const elapsedTime = time - game.lastTimeStamp;
    game.lastTimeStamp = time;
    handleInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    if (!game.stopped) {
        requestAnimationFrame(gameLoop);
    }
};


// *************************************
/*Keyboard Inputs*/

game.input = (() => {
    "use strict";
    const Keyboard = () => {
        const keys = {};
        const handlers = {};
        const keyPress = (event) => {
            keys[event.key] = event.timeStamp;
        };
        const keyRelease = (event) => {
            delete keys[event.key];
        };
        const registerCommand = (key, handler) => {
            handlers[key] = handler;
        };
        const unregisterCommand = (key) => {
            delete handlers[key];
        }
        const update = (elapsedTime) => {
            for (let key in keys) {
                if (keys.hasOwnProperty(key)) {
                    if (handlers[key]) {
                        handlers[key](elapsedTime);
                    }
                }
            }
        };
        window.addEventListener("keydown", keyPress);
        window.addEventListener("keyup", keyRelease);
        return { keys, handlers, registerCommand, unregisterCommand, update };
    }
    return { Keyboard };
})();
// game.keyboard = game.input.Keyboard();
// const handleInput = game.keyboard.update;

// game.sprites = {}
// initialize();
// menu.reRegisterKeys();
// requestAnimationFrame(gameLoop);

/* Game Sounds*/
game.sounds = {
    mushroom_hit: new Audio("assets/mushroomHit.mp3"),
    enemy_hit: new Audio("assets/enemyHit.mp3"),
    laser: new Audio("assets/pewpew.mp3"),
};
/*The game is constructed using PhaserJS. Version Phaser 2.19.
PhaserJS is a custom build of PixiJS intended for game construction. 
PhaserJS has a lot of benefits: It includes built in physics, sounds, and state,
You can use map editors like Tiled,
and it has input and collision built in. Phaser is built on states
(i.e., a convenient and streamlined division into Boot, Preload, GameTitle, Main, and GameOver.
    Boot- handles game setup and calls next state
    Preload- loads any assets and calls GameTitle
    GameTitle- displays title screen and menu/start
    Main- handles the logic of the game itself and
    GameOver- displays end screen and displays high scores and allows the game reset
    
    The great thing about it is that it does help organize code and each state is run individually
    so the entire game structure is not being processed in the memory all at once.) */