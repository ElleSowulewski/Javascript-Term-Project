// set variables and interval
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

setInterval(draw, 10);

var ballx = canvas.width/2;
var bally = canvas.height - 80;
var movex = 2;
var movey = -2;
var score = 0;
var level = 1;
var scale = 0;
var paddleWidth = 100;
var paddleHeight = 20;
var paddlex = (canvas.width-paddleWidth) /2;
var rightMove = false;
var leftMove = false;
var brickRows = 5;
var brickColumns = 7;
var brickWidth = 80;
var brickHeight = 30;
var brickGap = 8;
var brickMargin = 40;

// make bricks in an array
var bricks = [];
for (column=0; column<brickColumns; column++){
    bricks[column] = [];
    for (row=0; row<brickRows; row++){
        bricks[column][row] = {x:0, y:0, broken: 1};
    }
}

// event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// key down event functions
function keyDown(event){
    // if key 39(<-) or key 68(a) is pressed move right
    if (event.keyCode == 39 || event.keyCode == 68){
        rightMove = true;
    }
    // if key 37(->) or key 65(d) is pressed move left
    else if (event.keyCode == 37 || event.keyCode == 65){
        leftMove = true;
    }
}

function keyUp(event){
    // stop moving right if key 39(<-) or key 68(a) is no longer pressed
    if (event.keyCode == 39 || event.keyCode == 68){
        rightMove = false;
    }
    // stop moving left if key 37(->) or key 65(d) is no longer pressed
    else if (event.keyCode = 37 || event.keyCode == 65){
        leftMove = false;
    }
}

// draws a red pong ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballx, bally, 10, 0, Math.PI*2, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// draws a blue paddle (player)
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddlex, canvas.height - 30, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// draw the bricks in the array
function drawBricks(){
    for (column=0; column<brickColumns; column++){
        for (row=0; row<brickRows; row++){     
            // only draw bricks if broken is equal to 1      
            if(bricks[column][row].broken == 1){
                var brickx = (column*(brickWidth+brickGap))+brickMargin;
                var bricky = (row*(brickHeight+brickGap))+brickMargin;
                bricks[column][row].x = brickx;
                bricks[column][row].y = bricky;
                ctx.beginPath();
                ctx.rect(brickx, bricky, brickWidth, brickHeight);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
            }
        } 
    }
}

// draw the points and level text
function drawInfo(){
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Points: " + score, 8, 20);
    ctx.fillText("Level: " + level, canvas.width-75, 20);
}

// when player progresses to the next level
function reset(){
    // set all bricks in the array back to broken equals 1 
    // so they will be redrawn
    for (column=0; column < brickColumns; column++){
        for (row=0; row < brickRows; row++){
            bricks[column][row].broken = 1;    
        }
    }
    // reset ball location
    ballx = canvas.width/2;
    bally = canvas.height - 80;
    // set score to 0 again and increase level
    score = 0;
    level++;
    // increase scale, making ball move faster
    scale = scale + 1;
    movex = 2;
    movey = -2;
    movex = movex + scale;
    movey = movey - scale;
    // reset paddle location
    paddlex = (canvas.width-paddleWidth) /2;
}

// if player wins, reset and alert
function win(){
    if(score == 350){
        reset();
        alert("You Win!");
    }
}

// check if ball collides with brick
function brickCollision(){
    for (column=0; column < brickColumns; column++){
        for (row=0; row < brickRows; row++){
            var brick = bricks[column][row];
            // if brick is not broken
            if(brick.broken == 1){
                if(ballx > brick.x && ballx < brick.x+brickWidth && bally > brick.y && bally < brick.y + brickHeight){
                    // reverse ball movement, break brick, and increase score
                    movey = -movey;
                    brick.broken = 0;
                    score = score+10;
                }
                // player wins
                win();
            }
        }
    }
}

// check ball collisions
function ballCollisions(){
    // if ball hits ege of screen or paddle, reverse it's movement
    if(bally + movey < 10){
        movey = -movey
    }   
    else if (bally + movey > canvas.height-35){
        if(ballx > paddlex-20 && ballx < paddlex + paddleWidth){
            movey = -movey;
        }
        else if (bally + movey > canvas.height-10){
            // if ball hits bottom of the screen, player loses and reload page
            document.location.reload();
            alert("Game Over - You Lose");    
        }      
    }
    else if(ballx + movex > canvas.width || ballx + movex < 10){
        movex = -movex;
    }
    // check brick collisions
    brickCollision();
}

// moves paddle based on key events
function movePaddle(){
    if (rightMove && paddlex < canvas.width - paddleWidth){
        paddlex += 7;
    }
    if (leftMove && paddlex > 0){
        paddlex -= 7;
    }
}

// draw everything and set ball speed
function draw() {
    // clear the canvas after every frame
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawPaddle();
    drawBricks();
    drawInfo();
    drawBall();
    movePaddle();
    ballCollisions();
    ballx += movex;
    bally += movey;
}
