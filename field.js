/*MPV field of play{
    The screen will consist of a canvas element that will render the primary game logic
        and a score box to track the player's performance.
    score board{
        5 points are awarded for each regenerated mushroom.
        Mushrooms destruction earns 1 point each.
        Spiders are worth 300, 600, or 900 points depending on how close the player shoots it.
        Centipede head worth 100 points segments 10
    }
    player score{
        left top orientation
        counts all points
        when all lives expired returns to end screen
    }
    life tally{
        append at end of player score
    }
    high score{
            middle top orientation

    }
    end screen{ 
        with high score ranking
            auto adds player score to high score list
            //Post MPV add player name to placed score//
        and bonus life every 12000 info
    }
    space bar{
        pause
    } 
}
*/

/*Post MPV field of play

*/

/*MPV Extra Life
An extra life is awarded every 12, 000 points.
*/

/*MPV Mushrooms
Take 4 shots to destroy

/*Post MPV Mushrooms
The Bug Blaster is destroyed when hit by any enemy, after which any poisonous or partially damaged mushrooms revert to normal.



//how to make lines glow in canvas
// context.shadowBlur = 10;
// context.shadowColor = "black";
// add mushroom code 
// mushrooms generate from centipede bit
// take multiple pews to disentengrate*/