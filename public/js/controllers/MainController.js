app.controller("MainController", ['$scope', 'LinkedJazzFactory', '$state', function($scope, LinkedJazzFactory, $state){

//Extract the name from the form and make a call to the Linked Jazz Api to get all jazz artists whose 
//name or last name has typed in chars
    $scope.getName = function (name) {

        LinkedJazzFactory.getByName(name) 
            .then(function (art) {
                $scope.art = art;
            })
        };

//change a state and pass the artist name to this state
    $scope.changeState = function(artist) {
        $state.go('artist',  {artist:artist})
  
    };

}]);

        
    