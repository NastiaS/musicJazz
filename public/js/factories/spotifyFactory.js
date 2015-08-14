app.factory('spotifyFactory', ['$http', function ($http) {
	return {

		getArtistId: function (artist) {
			return $http.get('/spotify/getTracks/' + artist).then(function (response) {
				return response.data
			})
		},

		getTracksById: function (artistId) {
			return $http.get('/spotify/getTracksById/'+ artistId).then(function (response) {
				return response.data
			})
		}	
	}
}]);
