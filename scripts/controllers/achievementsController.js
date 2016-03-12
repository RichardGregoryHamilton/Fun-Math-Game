angular.module('mathGame')
    .controller('achievementsController', ['$scope', '$timeout', 'Game', function($scope, $timeout, Game) {

        var achievementMessage = 'You have unlocked the achievement ';
        var allScoreAchievements = [];

        [100, 200, 500, 1000].forEach(function(number, index) {
            allScoreAchievements[index] = { 'name': 'Score ' + number, 'value': number };
        });

        function showNotification() {
            $('#notification').css({ 'visibility': 'visible' });
            setTimeout(function() {
                $('#notification').css({ 'visibility': 'hidden' });
            }, 5000);
        }
        
        function addAchievement(level) {
            var achievements = JSON.parse(localStorage['achievements']); 
            var totalScore = Number(localStorage['totalScore']);
            var achievement = 'Level ' + level ;
            
            if (achievements.length) {
                if (!achievements.includes(achievement)) {
                    localStorage['achievements'] = localStorage['achievements'].replace(']', ',\"') + achievement + "\"" + ']';
                    $('#notification').html(achievementMessage + achievement);
                    showNotification();
                }
                
                for (var i = 0; i < allScoreAchievements.length; i++) {
                    var achievement = allScoreAchievements[i];
                    if (!achievements.includes(achievement.name) && totalScore > achievement.value) {
                        localStorage['achievements'] = localStorage['achievements'].replace(']', ',\"') + achievement.name + "\"" + ']';
                        $('#notification').html(achievementMessage + achievement.name);
                        showNotification();
                    }
                }
            }
             newAchievements = makeUnique(JSON.parse(localStorage['achievements']));
            localStorage['achievements'] = JSON.stringify(achievements.length ? newAchievements: [achievement]);
        }
        
        var levels = [11, 21, 31, 41, 51, 61];
        var gameMilestones = [
                                { 'number': 1, 'name': 'Novice' },
                                { 'number': 5, 'name': 'Beginner' },
                                { 'number': 10, 'name': 'Journeyman' },
                                { 'number': 20, 'name': 'Master' },
                                { 'number': 30, 'name': 'Grand Master' }
                            ];
        
        $scope.$watch(function() {
            return Game.score;
            }, function(newVal, oldVal) {
            if (levels.includes(newVal)) {
                addAchievement(Game.level);
            }
        });

        $scope.$watch(function() {
            return Game.gamesPlayed;
            }, function(newVal, oldVal) {
			var achievements = JSON.parse(localStorage['achievements']);
            gameMilestones.forEach(function(m) {
                if (m.number == newVal && !achievements.includes(m.name)) {
                    $('#notification').html(achievementMessage + m.name);
                    showNotification();
                    if (achievements.length) {
                        localStorage['achievements'] = localStorage['achievements'].replace(']', ',\"') + m.name +  "\"" + ']';
                    }
                    else {
                        localStorage['achievements'] = JSON.stringify([m.name]);
                    }
                }
            });
        });
        
        $scope.hasAchievement = function(achievement) {
            return localStorage['achievements'].includes(achievement);
        }
        
        $scope.levelAchievements = [
                                     { 'name': 'Level 2',  'value': 10, 'points': 5,  'src': 'number2.png' },
                                     { 'name': 'Level 3',  'value': 20, 'points': 10, 'src': 'number3.jpg' },
                                     { 'name': 'Level 4',  'value': 30, 'points': 15, 'src': 'number4.jpe' },
                                     { 'name': 'Level 5',  'value': 40, 'points': 20, 'src': 'number5.jpg' },
                                     { 'name': 'Level 6',  'value': 50, 'points': 25, 'src': 'number6.jpg' },
                                     { 'name': 'Level 7',  'value': 60, 'points': 30, 'src': 'number7.png' }
                                   ];
                                   
        $scope.scoreAchievements = [
                                     { 'name': 'Score 100',  'value': 100,  'points': 10, 'src': 'score100.png' },
                                     { 'name': 'Score 200',  'value': 200,  'points': 15, 'src': 'score200.png' },
                                     { 'name': 'Score 500',  'value': 500,  'points': 30, 'src': 'score500.jpg' },
                                     { 'name': 'Score 1000', 'value': 1000, 'points': 50, 'src': 'score1000.jpe' }
                                   ];
                                   
        $scope.gameAchievements = [
                                    { 'name': 'Novice',       'value': 1,  'points': 5,  'src': 'novice.jpe' },
                                    { 'name': 'Beginner',     'value': 5,  'points': 10, 'src': 'beginner.jpg' },
                                    { 'name': 'Journeyman',   'value': 10, 'points': 15, 'src': 'journeyman.png' },
                                    { 'name': 'Master',       'value': 20, 'points': 20, 'src': 'master.jpe' },
                                    { 'name': 'Grand Master', 'value': 30, 'points': 30, 'src': 'grandmaster.jpg' }
                                  ];
        
        var allAchievements = $scope.levelAchievements.concat($scope.scoreAchievements).concat($scope.gameAchievements);
        $scope.unlockedAchievements = JSON.parse(localStorage['achievements']).length;
        $scope.availableAchievements = allAchievements.length;      
        
        if ($scope.unlockedAchievements) {
            $scope.unlockedPoints = allAchievements.filter(function(achievement) {
                                                        return $scope.hasAchievement(achievement.name);
                                                        }).mapValues('points').sum();
        }
        
        $scope.availablePoints = allAchievements.mapValues('points').sum();
        
        var categories = [$scope.scoreAchievements, $scope.gameAchievements, $scope.levelAchievements];
        
        categories.forEach(function(category) {
            category.forEach(function(achievement) {
                var source = achievement.src;
                achievement.src = $scope.hasAchievement(achievement.name) ? source : 'questionmark.jpg';
            });
        });
        
    }]);
    