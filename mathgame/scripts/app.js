angular.module('mathGame', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '../index.html'
        }).
        when('/scores', {
            templateUrl: '../views/scores.html'
        }).
        when('/achivements', {
            templateUrl: '../views/achievements.html'
        }).
        when('/help', {
            templateUrl: '../views/help.html'
        }).
        when('/faq', {
            templateUrl: '../views/faq.html'
        }).
        when('/related', {
            templateUrl: '../views/related.html'
        }).
		otherwise({
			redirectTo: '/'
		});
    }]);