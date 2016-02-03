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
                                     { 'name': 'Level 1',  'value': 0,   'src': 'number1.jpe',  'alt': 'Level 1'  },
                                     { 'name': 'Level 2',  'value': 10,  'src': 'number2.png',  'alt': 'Level 2'  },
                                     { 'name': 'Level 3',  'value': 20,  'src': 'number3.png',  'alt': 'Level 3'  },
                                     { 'name': 'Level 4',  'value': 30,  'src': 'number4.png', 'alt': 'Level 4' },
                                     { 'name': 'Level 5',  'value': 40,  'src': 'number5.jpg',  'alt': 'Level 5'  },
                                     { 'name': 'Level 6',  'value': 50,  'src': 'number6.jpe',  'alt': 'Level 6'  }
                                   ];
                                   
        $scope.scoreAchievements = [
                                     { 'name': 'Score 100',  'value': 100,  'src': 'score100.png',  'alt': 'Score 100'  },
                                     { 'name': 'Score 200',  'value': 200,  'src': 'score200.png',  'alt': 'Score 200'  },
                                     { 'name': 'Score 500',  'value': 500,  'src': 'score500.jpg',  'alt': 'Score 500'  },
                                     { 'name': 'Score 1000', 'value': 1000, 'src': 'score1000.jpe', 'alt': 'Score 1000' }
                                   ];
                                   
        $scope.gameAchievements = [
                                    { 'name': 'Novice',       'value': 1,  'src': 'novice.jpe',      'alt': 'Novice'        },
                                    { 'name': 'Beginner',     'value': 5,  'src': 'beginner.jpg',    'alt': 'Beginner'      },
                                    { 'name': 'Journeyman',   'value': 10, 'src': 'journeyman.png',  'alt': 'Journeyman'    },
                                    { 'name': 'Master',       'value': 20, 'src': 'master.jpe',      'alt': 'Master'        },
                                    { 'name': 'Grand Master', 'value': 30, 'src': 'grandmaster.jpg', 'alt': 'Grand Master'  }
                                  ];
                                  
    }]);
    