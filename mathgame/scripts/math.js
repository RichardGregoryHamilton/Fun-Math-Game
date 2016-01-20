var gameStart = false;
var score = 0;
var level = 1;

var scores = [0];

var colors = ['#FF0000', '#660000', '#FF3300', '#FF9900', '#003300',
              '#000033', '#660033', '#FF0033', '#383838'];
var operators = ['+', '-', '*', '/'];

/* User data is stored through localStorage */

function checkStorage(key) {
    if (!localStorage[key]) {
        localStorage[key] = JSON.stringify([]);
    }
}

checkStorage('mathAchievements');
checkStorage('mathScores');

if (!localStorage['mathGamesPlayed']) {
    localStorage['mathGamesPlayed'] = 0;
}

if (!localStorage['mathTotalScore']) {
    localStorage['mathTotalScore'] = 0;
}

$('.my-header').load('header.html');

/* Hides achievement notifications at the start of games */
$('#notification').css({ 'visibility': 'hidden' });

// Creates the buttons
function createButtons() {
    $('#controls').append("<button class='greaterThan'>" + ">" + "</button>");
    $('#controls').append("<button class='equals'>=</button>")
    $('#controls').append("<button class='lessThan'>" + "<" + "</button>")
}

function incrementLevel() {
    level = Math.ceil(score / 10);
    addAchievement(level);
    updateStats();
}

// Functions for each of the three choices
$('body').on('click', '.lessThan', function() {
    $('.exp1').data('result') < $('.exp2').data('result') ? incrementScore() : endGame();
});

$('body').on('click', '.equals', function() {
    $('.exp1').data('result') == $('.exp2').data('result') ? incrementScore() : endGame();
});

$('body').on('click', '.greaterThan', function() {
    $('.exp1').data('result') > $('.exp2').data('result') ? incrementScore() : endGame();
});

/*function updateStats() {
    $('#level').html("<strong>Level: </strong>" + level +
                     "<span id='score'>Score: " + score +
                     "</span><span id='high-score'> High Score: " + highScore() + "</span>");
}*/

function gameLoop() {
    generateExpressions();
    animateDivs();
    updateStats();
}

function resetGame() {
    gameStart = true;
    score = 0;
    level = 1;
    gameLoop();
    createButtons();
}

function startGame() {
    if (gameStart) {
        return false;                         // Prevent pressing new game twice
    }
    else {
        localStorage['mathGamesPlayed'] = ++localStorage['mathGamesPlayed'];
        resetGame();
    }
}

function endGame() {
    $('.exp1, .exp2, .lessThan, .equals, .greaterThan').remove();
    gameStart = false;
    addScore();
}

// This starts the five second clock where you must make a move
function animateDivs() {
    $('.exp2').animate( { 'marginRight': '70%' }, 5000);
    var prevScore = score;
    setTimeout(function() {
        if (score == prevScore) {
            endGame()
        }
    }, 5000);
}
