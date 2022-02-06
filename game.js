var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keypress(function () {
    if (!start) {
      $("h1").text("Level " + level);
      nextSequence();
      start = true;
    }
  });

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
 
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
  } else {
    var wrong=new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart ");    
      startOver();
  }
}


function nextSequence() {
    userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomnumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}
function startOver() {
   
    
     level = 0;
     gamePattern = [];
     start = false;
}