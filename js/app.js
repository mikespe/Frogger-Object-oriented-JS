'use strict';

// Enemies our player must avoid
var Enemy = function() {

    // enemy starting x and potential y coordinates

    this.enemyX = -100;
    this.enemyY = [55, 150, 225];


    this.speed = Math.random()*15;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //sets each individual bug to the enemyX and one of 3 y's
    this.x = this.enemyX;
    this.y = this.enemyY[Math.round(Math.random() * 2)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //the speed of the bugs

    this.x = this.x + this.speed;
    //colliision mechanic

    if (this.x - player.x < 40 && this.x - player.x > -40 &&
        this.y - player.y < 40 && this.y - player.y > -40) {
        player.restart();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //reset enemy after exiting board
    if (this.x > 500) {
        this.restart(); //why isnt the stupid function not working
        //this.x = -100
        //this.y = enemyY[Math.round(Math.random()*2) ];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//restart bugs back to left
Enemy.prototype.restart = function() {
    this.x = -100;
    this.y = this.enemyY[Math.round(Math.random() * 2)];
};

//creates the player class
var Player = function() {

    // player starting coordinates

    this.playerX = 200;
    this.playerY = 385;
    //picture of player
    this.sprite = 'images/char-boy.png';
    //sets location to global variables defined above
    this.x = this.playerX;
    this.y = this.playerY;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// updates the players position, dt is a time variable between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
//setting number of lives and appending the variable to the top of the page

Player.prototype.restart = function() {
    this.x = 200;
    this.y = 385;
};

// a switch that handles the arrow keys on a case by case basis
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            //if player goes above Y axis at 30px (water)
            if (this.y < 30) {
                //send player back to beginning
                this.restart();
                //get element with 'winner' id from html file
                var element = document.getElementById("winner");
                //write the phrase into the element selected above
                element.innerHTML = 'Congratulations, you reached the water. You win!!';
                element.style.cssText = "margin-top: 40px;margin-bottom: -35px;";
            } else {
                this.y = this.y - 90;
            }
            break;
        case 'down':
            //if player goes past 300px down
            if (this.y > 380) {
                //send him back to the beginning
                this.restart();
            } else {
                this.y = this.y + 90;
            }
            break;
        case 'left':
            if (this.x < 30) {
                this.restart();
            } else {
                this.x = this.x - 100;
            }
            break;
        case 'right':
            if (this.x > 350) {
                this.restart();
            } else {
                this.x = this.x + 100;
            }
            break;
    }
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

document.addEventListener('click', function (event) {

    // If the clicked element doesn't have the right selector, bail
    if (event.target.matches('.arrow')) {
        event.preventDefault();
        console.log(event.target.id);
        player.handleInput(event.target.id);
    }

}, false);

//initiate all 4 enemies objects
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

//initiate the player object
var player = new Player();
