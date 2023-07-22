//3.create new array to contain the colours
var buttonColours = ["red", "blue", "green", "yellow"];
//5.new empty array
var gamePattern = [];
//11. new array to keep track of pattern clicked by the user
var userClickedPattern = [];

var started = false;
// 19.new variable level with 0 start value
var level = 0;
// 17. to detect if a keyboard key is pressed
$(document).keydown(function () {
    // 18. keep a track if the game has started or not then calling next sequence
    if (!started) {
        //20. change initial text to "Level 0" as the game starts
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
//9. jQuery to detect any buttons are clicked
$(".btn").click(function () {//handler function ".click"
    //10. new variable to store id of the button that got clicked
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // 13. sound plays on clicking the button
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
//23. check if game pattrn level equals the user pattern level then run nextSequence again
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        //24. check if their game pattern length is matching
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //25. check if it's wrong
        console.log("wrong");
        playSound("wrong");
        //26. adding game-over class so a colour blinks
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        //28. call the startOver function in case pattern goes wrong
        startOver();
    }


}

function nextSequence() {//1.creating the function
    userClickedPattern = [];
    //21. increasing level by 1 everytime nextSequence is called 
    level++;
    //22. update the h1 as game processes
    $("#level-title").text("Level " + level);
    //2. random number creation between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    //4. new variable randomChosenColour to select a random colour using randomNumber
    var randomChosenColour = buttonColours[randomNumber];
    //6. add the randomChosenCOlour to the end of the array gamePattern
    gamePattern.push(randomChosenColour);
    //7. using jQuery to select the button with the same id and animating the flash using fadeIn and fadeOut
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //8. play sound for the button colour selected
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    playSound(randomChosenColour);
}
// 12.function to playsound 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// 14.new function for animation of buttons
function animatePress(currentColour) {
    // 15. adding the class "pressed"
    $("#" + currentColour).addClass("pressed");
    // 16. to remove the pressed after 100ms
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
//27. new function created to initialise the values so it starts again
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}





