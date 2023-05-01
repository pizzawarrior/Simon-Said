

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];


    //init sound functionality corresponding to button colors
function playSound(name) {
    var audio = new Audio( "sounds/" + name + ".mp3");
    audio.play();
    }

    //init animation to the clicked buttons
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

//The target retains its default props until a keydown is detected. Once that happens its status changes.
var started = false;
//create new var called level, set value to 0
var level = 0;

//GAME START:
//detect first keydown, call nextSequence 
$(document).keydown(function() {
    if (!started) {
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;
    }
});

//'Computer' picks random button
function nextSequence() {
    //add 1 to level each time a click is detected
    level++;
    //update the H1 HTML with corresponding level number each time a click is detected
    $('#level-title').text("Level " + level);

    //generate random num to be passed as the index of buttonColor
    var randomNumber = Math.round(Math.random() * 3);
    //console.log(randomNumber);
    
    //pick random color square
    var randomChosenColor = buttonColors[randomNumber];
    //console.log(randomChosenColor);
    
    //push random color to gamePattern
    gamePattern.push(randomChosenColor);
    
    //very clever here: 'select button with same id as random color'-- concat the id tag with randomChosenColor and it will select the button
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    }


// Listen for button click from user
$(".btn").click(function() {
    //store the id of the button that got clicked: very COOL
   var userChosenColor = $(this).attr('id');
    //push id of button pressed as value in array
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
   
    playSound(userChosenColor);
    animatePress(userChosenColor);

    //Call checkAnswer() after a user has clicked a button, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length -1);
});

//Compare user button click to computer selected button
function checkAnswer(currentLevel) {
    //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //console.log("success");

        //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {
        //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
            nextSequence();
        }, 1000);
    }

    } else {
        //console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

    //reset after game over:
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
};