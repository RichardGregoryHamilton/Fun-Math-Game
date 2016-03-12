angular.module('mathGame')
    .controller('navController', ['$scope', '$document', '$http', function($scope, $document, $http) {
        $scope.page = $document[0].title;
        $scope.home = 'Math Game';

		$scope.loggedIn = false;

		$http.get('../../users.json')
			.then(function(response) {
				console.log(response);
				if (response.data[0].loggedIn) {
					$scope.loggedIn = true;
				}
			});
		
    }]);