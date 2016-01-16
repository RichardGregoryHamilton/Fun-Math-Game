var gameBlock = document.getElementsByClassName("game-block")[0];
var controls = document.getElementsByClassName("controls")[0];

var gameStart = false;
var score = 0;
var level = 1;
var scores = [0];

var colors = ["red", "orange", "gold", "green", "lightblue"];
var operators = ["+", "-", "*", "/"];

$("#game-help").hide();

// These functions return random numbers based on the level
function randEasy() {
    return Math.floor(Math.random() * 10);
}

function randMed() {
    return Math.random() > 0.5 ? Math.floor(Math.random() * 20) : Math.floor(Math.random() * -20);
}

function randHard() {
    return Math.random() > 0.5 ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * - 100);
}

function randExtreme() {
    return Math.random() > 0.5 ? Math.floor(Math.random() * 1000) :
    Math.floor(Math.random() * -1000);
}

function randOperation() {
    return operators[Math.floor(Math.random() * operators.length)];
}

function randColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateExpressions() {
    var exp1 = document.createElement("div");
    var exp2 = document.createElement("div");

    [exp1, exp2].forEach(function(exp,index) {
        exp.classList.add("exp" + (index + 1));
        exp.style.color = "white";
        exp.style.background = randColor();
        exp.style.textAlign = "center";
        exp.style.padding = "8px 0";
        gameBlock.appendChild(exp);

        // The expressions generated depend on the level. This is an arcade game
        if (level == 1) {
            exp.innerHTML = "" + randEasy() + " + " + randEasy();
        }
        else if (level == 2 || level == 3) {
            exp.innerHTML = "" + randMed() + " + " + randMed();
        }
        else if (level == 4 || level == 5) {
            exp.innerHTML = "" + randHard() + " + " + randHard();
        }
        else if (level == 6 || level == 7) {
            exp.innerHTML = "" + randHard() + randOperation() + randHard();
        }
        else {
            exp.innerHTML = "" + randExtreme() + randOperation() +
            randExtreme();
        }
    });

}

// Creates the buttons
function createButtons() {

    var greaterThan = document.createElement("button");
    greaterThan.classList.add("greaterThan");
    var equals = document.createElement("button");
    equals.classList.add("equals");
    var lessThan = document.createElement("button");
    lessThan.classList.add("lessThan");

    greaterThan.innerHTML = ">";
    equals.innerHTML = "=";
    lessThan.innerHTML ="<";

    controls.appendChild(greaterThan);
    controls.appendChild(equals);
    controls.appendChild(lessThan);
}

// Update the score, remove expressions and generate new ones. Check for level increase
function incrementScore() {
    score++;
    $("#level").html("<strong>Level: </strong>" + level + "<span id='score'>Score: " +
    score + "</span><span id='high-score'> High Score: " + highScore() + "</span>");
    $(".exp1, .exp2").remove();
    generateExpressions();
    animateDivs();
    incrementLevel();
}

function highScore() {
    return Math.max.apply(Math,scores);
}

// There are multiple conditionals so a switch statement works best here
function incrementLevel() {
     switch(true) {
         case (score < 10):
             level = 1;
             break;
         case (score >= 10 && score < 20):
             level = 2;
             break;
         case (score >= 20 && score < 30):
             level = 3;
             break;
         case (score >= 30 && score < 40):
            level = 4;
            break;
         case (score >= 40 && score < 50):
            level = 5;
            break;
         case (score >= 50):
            level = 6;
            break;
     }
     $("#level").html("<strong>Level: </strong>" + level + "<span id='score'>Score: " +
     score + "</span><span id='high-score'> High Score: " + highScore() + "</span>");
}

// Functions for each of the three choices
$("body").on("click", ".lessThan", function() {
    var num1 = eval($(".exp1").text());
    var num2 = eval($(".exp2").text());
    (num1 < num2) ? incrementScore() : endGame();
});

$("body").on("click", ".equals", function() {
    var num1 = eval($(".exp1").text());
    var num2 = eval($(".exp2").text());
    (num1 == num2) ? incrementScore() : endGame();
});

$("body").on("click", ".greaterThan", function() {
    var num1 = eval($(".exp1").text());
    var num2 = eval($(".exp2").text());
    (num1 > num2) ? incrementScore() : endGame();
});

function startGame() {
    if (gameStart) {
        return false;
    }
    else {
        gameStart = true;
        score = 0;
        level = 1;
        generateExpressions();
        animateDivs();
        $("#level").html("<strong>Level: </strong>" + level + "<span id='score'>Score: " + score + "</span><span id='high-score'> High Score: " + highScore() + "</span>");
        createButtons();
    }
}

function endGame() {
    $(".exp1, .exp2, .lessThan, .equals, .greaterThan").remove();
    scores.push(score);
    gameStart = false;
}

function showRules() {
    $("#game-help").toggle();
}

// This starts the five second clock where you must make a move
function animateDivs() {
    $(".exp2").animate( { "marginRight": "70%" }, 5000);
    var previousScore = score;
    setTimeout(function() {
    if (score == previousScore) {
        endGame()
    }
  }, 5000);
}
