/*MPV Centipede
10-12 initial segments and head
speed
movement
    centipede appears from left or right 
    When it touches a mushroom or reaches the edge of the screen, it descends one level and reverses
    direction.
    Each segment of the centipede becomes a mushroom when shot; 
    Each piece then continues independently on its way down the screen, with the rear piece
    sprouting its own head. 
    If the centipede head is destroyed, the segment behind it becomes the next head.
divide on collision
    shooting one of the middle segments splits the centipede into 2 pieces
    each successive centipede is one segment shorter and accompanied by one detached, faster-moving head. 
    This pattern continues until all segments are separate heads, afterwhich it repeats with a single full-length centipede.
respawn, When all the centipede's segments are destroyed, another one enters from the top of the screen.
*/

/*Post MPV Centipede
head segments become poison mushrooms
    A centipede touching a poison mushroom will attack straight down toward the bottom, then return to normal behavior upon reaching it.
speed and direction
    Once the centipede reaches the bottom of the screen, it stays within the player area and one-segment "head" centipedes
    will periodically appear from the side. This continues until the player has eliminated both the original centipede and
    all heads.
*/

/*MPV Spiders
    Spiders move across the player area in a zig - zag pattern and eat some of the mushrooms; 
    600 points default for shooting
    speed
*/

/*Post MPV Spiders
    Spiders are worth 300, 600, or 900 points depending on how close the player shoots it.
*/

/*MPV Scorpions
    Scorpions move horizontally across the screen
    Worth 1,000 points each
    speed
*/

/*Post MPV Scorpions
    Scorpions move horizontally across the screen, turning every mushroom they touch into poison mushrooms.
*/

/*Post MPV Fleas
    Fleas drop vertically and disappear upon touching the bottom of the screen, 
    occasionally leaving a trail of mushrooms in their path when only a few mushrooms are in the player movement area;
    they are worth 200 points and takes two shots to destroy.

*/
// var game = new Phaser.game(744, 1281, Phaser.AUTO);

game.sprites = {
    ...game.sprites,

    centipedeHead: game.graphics?.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 0,
        spriteY: 0,
        spriteWidth: 40,
        spriteHeight: 40,
        numFrames: 4,
        timePerFrame: 100,
    }),
    centipedeBody: game.graphics?.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 0,
        spriteY: 80,
        spriteWidth: 40,
        spriteHeight: 40,
        numFrames: 4,
        timePerFrame: 100,
    }),
    spider: game.graphics?.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 0,
        spriteY: 160,
        spriteWidth: 80,
        spriteHeight: 40,
        numFrames: 8,
        timePerFrame: 100,
        cols: 4,
        rows: 2,
    }),
    flea: game.graphics?.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 320,
        spriteY: 160,
        spriteWidth: 45,
        spriteHeight: 40,
        numFrames: 4,
        timePerFrame: 500,
        cols: 2,
        rows: 2,
    }),
    scorpion: game.graphics.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 0,
        spriteY: 280,
        spriteWidth: 80,
        spriteHeight: 40,
        numFrames: 4,
        timePerFrame: 500,
        cols: 4,
    }),

    explosionBig: game.graphics?.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 0,
        spriteY: 320,
        numFrames: 8,
        spriteWidth: 80,
        spriteHeight: 40,
        cols: 4,
        rows: 2,
        timePerFrame: 30,
    }),
    explosionSmall: game.graphics?.Sprite({
        sheetSrc: "assets/General Sprites.png",
        spriteX: 320,
        spriteY: 320,
        numFrames: 6,
        spriteWidth: 40,
        spriteHeight: 40,
        cols: 3,
        rows: 2,
        timePerFrame: 30,
    }),
    regularMushrooms: [3, 2, 1, 0].map(i =>
        game.graphics?.Sprite({
            sheetSrc: "assets/General Sprites.png",
            spriteX: 320 + i * 40,
            spriteY: 0,
            numFrames: 1,
            spriteWidth: 40,
            spriteHeight: 40,
            timePerFrame: 0,
        })
    ),
    poisonMushrooms: [3, 2, 1, 0].map(i =>
        game.graphics?.Sprite({
            sheetSrc: "assets/General Sprites.png",
            spriteX: 320 + i * 40,
            spriteY: 40,
            numFrames: 1,
            spriteWidth: 40,
            spriteHeight: 40,
            timePerFrame: 0,
        })
    )
};
