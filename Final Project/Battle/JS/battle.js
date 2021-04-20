// set variables
var random;
var compRandom;
var playerDie1;
var playerDie2;
var playerTotal;
var compDice;
var compLives = 3;
var playerLives = 3;

// gets random number between 1 and 6 for the player
function getRandom(){
    random = Math.floor((Math.random() * 6) + 1);
    return random;
}

// gets a random number between 1 and 12 for the computer
function getCompRandom(){
    compRandom = Math.floor((Math.random() * 12) + 1);
    return compRandom;
}

// sets up the player lives and button visibility when page is loaded
function setUp(){
    document.getElementById("playerLives").innerHTML = playerLives;
    document.getElementById("compLives").innerHTML = compLives;
    document.getElementById("again").style.visibility = "hidden";
    document.getElementById("rollButton2").style.visibility = "hidden";
}

// gets the random number for the first die and sets the die image accordingly
function setDie1(){

    playerDie1 = getRandom();

    if (random == 1){
        document.getElementById("die1").src = "./Media/die-1.png";
    }
    if (random == 2){
        document.getElementById("die1").src = "./Media/die-2.png";
    }
    if (random == 3){
        document.getElementById("die1").src = "./Media/die-3.png";
    }
    if (random == 4){
        document.getElementById("die1").src = "./Media/die-4.png";
    }
    if (random == 5){
        document.getElementById("die1").src = "./Media/die-5.png";
    }
    if (random == 6){
        document.getElementById("die1").src = "./Media/die-6.png";
    }

    // hides the first roll button and shows the second
    document.getElementById("rollButton1").style.visibility = "hidden";
    document.getElementById("rollButton2").style.visibility = "visible";
}

// gets the random number for the second die and sets the die image accordingly
function setDie2(){

    playerDie2 = getRandom();
    
    if (random == 1){
        document.getElementById("die2").src = "./Media/die-1.png";
    }
    if (random == 2){
        document.getElementById("die2").src = "./Media/die-2.png";
    }
    if (random == 3){
        document.getElementById("die2").src = "./Media/die-3.png";
    }
    if (random == 4){
        document.getElementById("die2").src = "./Media/die-4.png";
    }
    if (random == 5){
        document.getElementById("die2").src = "./Media/die-5.png";
    }
    if (random == 6){
        document.getElementById("die2").src = "./Media/die-6.png";
    }

    // hides the second roll button
    document.getElementById("rollButton2").style.visibility = "hidden";
    // adds the players 2 rolls together
    playerTotal = playerDie1 + playerDie2;
    // calls the battle function
    Battle();
}

// check if the player has won or lost
function checkWinLose(){
    // player loses if their lives are zero
    if (playerLives == 0){
        alert("Game Over - You Lose!");
        document.location.reload();
    }
    // player wins if computer lives are zero
    if (compLives == 0){
        alert("You Win!");
        document.location.reload();
    }
}

// compares the player's result to the computer's result
function Battle(){
    // get computer's result
    compDice = getCompRandom();

    // if computer result is greater than player
    if (compDice > playerTotal){
        playerLives = playerLives- 1;
        // set image accordingly
        document.getElementById("battles").src = "./Media/battle-2.png";
    }
    // if player result is greater than computer
    if (compDice < playerTotal){
        compLives = compLives- 1;
        // set image accordingly
        document.getElementById("battles").src = "./Media/battle-3.png";
    }
    // if player and computer result is the same
    if(compDice == playerTotal){
        // set image accordingly
        document.getElementById("battles").src = "./Media/battle-4.png";
    }

    // show updated lives
    document.getElementById("playerLives").innerHTML = playerLives;
    document.getElementById("compLives").innerHTML = compLives;

    // show play again button
    document.getElementById("again").style.visibility = "visible";

    // check if player has won or lost
    checkWinLose();
}

// resets buttons and battle image when again button is pressed
function reset(){
    document.getElementById("battles").src = "./Media/battle-1.png";
    document.getElementById("again").style.visibility = "hidden";
    document.getElementById("rollButton1").style.visibility = "visible";
}