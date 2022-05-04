var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 90);
}

function playSoundPlayer(name){
    var audioPlayer = new Audio(`./sounds/${name}.mp3`);
    audioPlayer.play();
}

function playSound(){
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var audioGame = new Audio(`./sounds/${randomChosenColor}.mp3`);

    $(`#${randomChosenColor}`).fadeOut(50).fadeIn(50);
    audioGame.play();
    $("h1").text(`Level ${level}`);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                playSound();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        started = false;
        level = 0;
        gamePattern = [];
        playSoundPlayer("wrong");
    }
}


$("body").keypress(function(){
    console.log(started);
    if (started == false){
        playSound();
        started = true;
    }
})


$("div").click(function() {
    if ($(this).attr("type") === "button"){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSoundPlayer(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
})