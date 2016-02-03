angular.module('my-app')
    .controller('helpController', function($scope) {
        
        $scope.colors = ['#FF0000', '#660000', '#FF3300', '#FF9900', '#003300',
              '#000033', '#660033', '#FF0033', '#383838'];
        
        $scope.rand = function() {
            return Math.random();
        }
    
        $scope.randElement = function(array) {
            return array[Math.floor($scope.rand() * array.length)];
        }
        
        $('.example').each(function() {
            $(this).css({ 'color': 'white',
                          'background': $scope.randElement($scope.colors),
                          'text-align': 'center',
                          'padding': '8px 0' });
        });
    });