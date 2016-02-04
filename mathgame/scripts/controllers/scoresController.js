angular.module('my-app')
    .controller('scoresController', ['$scope', 'Game', function($scope, Game) {

        $scope.score = Game.score;
        $scope.level = Game.level;
        $scope.playing = false;
		
        /* Watch for a change in the service variables to display them */
        
        $scope.$watch(function() {
            return Game.playing;
            }, function(newVal, oldVal) {
				console.log(newVal);
            $scope.playing = newVal;
        });

        $scope.$watch(function() {
            return Game.score;
            }, function(newScore, oldScore) {
            if (newScore > oldScore) {
                $scope.score = newScore;
            }
        });
        
        $scope.$watch(function() {
            return Game.level;
            }, function(newLevel, oldLevel) {
            if (newLevel > oldLevel) {
                $scope.level = newLevel;
            }
        });
        
        $scope.oldScores = JSON.parse(localStorage['mathScores'] || '[]');
        
        $scope.sorted = $scope.oldScores.sort(function(scoreA, scoreB) {
            return scoreB - scoreA;
        });
        
        $scope.scoreData = [
                             { 'class': 'gold',     'score': $scope.sorted[0], 'level': Math.floor($scope.sorted[0] / 10) + 1 },
                             { 'class': 'silver',   'score': $scope.sorted[1], 'level': Math.floor($scope.sorted[1] / 10) + 1 },
                             { 'class': 'bronze',   'score': $scope.sorted[2], 'level': Math.floor($scope.sorted[2] / 10) + 1 },
                             { 'class': 'top-five', 'score': $scope.sorted[3], 'level': Math.floor($scope.sorted[3] / 10) + 1 },
                             { 'class': 'top-five', 'score': $scope.sorted[4], 'level': Math.floor($scope.sorted[4] / 10) + 1 }
                           ];
                           
        $scope.highScore = function() {
            return Math.max(Math.max.apply(Math, $scope.oldScores), 0);
        }

    }]);