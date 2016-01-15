var scoreIndicator = document.getElementById("score");
var levelIndicator = document.getElementById("level");
var gameBlock = document.getElementsByClassName("game-block")[0];
var controls = document.getElementsByClassName("controls")[0];

var score = 0;
var level = 1;

var colors = ["red", "orange", "yellow", "green", "lightblue"];

var easyNums = [];
var medNums = [];
var hardNums = [];
var extremeNums = [];
var operators = ["+", "-", "*", "/"];

for (var i = 1; i <= 10; i++) {
    easyNums.push(i);
    medNums.push(i);
    medNums.push(-i);
    hardNums.push(i);
    hardNums.push(-i);
    extremeNums.push(i);
    extremeNums.push(-i);
}

for (var i = 11; i < 20; i++) {
    medNums.push(i);
    medNums.push(-i);
    hardNums.push(i);
    hardNums.push(-i);
    extremeNums.push(i);
    extremeNums.push(-i);
}

for (var i = 21; i < 100; i++) {
    hardNums.push(i);
    hardNums.push(-i);
    extremeNums.push(i);
    extremeNums.push(-i);
}

for (var i = 100; i < 1000; i++) {
    extremeNums.push(i);
    extremeNums.push(-i);
}

function randEasy() {
    return easyNums[Math.floor(Math.random() * easyNums.length)];
}

function randMed() {
    return medNums[Math.floor(Math.random() * medNums.length)];
}

function randHard() {
    return hardNums[Math.floor(Math.random() * hardNums.length)];
}

function randExtreme() {
    return extremeNums[Math.floor(Math.random() * extremeNums.length)];
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

function createButtons() {
    var buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";
    controls.appendChild(buttonGroup);
    
    var greaterThan = document.createElement("button");
    greaterThan.classList.add("greaterThan");
    var equals = document.createElement("button");
    equals.classList.add("equals");
    var lessThan = document.createElement("button");
    lessThan.classList.add("lessThan");
    
    greaterThan.innerHTML = ">";
    equals.innerHTML = "=";
    lessThan.innerHTML ="<";
    
    buttonGroup.appendChild(greaterThan);
    buttonGroup.appendChild(equals);
    buttonGroup.appendChild(lessThan);
}

function incrementScore() {
    score++;
    scoreIndicator.innerHTML = "<strong>Score: </strong>" + score;
    $(".exp1, .exp2").remove();
    generateExpressions();
    animateDivs();
    incrementLevel();
}

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
     levelIndicator.innerHTML = "<strong>Level: </strong>" + level;
}

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
    score = 0;
    level = 1;
    generateExpressions();
    animateDivs();
    scoreIndicator.innerHTML ="<strong>Score: </strong>" + score;
    levelIndicator.innerHTML = "<strong>Level: </strong>" + level;
    createButtons();
}

function endGame() {
    $(".exp1, .exp2, .lessThan, .equals, .greaterThan").remove();
}

function animateDivs() {
    $(".exp1").animate( { "marginLeft": "215px" }, 5000);
    $(".exp2").animate( { "marginRight": "215px" }, 5000);
    var previousScore = score;
    setTimeout(function() {
    if (score == previousScore) {
        endGame()
    }
  }, 5000);
}
