angular.module('mathGame')
    .controller('helpController', ['$scope', 'Game', function($scope, Game) {

        $('.example').each(function() {
            $(this).css({ 'color': 'white',
                          'background': Game.randElement(Game.colors),
                          'text-align': 'center',
						  'font-size': '1.4em',
						  'letter-spacing': '6px',
						  'box-shadow': '2px 2px 2px #888888',
                          'padding': '8px 0' });
        });
    }]);