var gamePattern=[];
var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

var level=0;
var started=false;

$(document).on("keydown",function(){
    if(started===false){
        newSequence();
        started=true;
    }
});

function newSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var n=Math.floor(Math.random()*4);

    var randomChoosenColor=buttonColors[n];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);
}

$(".btn").click(function(){
    var userChoosenColor=this.id;
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer((userClickedPattern.length)-1);
})

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        
        var wrongaudio=new Audio("./sounds/wrong.mp3");
        wrongaudio.play();
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startover();
        $("#level-title").text("Game over, press any key to restart");
    }
}

function startover(){
    level=0;
    started=false;
    gamePattern=[];
}