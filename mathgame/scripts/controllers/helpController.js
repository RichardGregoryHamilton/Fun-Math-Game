angular.module('mathGame')
    .controller('helpController', function($scope, Game) {

        $('.example').each(function() {
            $(this).css({ 'color': 'white',
                          'background': Game.randElement(Game.colors),
                          'text-align': 'center',
                          'padding': '8px 0' });
        });
    });