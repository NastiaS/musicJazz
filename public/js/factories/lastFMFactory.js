app.factory('lastFMFactory', ['$http', function ($http) {
	return {
		getBio: function (name) {
			return $http.get('/lastFM/getInfo/' + name).then(function (response) {

				var bioAndImage = {
					bio: response.data.artist.bio.summary,
					image: response.data.artist.image
				}
				return bioAndImage
			})
		}
	}
}]);
