var express = require('express');

var path = require('path');

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var router = express.Router();

var lastFMconfig = require('../keys').lastFM.apiKey;
// var LastFM = require('../lastfm.api.js');
// console.log(LastFM)

// /* Create a LastFM object */
// var lastfm = new LastFM({
//   apiKey    : 'ebf0d2a11497f130818e6882dedce795',
//   apiSecret : '41c37c8609df87ee5e1d9acbfaa54f3e'
// });

/* Load some artist info. */
// lastfm.artist.getInfo({artist: 'Cher'}, {success: function(data){
//   console.log("ARTIST", data)
// }, error: function(code, message){
//   /* Show error message. */
// }});


module.exports = router;


//render the home page
router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../index.html'));
});


//call to Linked Jazz Api after the name is specified
router.get('/getByName/:name', function (req, res, next) {

	request('http://linkedjazz.org/api/people/search/' + req.params.name)

		.then(function(response) {
			res.send(response[0].body);
		}).catch(function (err) {
			next(err);
		})
});
// router.get('/spotify/:artist', function(req, res, next) {
// 	console.log("REQ", req.params.artist)
// 	request('https://api.spotify.com/v1/search?q=artist:' + req.params.artist + "&type=album&limit=5")
// 	.then(function(response) {
// 		res.send(response[0].body);
// 	}).catch(function(err) {
// 		next(err);
// 	});
// });


//call Spotify Api to determine the Spotify Id of an artist
router.get('/spotify/getTracks/:artist', function (req, res, next) {

	request('https://api.spotify.com/v1/search?query=' + req.params.artist + '&type=artist&country=US')
	
		.then(function (response) {
			res.send(response[0].body);
		}).catch(function (err) {
			next(err);
		})
}); 

//call sSpotify Api to get the top tracks of the artist
router.get('/spotify/getTracksById/:artistId', function (req, res, next){
	
	request('https://api.spotify.com/v1/artists/' + req.params.artistId + '/top-tracks?country=US')
		.then(function (response) {
			res.send(response[0].body);
		}).catch(function (err) {
			next(err);
		});
});


//call lastFM Api to get the bio and images from the artist
router.get('/lastFM/getInfo/:artistName', function (req, res, next){
	
	request('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + req.params.artistName + '&api_key=' + lastFMconfig + '&format=json')
		.then(function (response) {

			res.send(response[0].body);
		}).catch(function (err) {
			next(err);
		});
});
