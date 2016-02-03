angular.module('my-app')
    .controller('gamesController', ['$scope', '$interval', 'Game', function($scope, $interval, Game) {

		$scope.playing = false;
		
        $scope.newGame = function() {
            if (Game.playing) {
                return false;
            }
            else {
                $scope.resetGame();
            }
        }
   
		$scope.$watch(function() {
            return Game.playing;
            }, function(newVal, oldVal) {
            $scope.playing = newVal;
        });
		
        $scope.resetGame = function() {
            Game.playing = true;
            Game.score = 0;
            Game.level = 1;
            $scope.gameLoop();
        }
        
        $scope.gameLoop = function() {
            $('.exp1, .exp2').remove();
            $scope.generateExpressions();
            $scope.animateDivs();
        }
        
        $scope.generateExpressions = function() {
            $('#game-block').append("<div class='exp1'>");
            $('#game-block').append("<div class='exp2'>");

            $('.exp1, .exp2').each(function() {
                $(this).css({ 'color': 'white',
                              'background': Game.randElement(Game.colors),
                              'text-align': 'center',
                              'padding': '8px 0' });

                switch(true) {
                    case (Game.level == 1):
                        $(this).html($scope.randEasy() + ' + ' + $scope.randEasy());
                        break;
                    case (Game.level >= 2 && Game.level <= 3):
                        $(this).html($scope.random('Med') + ' + ' + $scope.random('Med'));
                        break;
                    case (Game.level >= 4 && Game.level <= 5):
                        $(this).html($scope.random('Hard') + ' + ' + $scope.random('Hard'));
                        break;
                    case (Game.level >= 6 && Game.level <= 7):
                        $(this).html($scope.random('Hard') + ' ' + Game.randElement($scope.operators) + ' ' + $scope.random('Hard'));
                        break;
                    default:
                        $(this).html($scope.random('Extreme') + ' ' + Game.randElement($scope.operators) + ' ' + $scope.random('Extreme'));
                        break;
                }
                var expressions = $(this).html().split(' ');
                var leftNum = Number(expressions[0]);
                var operator = expressions[1];
                var rightNum = Number(expressions[2]);
                var result = $scope.calculateExpression(leftNum, rightNum, operator);

                $(this).data('result', result);

            });
        }
        
		$scope.randEasy = function() {
            return Math.floor(Game.rand() * 10);
        }

        $scope.random = function(level) {
            switch(level) {
                case 'Med':
                    return Game.rand() > 0.5 ? Math.floor(Game.rand() * 20) : Math.floor(Game.rand() * -20);
                    break;
                case 'Hard':
                    return Game.rand() > 0.5 ? Math.floor(Game.rand() * 100) : Math.floor(Game.rand() * - 100);
                    break;
                case 'Extreme':
                    return Game.rand() > 0.5 ? Math.floor(Game.rand() * 1000) : Math.floor(Game.rand() * -1000);
                    break;
            }
        }
        
        $scope.lessThan = function() {
            $('.exp1').data('result') < $('.exp2').data('result') ? $scope.incrementScore() : $scope.endGame();
        }
        
        $scope.equals = function() {
            $('.exp1').data('result') == $('.exp2').data('result') ? $scope.incrementScore() : $scope.endGame();
        }

        $scope.greaterThan = function() {
            $('.exp1').data('result') > $('.exp2').data('result') ? $scope.incrementScore() : $scope.endGame();
        }
        
        $scope.calculateExpression = 
        function(num1, num2, operator) {
            switch(operator) {
                case '+':
                    return num1 + num2;
                    break;
                case '-':
                    return num1 - num2;
                    break;
                case '*':
                    return num1 * num2;
                    break;
                case '/':
                    return num1 / num2;
                    break;
            }
        }
		
		$scope.animateDivs = function() {
            $('.exp2').animate( { 'marginRight': '70%' }, 5000);
            var prevScore = Game.score;
            setTimeout(function() {
                if (Game.score == prevScore) {
                    $scope.endGame()
                }
            }, 5000);
        }
		
		$scope.addScores = function() {
			var scores = JSON.parse(localStorage['mathScores']);
			localStorage['mathScores'] = scores.length ? localStorage['mathScores'].replace(']', ',') + Game.score + ']' : JSON.stringify([Game.score]);
			localStorage['mathTotalScore'] = Number(localStorage['mathTotalScore']) + Math.ceil(Game.score / 2);
		}
		
        $scope.endGame = function() {
            $('.exp1, .exp2').remove();
            Game.playing = false;
			$scope.addScores();
        }
        
        $scope.incrementScore = function() {
            Game.score++;
            $scope.gameLoop();
            Game.level = Math.ceil(Game.score / 10);
        }
        
    }]);
    