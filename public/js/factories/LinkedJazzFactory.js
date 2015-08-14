app.factory('LinkedJazzFactory', ['$http', function ($http) {
	return {
		getByName: function(name){
			return $http.get('/getByName/' + name).then(function (response) {
				return response.data
			})
		}
	}
}]);
