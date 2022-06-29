/*Blaster MPV
arrowhead shape
movement bordered by demarcation boundary
collision disappear, counter tick, respawn
movement trackball motion 
limit field
left click fires
pew pews need to fire straight lines and destroy objects
default controls for trackball and left mouse, 
    otherwise left right with arrow keys
during collision*/

/*Post MPV
glow render
collision flash
 The Bug Blaster is destroyed when hit by any enemy, after which any poisonous or partially damaged mushrooms revert to normal.
*/
// *****************************************
/*Blaster Defined*/
function Blaster(x, y, size, speed) {

}
/*Properties*/
this.x = x;
this.y = y;
this.size = size;
this.speed = speed;

/*Methods
Add Trackball Functionality Post MPV*/
this.move = function(){
    if (keys[LEFT_ARROW]) {
        this.x -= this.speed;
    }
    if (keys[RIGHT_ARROW]) {
        this.x += this.speed;
    }
    if (keys[UP_ARROW]) {
        this.y -= this.speed;
    }
    if (keys[DOWN_ARROW]) {
        this.y += this.speed;
    }
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 30, height - this.size/2);
}

this.show = function () {
    noStroke()
    fill(0, #FFD166, 0)//color sprite//
    rect(this.x - 2, this.y - this.size / 2 - 5, 4, 6);//blastersprite//
    ellipse(this.x, this.y, this.size, this.size);
}
this.update = function() {
    this.move();
    this.show();
}

