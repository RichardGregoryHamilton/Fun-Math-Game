angular.module('my-app')
    .controller('navController', ['$scope', '$document', function($scope, $document) {
        $scope.page = $document[0].title;
        $scope.home = 'Math Game';
    }]);