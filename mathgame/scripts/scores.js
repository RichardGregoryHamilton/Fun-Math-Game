/* This JavaScript file is for dealing with scores */

$('#my-header').load('header.html');

var oldScores = JSON.parse(localStorage['mathScores']);

var sorted = oldScores.sort(function(scoreA, scoreB) {
    return scoreB - scoreA;
});

// Update the score, remove expressions and generate new ones. Check for level increase
function incrementScore() {
    score++;
    $('.exp1, .exp2').remove();
    gameLoop();
    incrementLevel();
}

function addScore() {

    if (scores.indexOf(score) == -1) {
        scores.push(score);
    }

    var newScores = oldScores.concat(scores);
    newScores = makeUnique(newScores);
    localStorage['mathScores'] = JSON.stringify(newScores);

    // Scores are being added twice to the total score. We have to divide the score by 2.
    var newTotal = Number(localStorage['mathTotalScore']) + Math.ceil(score / 2);
    localStorage['mathTotalScore'] = newTotal;
}

function highScore() {
    var prevHigh = Math.max.apply(Math, oldScores);
    var highScore = Math.max.apply(Math, scores);
    return Math.max(prevHigh, highScore, score);
}

function updateStats() {
    $('#level').html("<strong>Level: </strong>" + level +
                     "<span id='score'>Score: " + score +
                     "</span><span id='high-score'> High Score: " + highScore() + "</span>");
}

// Fill in the High Scores table
$('#scores-table td:last-child').each(function(index) {
    $(this).html(sorted[index] || '');
});
