angular.module('my-app')
    .controller('achievementsController', ['$scope', '$timeout', 'Game', function($scope, $timeout, Game) {
        
        $scope.unlocked = false;
        
        $scope.achievementMessage = 'You have unlocked the achievement ';
        $scope.allScoreAchievements = [];

        [100, 200, 500, 1000].forEach(function(number, index) {
            $scope.allScoreAchievements[index] = { 'name': 'Score ' + number, 'value': number };
        });

        $scope.makeUnique = function(array) {
            return array.filter(function(element, index) {
                return array.indexOf(element) == index;
            });
        }

        $scope.showNotification = function() {
            $scope.unlocked = true;
            setTimeout(function() {
                $scope.unlocked = false;
            }, 5000);
        }
        
        $scope.addAchievement = function(level) {
            var achievements = JSON.parse(localStorage['mathAchievements']); 
            var totalScore = Number(localStorage['mathTotalScore']);
            var achievement = 'Level ' + level ;
            
            if (achievements.length) {
                if (achievements.indexOf(achievement) < 0) {
                    localStorage['mathAchievements'] = localStorage['mathAchievements'].replace(']', ',\"') + achievement + "\"" + ']';
                    $('#notification').html($scope.achievementMessage + achievement);
                    $scope.showNotification();
                }
                
                for (var i = 0; i < $scope.allScoreAchievements.length; i++) {
                    var achievement = $scope.allScoreAchievements[i];
                    if (achievements.indexOf(achievement.name) < 0 && totalScore > achievement.value) {
                        localStorage['mathAchievements'] = localStorage['mathAchievements'].replace(']', ',\"') + achievement.name + "\"" + ']';
                        $('#notification').html($scope.achievementMessage + achievement.name);
                        $scope.showNotification();
                    }
                }
            }
             newAchievements = $scope.makeUnique(JSON.parse(localStorage['mathAchievements']));
            localStorage['mathAchievements'] = JSON.stringify(achievements.length ? newAchievements: [achievement]);
        }
        
        $scope.levels = [1, 11, 21, 31, 41, 51, 61];
        
        $scope.$watch(function() {
            return Game.score;
            }, function(newVal, oldVal) {
            if ($scope.levels.indexOf(newVal) > -1) {
                $scope.addAchievement(Game.level);
            }
        });

        $scope.hasAchievement = function(achievement) {
            return localStorage['mathAchievements'].indexOf(achievement) > -1;
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
                                  
        var categories = [$scope.scoreAchievements, $scope.gameAchievements, $scope.levelAchievements];
        
        categories.forEach(function(category) {
            category.forEach(function(achievement) {
                var source = achievement.src;
                achievement.src = $scope.hasAchievement(achievement.name) ? source : 'questionmark.jpg';
            });
        });
        
    }]);
    