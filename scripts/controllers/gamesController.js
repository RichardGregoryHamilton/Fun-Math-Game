angular.module('mathGame')
    .controller('gamesController', ['$scope', 'Game', function($scope, Game) {

		$scope.playing = false;
		var operators = ['+', '-', '*', '/'];
		var gameBlock = $('#game-block');
		
        $scope.newGame = function() {
            if (Game.playing) {
                return false;
            }
            else {
                resetGame();
            }
        }
   
		$scope.$watch(function() {
            return Game.playing;
            }, function(newVal, oldVal) {
            $scope.playing = newVal;
        });
		
        function resetGame() {
			++localStorage['gamesPlayed'];
			++Game.gamesPlayed;
            Game.playing = true;
            Game.score = 0;
            Game.level = 1;
            gameLoop();
        }
        
        function gameLoop() {
            $('.exp1, .exp2').remove();
            generateExpressions();
            animateDivs();
        }
        
        function generateExpressions() {
            gameBlock.append("<div class='exp1'>")
                     .append("<div class='exp2'>");

            $('.exp1, .exp2').each(function() {
                $(this).css({ 'color': 'white',
                              'background': Game.randElement(Game.colors),
                              'text-align': 'center',
							  'font-size': '1.4em',
							  'letter-spacing': '6px',
							  'box-shadow': '2px 2px 2px #888888',
                              'padding': '8px 0' });

                switch(true) {
                    case (Game.level === 1):
                        $(this).html(randEasy() + ' + ' + randEasy());
                        break;
                    case (Game.level >= 2 && Game.level <= 3):
                        $(this).html(random('Med') + ' + ' + random('Med'));
                        break;
                    case (Game.level >= 4 && Game.level <= 5):
                        $(this).html(random('Hard') + ' + ' + random('Hard'));
                        break;
                    case (Game.level >= 6 && Game.level <= 7):
                        $(this).html(random('Hard') + ' ' + Game.randElement(operators) + ' ' + random('Hard'));
                        break;
                    default:
                        $(this).html(random('Extreme') + ' ' + Game.randElement(operators) + ' ' + random('Extreme'));
                        break;
                }
                var expressions = $(this).html().split(' ');
                var leftNum = Number(expressions[0]);
                var operator = expressions[1];
                var rightNum = Number(expressions[2]);
                var result = calculateExpression(leftNum, rightNum, operator);

                $(this).data('result', result);

            });
        }
        
		// When rounding numbers down, Bitwise Or 0 is faster than Math.floor
		function randEasy() {
            return (Game.rand() * 10) | 0;
        }

        function random(level) {
            switch(level) {
                case 'Med':
                    return Game.rand() > 0.5 ? (Game.rand() * 20) | 0 : (Game.rand() * -20) | 0;
                    break;
                case 'Hard':
                    return Game.rand() > 0.5 ? (Game.rand() * 100) | 0 : (Game.rand() * - 100) | 0;
                    break;
                case 'Extreme':
                    return Game.rand() > 0.5 ? (Game.rand() * 1000) | 0 : (Game.rand() * -1000) | 0;
                    break;
            }
        }
        
		$scope.evaluate = function(choice) {
			var exp1 = $('.exp1').data('result');
			var exp2 = $('.exp2').data('result');
			switch(choice) {
				case 'less-than':
					exp1 < exp2 ? incrementScore() : endGame();
					break;
				case 'equals':
					exp1 === exp2 ? incrementScore() : endGame();
					break;
				case 'greater-than':
					exp1 > exp2 ? incrementScore() : endGame();
					break;
			}
		}
        
        function calculateExpression(num1, num2, operator) {
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

		function animateDivs() {
            $('.exp2').animate( { 'marginRight': '60%' }, 3000);
            var prevScore = Game.score;
            setTimeout(function() {
                if (Game.score === prevScore) {
                    endGame();
					Game.playing = false;
                }
            }, 3000);
        }
		
		function incrementScore() {
            Game.score++;
            gameLoop();
            Game.level = Math.ceil(Game.score / 10);
        }
		
		function addScores() {
			/*$.ajax({
				'method': 'POST',
				'url': 'scores.json',
				'data': {'number': 37},
				success: function() {
					console.log('data posted');
				}
			});*/
			
			var scores = JSON.parse(localStorage['scores']);
			localStorage['scores'] = scores.length ? localStorage['scores'].replace(']', ',') + Game.score + ']' : JSON.stringify([Game.score]);
			localStorage['totalScore'] = +(localStorage['totalScore']) + Math.ceil(Game.score);
		}
		
        function endGame() {
            $('.exp1, .exp2').remove();
            Game.playing = false;
			addScores();
        }
        
    }]);
    