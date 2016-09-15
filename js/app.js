// enemy starting x and potential y coordinates

enemyX = -100;
enemyY = [55, 150, 225];

// player starting coordinates

playerX = 200;
playerY = 385;

//setting number of lives and appending the variable to the top of the page

function restartplayer() {
    playerX = 200;
    playerY = 385;
};

//restart the bugs form the left of the screen, while also changing the Y position

function restartbug() {
    this.x = -100;
    this.y = enemyY[Math.round(Math.random()*2) ];
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //sets each individual bug to the enemyX and one of 3 y's
    this.x = enemyX;
    this.y = enemyY[Math.round(Math.random()*2) ];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //the speed of the bugs
    this.x = this.x + (dt * Math.random()*500);

    //colliision mechanic

    if (this.x - playerX < 40 && this.x - playerX > -40
     && this.y - playerY <40 && this.y - playerY > -40) {
        restartplayer();
    };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //reset enemy after exiting board
    if (this.x > 500) {
        //restartbug();  //why isnt the stupid function not working
        this.x = -100
        this.y = enemyY[Math.round(Math.random()*2) ];
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//creates the player class
var Player = function() {

    //picture of player
    this.sprite = 'images/char-boy.png';
    //sets location to global variables defined above
    this.x = playerX;
    this.y = playerY;
};

// updates the players position, dt is a time variable between ticks
Player.prototype.update = function(dt) {
    this.x = playerX;
    this.y = playerY;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a switch that handles the arrow keys on a case by case basis
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            //if player goes above Y axis at 30px (water)
            if (playerY < 30) {
                //send player back to beginning
                restartplayer();
                //get element with 'winner' id from html file
                element = document.getElementById("winner");
                //write the phrase into the element selected above
                element.innerHTML = 'Congratulations, you reached the water. You win!!';
            }
            else {
                playerY = playerY - 90;
            }
            break;
        case 'down':
            //if player goes past 300px down
            if (playerY > 380) {
                //send him back to the beginning
                restartplayer();
            }
            else {
                playerY = playerY + 90;
            }
            break;
        case 'left':
            if (playerX < 30) {
                restartplayer();
            }
            else {
                playerX = playerX - 100;
            }
            break;
        case 'right':
            if (playerX > 350) {
                restartplayer();
            }
            else {
                playerX = playerX + 100;
            }
            break;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//initiate all 4 enemies objects
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

//initiate the player object
var player = new Player();