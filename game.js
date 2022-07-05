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
var game = new Phaser.Game(744, 1281, Phaser.CANVAS, 'Mr. Mandibles', {
    preload: preload, create: create, update: update
});

// game.state.add("GameState", "GameState");

let gameState = {
    preload: function () {
        game.load.atlas('Mr.Mandibles', 'assets/Mr.Mandibles.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('mushroom1', 'assets/mushroom1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('mushroom2', 'assets/mushroom2.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('mushroom3', 'assets/mushroom3.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('mushroom4', 'assets/mushroom4.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('poisonMush1', 'assets/poisonMush1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('poisonMush2', 'assets/poisonMush2.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('poisonMush3', 'assets/poisonMush3.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('poisonMush4', 'assets/poisonMush4.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('centipedeHead', 'assets/centi1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('centipedeHeadDown', 'assets/centiHeadDown.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('centipedeHeadTurn', 'assets/centiHeadTurn.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('centipedeSegment', 'assets/bodySeg.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('centipedeSegmentDown', 'assets/bodySegDown.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('centipedeSegmentTurn', 'assets/bodySegTurn.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('dart', 'assets/dart.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('blasterReady', 'assets/blasterReady.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('blasterFire', 'assets/blasterFire.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('explosion1', 'assets/explosion1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('explosion2', 'assets/explosion2.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('explosion3', 'assets/explosion3.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('explosion4', 'assets/explosion4.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('explosion5', 'assets/explosion5.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('explosion6', 'assets/explosion6.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider1', 'assets/spider1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider2', 'assets/spider2.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider3', 'assets/spider3.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider4', 'assets/spider4.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider5', 'assets/spider5.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider6', 'assets/spider6.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider7', 'assets/spider7.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('spider8', 'assets/spider8.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('scorpion1', 'assets/scorpion1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('scorpion2', 'assets/scorpion2.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('scorpion3', 'assets/scorpion3.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('scorpion4', 'assets/scorpion4.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('flea1', 'assets/flea1.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('flea2', 'assets/flea2.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('flea3', 'assets/flea3.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('flea4', 'assets/flea4.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('leftEndscreenGraphic', 'assets/leftEndscreenGraphic.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.atlas('rightEndscreenGraphic', 'assets/rightEndscreenGraphic.png', 'Mister-Mandibles/generalSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    },

    create: function () {
        game.add.image (0, 0, "Black");
        MrMandibles = game.add.sprite(453, 500, 'Mr.Mandibles', 'Mr.Mandibles.png');;
        mushroom1 = game.add.sprite(8, 8, 'mushroom1', 'mushroom1.png');;
        mushroom2 = game.add.sprite(8, 8, 'mushroom2', 'mushroom2.png');;
        mushroom3 = game.add.sprite(8, 8, 'mushroom3', 'mushroom3.png');;
        mushroom4 = game.add.sprite(8, 8, 'mushroom4', 'mushroom4.png');;
        poisonMush1 = game.add.sprite(8, 8, 'poisonMush1', 'poisonMush1.png');;
        poisonMush2 = game.add.sprite(8, 8, 'poisonMush2', 'poisonMush2.png');;
        poisonMush3 = game.add.sprite(8, 8, 'poisonMush3', 'poisonMush3');;
        poisonMush4 = game.add.sprite(8, 8, 'poisonMush4', 'poisonMush4.png');;
        centipedeHead1 = game.add.sprite(16, 8, 'centipedeHead1', 'centi1.png');;
        centipedeHead2 = game.add.sprite(16, 8, 'centipedeHead2', 'centiHeadDown.png');;
        centipedeHead3 = game.add.sprite(16, 8, 'centipedeHead3', 'centHeadTurn.png');;
        centipedeSegment1 = game.add.sprite(16, 8, 'centipedeSegment1', 'bodySeg.png');;
        centipedeSegment2 = game.add.sprite(16, 8, 'centipedeSegment2', 'bodySegDown.png');;
        centipedeSegment3 = game.add.sprite(16, 8, 'centipedeSegment3', 'bodySegTurn.png');;
        dart = game.add.sprite(16, 8, 'dart', 'dart.png');;
        blaster1 = game.add.sprite(16, 15, 'blaster1', 'blasterReady.png');;
        blaster2 = game.add.sprite(16, 8, 'blaster2', 'blasterFire.png');;
        explosion1 = game.add.sprite(16, 8, 'explosion1', 'explosion1.png');;
        explosion2 = game.add.sprite(16, 8, 'explosion2', 'explosion2.png');;
        explosion3 = game.add.sprite(16, 8, 'explosion3', 'explosion3.png');;
        explosion4 = game.add.sprite(16, 8, 'explosion4', 'explosion4.png');;
        explosion5 = game.add.sprite(16, 8, 'explosion5', 'explosion5.png');;
        explosion6 = game.add.sprite(16, 8, 'explosion6', 'explosion6.png');;
        spider1 = game.add.sprite(16, 8, 'spider1', 'spider.png');;
        spider2 = game.add.sprite(16, 8, 'spider2', 'spider2.png');;
        spider3 = game.add.sprite(16, 8, 'spider3', 'spider3.png');;
        spider4 = game.add.sprite(16, 8, 'spider4', 'spider4.png');;
        spider5 = game.add.sprite(16, 8, 'spider5', 'spider5.png');;
        spider6 = game.add.sprite(16, 8, 'spider6', 'spider6.png');;
        spider7 = game.add.sprite(16, 8, 'spider7', 'spider7.png');;
        spider8 = game.add.sprite(16, 8, 'spider8', 'spider8.png');;
        scorpion1 = game.add.sprite(16, 8, 'scorpion1', 'scorpion1.png');;
        scorpion2 = game.add.sprite(16, 8, 'scorpion2', 'scorpion2.png');;
        scorpion3 = game.add.sprite(16, 8, 'scorpion3', 'scorpion3.png');;
        scorpion4 = game.add.sprite(16, 8, 'scorpion4', 'scorpion4.png');;
        flea1 = game.add.sprite(16, 8, 'flea1', 'flea1.png');;
        flea2 = game.add.sprite(16, 8, 'flea2', 'flea2.png');;
        flea3 = game.add.sprite(16, 8, 'flea3', 'flea3.png');;
        flea4 = game.add.sprite(16, 8, 'flea4', 'flea4.png');;
        leftEndscreenGraphic = game.add.sprite(230, 500, 'leftEndscreenGraphic', 'leftEndscreenGraphic.png');;
        rightEndscreenGraphic = game.add.sprite(230, 500, 'rigthEndscreenGraphic', 'rightEndscreenGraphic.png');;

        animations.add('move', ['mushroom1.png', 'mushroom2.png', 'mushroom3.png', mushroom4.png], 5, true);
        animations.add('move', ['poisonMush1.png', 'poisonMush2.png', 'poisonMush3.png', poisonMush4.png], 5, true);
        animations.add('move', ['centi1.png', 'centHeadDown.png', 'centiHeadTurn.png'], 5, true);
        animations.add('move', ['bodySeg.png', 'bodySegDown.png', 'bodySegTurn.png'], 5, true);
        animations.add('move', ['blasterReady.png', 'blasterFire.png'], 5, true);
        animations.add('move', ['explosion1.png', 'explosion2.png', 'explosion3.png', 'explosion4.png', 'explosion5.png', 'explosion6.png'], 5, true);
        animations.add('move', ['spider1.png', 'spider2.png', 'spider3.png', 'spider4.png', 'spider5.png', 'spider6.png', 'spider7.png', 'spider8.png'], 5, true);
        animations.add('move', ['scorpion1.png', 'scorpion2.png', 'scorpion3.png', 'scorpion4.png'], 5, true);
        animations.add('move', ['flea1.png', 'flea2.png', 'flea3.png', 'flea4.png'], 5, true);

        play('move');

        game.physics.enable(mushroom, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(poisonMush, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(centipedeHead, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(centipedeSegment, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
         mushroomHealth = 3;

        game.physics.enable(blaster, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(explosion, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(spider, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(scorpion, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

        game.physics.enable(flea, Phaser.Physics.ARCADE);
            mushroom = game.add.group();
            mushroom.enableBody = true;
            mushroom.physicsdBodyType = Phaser.Physics.ARCADE;
            mushroomHealth = 3;

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