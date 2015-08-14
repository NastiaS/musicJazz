app.controller('ArtistController', ['$scope', '$stateParams', 'spotifyFactory', 'ngAudio', 'lastFMFactory', function($scope, $stateParams, spotifyFactory, ngAudio, lastFMFactory) {
    var artist = $stateParams.artist;
    $scope.display = [];
    $scope.song = null;
    $scope.player = null;
    $scope.playing = false;

//obtain the artist ID when the page loads to make a call to Spotify to get tracks with Spotify ID
  	spotifyFactory.getArtistId($stateParams.artist)
  		.then(function(tracks){
  			$scope.tracks = { name: $stateParams.artist, id: tracks.artists.items[0].id}
  });

//bring top-tracks of the artist from Spotify
	$scope.bringTopTracks = function(artistId){

		spotifyFactory.getTracksById(artistId)
			.then(function(tracksById){

				tracksById.tracks.forEach(function(e){
					var temp = {name: e.name, url: e.preview_url}
					$scope.display.push(temp);
				})
			})
	};

  $scope.bringInfo = function(name){

     console.log(name)
    lastFMFactory.getBio(name)
      .then(function(info){
        $scope.bio = info.bio,
        $scope.artistImage = info.image
      })
  };

//play and stop playing chosen song
  	$scope.playSong = function (preview_url) {

		var player = ngAudio.load(preview_url);

  			if (!$scope.playing) {
                player.play();
                $scope.playing = true;
            }
            else{
            	player.stop();
            	$scope.playing = false;
            }
  		}
}]);