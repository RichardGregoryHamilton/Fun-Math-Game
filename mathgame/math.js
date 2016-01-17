var gameStart = false;
var score = 0;
var level = 1;

var scores = [0];
var achievements = [];
var colors = ['#FF0000', '#660000', '#FF3300', '#FF9900', '#003300',
              '#000033', '#660033', '#FF0033', '#383838'];
var operators = ['+', '-', '*', '/'];

/* This function stores a user's achievements over the length of a session */
if (!localStorage['achievements']) {
    localStorage['achievements'] = JSON.stringify([]);
}

if (!localStorage['scores']) {
    localStorage['scores'] = JSON.stringify([]);
}

/* Hides achievement notifications at the start of games */
$('#notification').css({ 'visibility': 'hidden' });

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

$('.example').each(function() {
    $(this).css({ 'color': 'white',
                  'background': randColor(),
                  'text-align': 'center',
                  'padding': '8px 0' });
});

function generateExpressions() {
    $('#game-block').append("<div class='exp1'>");
    $('#game-block').append("<div class='exp2'>");

    $('.exp1, .exp2').each(function() {
        $(this).css({ 'color': 'white',
                      'background': randColor(),
                      'text-align': 'center',
                      'padding': '8px 0' });

        if (level == 1) {
            $(this).html('' + randEasy() + ' + ' + randEasy());
        }
        else if (level == 2 || level == 3) {
            $(this).html('' + randMed() + ' + ' + randMed());
        }
        else if (level == 4 || level == 5) {
            $(this).html('' + randHard() + ' + ' + randHard());
        }
        else if (level == 6 || level == 7) {
            $(this).html('' + randHard() + ' ' + randOperation() + ' ' + randHard());
        }
        else {
            $(this).html('' + randExtreme() + ' ' + randOperation() + ' ' + randExtreme());
        }
        var expressions = $(this).html().split(' ');
        var leftNum = Number(expressions[0]);
        var operator = expressions[1];
        var rightNum = Number(expressions[2]);
        var result = '';

        switch(operator) {
            case '+':
                result = leftNum + rightNum;
                break;
            case '-':
                result = leftNum - rightNum;
                break;
            case '*':
                result = leftNum * rightNum;
                break;
            case '/':
                result = leftNum / rightNum;
                break;
        }

        $(this).data('result', result);
    });
}

// Creates the buttons
function createButtons() {
    $('#controls').append("<button class='greaterThan'>" + ">" + "</button>");
    $('#controls').append("<button class='equals'>=</button>")
    $('#controls').append("<button class='lessThan'>" + "<" + "</button>")
}

// Update the score, remove expressions and generate new ones. Check for level increase
function incrementScore() {
    score++;
    $('.exp1, .exp2').remove();
    gameLoop();
    incrementLevel();
}

function highScore() {
    var userScores = JSON.parse(localStorage["scores"]);
    var prevHigh = Math.max.apply(Math, userScores);
    var highScore = Math.max.apply(Math,scores);
    return Math.max(prevHigh, highScore);
}

// Updates the table rows in the achievements page
function updateAchievements() {
    var userAchievements = localStorage['achievements'];
    var nums = [];

    for (var i = 0; i < userAchievements.length; i++) {
        if (userAchievements[i].match(/\d/)) {
            nums.push(userAchievements[i]);
        }
    }

    $('tr').each(function(index) {
        var row = $(this);
        var name = row.eq(index).first('td').html();
        for (var i = 0; i < nums.length; i++) {
            if (name.match(nums[i])) {
                row.prop('class', 'unlocked');
            }
            else {
                row.prop('class', 'locked');
            }
        }
    });
}

// This function adds achievements indefinitely
function addAchievement(i) {
    var userAchievements = JSON.parse(localStorage['achievements']);
    var sessionAchievements = JSON.stringify(achievements);

    if (userAchievements.length == (i - 1)) {
        achievements.push('level' + i);
        if (userAchievements.length > achievements.length) {
            localStorage['achievements'] = localStorage['achievements'].replace(']', '') +
            (',' + sessionAchievements.replace('[', ''));
        }
        else {
            localStorage['achievements'] = sessionAchievements;
        }
        $('#notification').html('You have unlocked the achievement ' + achievements[achievements.length - 1]);
        $('#notification').css({ 'visibility': 'visible' });
        setTimeout(function() {
            $('#notification').css({ 'visibility': 'hidden' });
        }, 5000);
    }

}

function addScores() {
    scores.push(score);
    var userScores = JSON.parse(localStorage['scores']);
    var sessionScores = JSON.stringify(scores);
    if (userScores.length > scores.length) {
        localStorage['scores'] = localStorage['scores'].replace(']', '') +
        (',' + sessionScores.replace('[', ''));
    }
    else {
        localStorage['scores'] = sessionScores;;
    }
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

function updateStats() {
    $('#level').html("<strong>Level: </strong>" + level + "<span id='score'>Score: " +
    score + "</span><span id='high-score'> High Score: " + highScore() + "</span>");
}

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
        return false;
    }
    else {
        resetGame();
    }
}

// Fill in the High Scores table
$('#scores-table td:last-child').each(function(index) {
    var userScores = JSON.parse(localStorage['scores']).sort(function(scoreA,scoreB) {
        return scoreB - scoreA;
    });
    $(this).html(userScores[index] || '');
});

function endGame() {
    $('.exp1, .exp2, .lessThan, .equals, .greaterThan').remove();
    addScores();
    updateAchievements();
    gameStart = false;
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
