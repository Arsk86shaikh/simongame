var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});

var started =false;
var level =0;
$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        console.log("Great");

    
    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function(){
            nextSequence();
        },1000)
    }
}
    else{
        playSound("wrong");
        $("body").addClass("game-over ");
        setTimeout(function() {
            $("body").removeClass("game-over ")
        },200);

        $("#level-title").text("Game over press any key to restart")
        startover();
    }
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;

}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name)
{
    var audio=new Audio (name+".mp3");
    audio.play();
}


function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");

    },100)
}