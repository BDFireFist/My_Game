//  function Boy_Actions (event) {
//   alert (event.which)
// }
//to this line you can delete "//" marks to identify the keycode of a keypress to customize to your taste.
// keys : d==100 / w==119 / a==97 / s==115

// KeyBinds for the Boy
var runStart = 0;
var runKey = 68; // this for easier configuration of for later changes
var jumpKey = 87;
var escapeKey = 27;
var boyRunSpeed = 100;
var blockSpeed = 100;
var jumpSpeed = 90;
var backgroundMusic = new Audio("Background Music.mp3")
backgroundMusic.loop = true;
function keyCheck(event) {
    if (event.which == runKey) {
        backgroundMusic.play();
        if (createBlockId == 0) { createBlockId = setInterval(createBlock, 100) }
        if (moveBlockId == 0) { moveBlockId = setInterval(moveBlock, blockSpeed); }
        if (runWorkerId == 0) { runWorkerId = setInterval(run, boyRunSpeed); }
        runStart = 1;
        if (runSoundId == 0) { runSound.play(); }
        if (backgroundWorkerId == 0) { backgroundWorkerId = setInterval(moveBackground, 100); }

        if (scoreWorkerId == 0) { scoreWorkerId = setInterval(updateScore, 100); }
        document.getElementById("esc").style.visibility = "hidden";
    }
    if (event.which == jumpKey) {
        if (runStart == 1) {
            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump, jumpSpeed);
                jumpSound.play();
                if (jumpSoundId == 0) { jumpSound.play() }

            }
        }
    }
    if (event.which == escapeKey) {
        if (runStart == 1) {
            backgroundMusic.pause();
            runSound.pause();
            runSoundId = -1;
            clearInterval(runWorkerId);
            runWorkerId = 0;
            clearInterval(jumpWorkerId);
            clearInterval(backgroundWorkerId);
            backgroundWorkerId = 0;
            clearInterval(moveBlockId);
            moveBlockId = 0;
            clearInterval(createBlockId);
            createBlockId = 0;
            clearInterval(scoreWorkerId)
            scoreWorkerId = 0;
            document.getElementById("esc").style.visibility = "visible";
            document.getElementById("esc").innerHTML = "Paused";

            if (event.which == runKey) {
                document.getElementById("esc").style.visibility = "hidden";
                backgroundMusic.play();
                if (createBlockId == 0) { createBlockId = setInterval(createBlock, 100) }
                if (moveBlockId == 0) { moveBlockId = setInterval(moveBlock, blockSpeed); }
                if (runWorkerId == 0) { runWorkerId = setInterval(run, boyRunSpeed); }
                runStart = 1;
                if (runSoundId == 0) { runSound.play(); }
                if (backgroundWorkerId == 0) { backgroundWorkerId = setInterval(moveBackground, 100); }
                if (scoreWorkerId == 0) { scoreWorkerId = setInterval(updateScore, 100); }
            }
        }
    }
}


//Create Blocks
var blockMarginLeft = 600;
var blockId = 1;
var createBlockId = 0;
function createBlock() {
    var block = document.createElement("div"); /* by the command, you specify the tag to be created on command of enter ky and the "document.createElement" is meant to create tags in JS*/
    block.className = "block"; // by doing this we assign a class to the above created element.

    block.id = "block" + blockId;
    blockId++; // blockId = blockId + 1;

    var gap = Math.random() * (1000 - 400) + 400; // this randomize the block gap
    blockMarginLeft = blockMarginLeft + gap; // this is the linking part which basically adds the before set value of 600(the primary distance between 2 blocks) to the later added randomized value.

    block.style.marginLeft = blockMarginLeft + "px"; // this part is what actually does the executing the marginLeft and declare the value is a pixel value by adding "px" to the end.
    document.getElementById("background").appendChild(block); // we use "appendchilde" to put a tag which is created in somewhere, inside to another tag. This command is equal to "div class="block"></div" //
}

// Move Block
var moveBlockId = 0;
function moveBlock() {
    for (var i = 1; i <= blockId; i++) { // this means that the variable "i" is assigned to 1 and if the before set "blockId" is bigger of equal to "i" value, then start the loop, and after each run add a "i" value to "i" and con 

        var currentBlock = document.getElementById("block" + i);

        var currentMarginLeft = currentBlock.style.marginLeft;

        var newMarginLeft = parseInt(currentMarginLeft) - 20; //the "parseInt" function converts strings(20px) to numbers (20).

        currentBlock.style.marginLeft = newMarginLeft + "px";

        /*  To get the margin left values type "alert(newMarginLeft)" and when the boy touch the block and get past the block  */
        if (newMarginLeft <= 237) {
            if (newMarginLeft >= 165) {
                if (boyMarginTop >= 454) {
                    //use "alert(boyMarginTop)" to find the value that touch the block
                    // this means that if boyMarginTop is less or equal to 410 then execute the below commands
                    clearInterval(runWorkerId);
                    runSound.pause();
                    runSoundId = -1;
                    clearInterval(jumpWorkerId);
                    jumpWorkerId = -1;
                    clearInterval(backgroundWorkerId);
                    clearInterval(moveBlockId);
                    clearInterval(createBlockId);
                    clearInterval(scoreWorkerId)

                    deadWorkerId = setInterval(dead, 100);
                    backgroundMusic.volume = 0.4;
                    deadSound.play();

                }
            }
        }
    }
}
//for loop

/*
for(var i;i<10;i++){
    commands;
}

in here "for" is a keyword that can't be changed.
1. in the for loop create a variable and assign a value to it.
2. the "i<10" is the condition and only whe the condition is true, we can access the command in "{}".(command will run only when the condition is true.)
3. after we execute the "}", we will start the "{" again.
4. "i++" change the value of the variable, after changing the value of the variable it will go through the loop agin.
*/

var runSound = new Audio("run.mp3");
runSound.volume = 0.5;
runSound.loop = true;
var runSoundId = 0;

// Run function
var boy = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;
function run() {
    runImageNumber++;
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    boy.src = "Run (" + runImageNumber + ").png";
}

var jumpSound = new Audio("jump.mp3");
jumpSound.volume = 0.6;
var jumpSoundId = 0;

//jump function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 550;
var jumGap = "35px";
function jump() {
    jumpImageNumber++;
    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 40;
        boy.style.marginTop = boyMarginTop + "px";
    }
    boy.style.marginLeft = jumGap
    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 40
        boy.style.marginTop = boyMarginTop + "px";
    }
    boy.style.marginLeft = jumGap
    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, boyRunSpeed);
        runSound.play();
    }
    boy.src = "Jump (" + jumpImageNumber + ").png"
}

// The pause function




// Background Move
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground() {
    backgroundX = backgroundX - 20.
    background.style.backgroundPositionX = backgroundX + "px";
}

// Score update
var score = document.getElementById("score");
var newscore = 0;
var scoreWorkerId = 0;
function updateScore() {
    newscore++;
    score.innerHTML = newscore;

}

var deadSound = new Audio("dead.mp3");
deadSound.volume = 1.0;
//Dead function
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead() {
    deadImageNumber++;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;

        boy.style.marginTop = "550px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newscore;
    }
    boy.src = "Dead (" + deadImageNumber + ").png";
}

// Restart function
function re() {
    location.reload(); // this "location" command resets the code (refresh)
}