app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/app/views/home/index.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .when('/e3', {
            templateUrl: 'src/app/views/e3/index.html',
            controller: 'E3Ctrl',
            controllerAs: 'e3'
        })
        .when('/recording', {
            templateUrl: 'src/app/views/recording/index.html',
            controller: 'RecordingCtrl',
            controllerAs: 'recording'
        })
        .when('/cast', {
            templateUrl: 'src/app/views/cast/index.html',
            controller: 'CastCtrl',
            controllerAs: 'cast'
        })
        .when('/donate', {
            templateUrl: 'src/app/views/donate/index.html',
            controller: 'DonateCtrl',
            controllerAs: 'donate'
        })
        .when('/_=_', {
          redirectTo: '/'
        })
        .otherwise({
            templateUrl: 'src/app/views/404.html',
        });
    $locationProvider.html5Mode({
        enabled: false
    });
}]);
