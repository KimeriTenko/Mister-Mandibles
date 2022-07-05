/*Blaster MPV
left right movement
collision disappear, counter tick, respawn

/*Post MPV
allow trackball controls if available and left mouse click fire
collision flash
 The Bug Blaster is destroyed when hit by any enemy, after which any poisonous or partially damaged mushrooms revert to normal.
*/
// *****************************************
/*Blaster Defined*/
// class Blaster {
//     constructor() {
//         this.position = {
//             x: 200,
//             y: 200
//         }
//         this.velocity = {
//             x:0,
//             y: 0
//         }
// const image = new Image()
// image.src = "./assets/spaceship.png"
// this.image = image
// this.width = 50
// this.height = 50
// //     }
// function draw() {
//     // c.fillstyle = "red"
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height)
//     c.drawImage(this.image, this.position.x, this.position.y)
// }
// // }

// const Blaster = new Blaster()
// Blaster.draw()

// function animate() {
//     requestAnimationFrame(animate)
//     Blaster.draw()
// }
// var game = new Phaser.game(744, 1281, Phaser.AUTO);
game.sprites = {
    ...game.sprites,

    /*Blaster Appearance*/
    blaster: game.graphics.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 0,
        spriteY: 400,
        spriteWidth: 40,
        spriteHeight: 40,
        numFrames: 1,
        timePerFrame: 0,
        cols: 1,
        rows: 1
    }),

    /*Dart Function and Appearance*/
    dart: game.graphics.Sprite({
        drawFunction: (_elapsedTime, { x, y, rot, width, height }, context) => {
            context.save();
            context.translate(x + width / 2, y + height / 2);
            context.rotate(rot * Math.PI / 180);
            context.translate(-x - width / 2, -y - height / 2);
            const fillStyle = context.fillStyle;
            context.fillStyle = "#FF0000";
            context.fillRect(x, y, width, height);
            context.fillStyle = fillStyle;
            context.restore();
        }
    }),
}
/*Blaster Features*/
game.Blaster = (spec) => {
    const object = game.Object(spec);
    object.poisonedTimer = 10000;
    object.elapsedPoisonedTimer = 0;
    object.poisoned = false;
    object.dartsTimer = spec.dartsTimer ?? 300;
    object.elapsedDartsTimer = 0;

    /*Poison Feature*/
    const parentUpdate = object.update;
    object.update = (elapsedTime) => {
        if (object.poisoned) {
            object.dy = 0.5;
            object.elapsedPoisonedTimer += elapsedTime;
            if (object.elapsedPoisonedTimer > object.poisonedTimer) {
                object.poisoned = false;
                object.elapsedPoisonedTimer = 0;
            }
        }
        parentUpdate(elapsedTime);
        object.x = Math.max(0, Math.min(object.x, game.width - object.width));
        object.y = Math.max(game.maxPlayerHeight, Math.min(object.y, game.height - object.height));
        object.dx = object.dy = 0;
        object.elapsedDartsTimer += elapsedTime;
    };
    object.poison = () => {
        object.poisoned = true;
    }
    object.moveUp = () => {
        object.dy = -0.75;
    }
    object.moveDown = () => {
        object.dy = 0.75;
    }
    object.moveLeft = () => {
        object.dx = -0.5;
    }
    object.moveRight = () => {
        object.dx = 0.5;
    }

    object.shoot = () => {
        if (object.elapsedDartTimer > object.dartTimer) {
            object.elapsedDartTimer = 0;
            game.darts.push(game.Dart({ x: object.x + object.width / 2 - 5, y: object.y - object.height / 2, dx: 0, dy: -1.5, width: 5, height: 50, sprite: game.sprites.dart }));
        }
    }

    return object;
}