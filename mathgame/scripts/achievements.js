/* This JavaScript file deals with achievements */

$('#my-header').load('header.html');

var allScoreAchievements = [{ 'name': 'score100', 'value': 100 },
                            { 'name': 'score200', 'value': 200 },
                            { 'name': 'score500', 'value': 500 },
                            { 'name': 'score1000', 'value': 1000 }];

var levelAchievements = [];
var scoreAchievements = [];
var gamesPlayedAchievements = [];

var achievements = JSON.parse(localStorage['mathAchievements']);
var gamesPlayed = Number(localStorage['mathGamesPlayed']);
var totalScore = Number(localStorage['mathTotalScore']);
var levelAchievements2 = achievements.filter(function(a) { return a.indexOf('level') > -1 });
var numAchievements = levelAchievements2.length;

function makeUnique(array) {
    return array.filter(function(element, index) {
        return array.indexOf(element) == index;
    });
}

function showNotification() {
    $('#notification').css({ 'visibility': 'visible' });
    setTimeout(function() {
        $('#notification').css({ 'visibility': 'hidden' });
    }, 5000);
}

function addLevelAchievements() {
    var achievement = 'level' + level;
    if (levelAchievements.indexOf(achievement) < 0 && oldAchievements.indexOf(achievement) < 0) {
        levelAchievements.push(achievement);
        if (level < 7) {
            $('#notification').html('You have unlocked the achievement ' + achievement);
            showNotification();
        }
    }
}

function addScoreAchievements() {
    var totalScore = Number(localStorage['mathTotalScore']);
    for (var i = 0; i < allScoreAchievements.length; i++) {
        var achievement = allScoreAchievements[i];
        if (scoreAchievements.indexOf(achievement.name) == -1 && oldAchievements.indexOf(achievement.name) == -1) {
            if (totalScore > achievement.value) {
                scoreAchievements.push(achievement.name);
                $('#notification').html('You have unlocked the achievement ' + 'score' + achievement.value);
                showNotification();
            }
        }
    }
}

function addAchievement(level) {
    oldAchievements = JSON.parse(localStorage['mathAchievements']);

    addLevelAchievements();
    addScoreAchievements();

    var newAchievements = oldAchievements.concat(levelAchievements).concat(scoreAchievements);
    newAchievements = makeUnique(newAchievements);
    localStorage["mathAchievements"] = JSON.stringify(newAchievements);
}

/* Update the achievements in the achievements table based on their class */

$(".level").each(function() {
    var index = $(this).html().match(/\d/)[0];
    $(this).parent().prop('class', index <= numAchievements ? 'unlocked': 'locked');
});

$('.games-played').each(function() {
    var gamesRequired = $(this).next().html().match(/\d+/)[0];
    $(this).parent().prop('class', gamesPlayed >= gamesRequired ? 'unlocked' : 'locked');
});

$('.total-score').each(function() {
    var scoreRequired = $(this).next().html().match(/\d+/)[0];
    $(this).parent().prop('class', totalScore >= scoreRequired ? 'unlocked' : 'locked');
});
