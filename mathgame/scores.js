// Fill in the High Scores table
$('#scores-table td:last-child').each(function(index) {
    var userScores = JSON.parse(localStorage['scores']).sort(function(scoreA,scoreB) {
        return scoreB - scoreA;
    });
    $(this).html(userScores[index] || '');
});