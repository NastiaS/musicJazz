var app = angular.module('Jazz', ['ngAudio', 'ui.router']);

app.config(['$locationProvider', '$urlRouterProvider',  function ($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

}]);

app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'MainController'
        })

       .state('artist', {
        	url: '/artist/:artist',
           templateUrl: 'partials/artist.html',
           controller: 'ArtistController'
          
    
        });

}]);

