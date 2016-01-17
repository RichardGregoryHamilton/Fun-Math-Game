var gameBlock = document.getElementsByClassName("game-block")[0];

var gameStart = false;
var score = 0;
var level = 1;

var scores = [0];
var achievements = [];
var colors = ["red", "orange", "gold", "green", "lightblue"];
var operators = ["+", "-", "*", "/"];

/* This function stores a user's achievements over the length of a session */
if (!localStorage["achievements"]) {
    localStorage["achievements"] = JSON.stringify([]);
}

if (!localStorage["scores"]) {
    localStorage["scores"] = JSON.stringify([]);
}

/* Hides achievement notifications at the start of games */
$(".notification").css({ "visibility": "hidden" });

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

$(".example").each(function() {
    $(this).css({ "color": "white",
                  "background": randColor(),
                  "text-align": "center",
                  "padding": "8px 0" });
});

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
    $(".controls").append("<button class='greaterThan'>" + ">" + "</button>");
    $(".controls").append("<button class='equals'>=</button>")
    $(".controls").append("<button class='lessThan'>" + "<" + "</button>")
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
    var userScores = JSON.parse(localStorage["scores"]);
    var prevHighScore = Math.max.apply(Math, userScores);
    var highScore = Math.max.apply(Math,scores);
    return Math.max(prevHighScore, highScore);
}

// Updates the table rows in the achievements page
function updateAchievements() {
    var userAchievements = localStorage["achievements"];
    var numbers = [];

    for (var i = 0; i < userAchievements.length; i++) {
        if (userAchievements[i].match(/\d/)) {
            numbers.push(userAchievements[i]);
        }
    }

    $("tr").each(function(index) {
        var row = $(this);
        var name = row.eq(index).first("td").html();
        for (var i = 0; i < numbers.length; i++) {
            if (name.match(numbers[i])) {
                row.prop("class", "unlocked");
            }
            else {
                row.prop("class", "locked");
            }
        }
    });
}

// This function adds achievements indefinitely
function addAchievement(i) {
    var userAchievements = JSON.parse(localStorage["achievements"]);
    var sessionAchievements = JSON.stringify(achievements);

    if (userAchievements.length == (i - 1)) {
        achievements.push("level" + i);
        if (userAchievements.length > achievements.length) {
            localStorage["achievements"] = localStorage["achievements"].replace("]", "") +
            ("," + sessionAchievements.replace("[", ""));
        }
        else {
            localStorage["achievements"] = sessionAchievements;
        }
        $(".notification").html("You have unlocked the achievement " + achievements[achievements.length - 1]);
        $(".notification").css({ "visibility": "visible" });
        setTimeout(function() {
            $(".notification").css({ "visibility": "hidden" });
        }, 5000);
    }

}

function addScores() {
    scores.push(score);
    var userScores = JSON.parse(localStorage["scores"]);
    var sessionScores = JSON.stringify(scores);
    if (userScores.length > scores.length) {
        localStorage["scores"] = localStorage["scores"].replace("]", "") +
        ("," + sessionScores.replace("[", ""));
    }
    else {
        localStorage["scores"] = sessionScores;;
    }
}

// There are multiple conditionals so a switch statement works best here
function incrementLevel() {
    switch(true) {
        case (score < 10):
            level = 1;
            addAchievement(1);
            break;
        case (score >= 10 && score < 20):
            level = 2;
            addAchievement(2);
            break;
        case (score >= 20 && score < 30):
            level = 3;
            addAchievement(3);
            break;
        case (score >= 30 && score < 40):
            level = 4;
            addAchievement(4);
            break;
        case (score >= 40 && score < 50):
            level = 5;
            addAchievement(5);
            break;
         case (score >= 50):
            level = 6;
            addAchievement(6);
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
        $("#level").html("<strong>Level: </strong>" + level + "<span id='score'>Score: " +
        score + "</span><span id='high-score'> High Score: " + highScore() + "</span>");
        createButtons();
    }
}

// Fill in the High Scores table
$("#scores-table td:last-child").each(function(index) {
    var userScores = JSON.parse(localStorage["scores"]).sort(function(a,b) {
        return b - a;
    });
    $(this).html(userScores[index] || "");
});

function endGame() {
    $(".exp1, .exp2, .lessThan, .equals, .greaterThan").remove();
    addScores();
    updateAchievements();
    gameStart = false;
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
