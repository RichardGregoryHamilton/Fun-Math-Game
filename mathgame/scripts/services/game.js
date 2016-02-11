angular.module('mathGame')
    .factory('Game', function() {
        return { 
            colors: ['#FF0000', '#660000', '#FF3300', '#FF9900', '#003300',
                     '#000033', '#660033', '#FF0033', '#383838'],
            rand: function() {
                return Math.random();
            },
            randElement: function(array) {
                return array[Math.floor(Math.random() * array.length)];
            },
            level: 1,
            score: 0,
			gamesPlayed: Number(localStorage['gamesPlayed']),
            playing: false
        };
    });