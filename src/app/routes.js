app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/app/views/home/index.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .when('/_=_', {
          redirectTo: '/'
        })
        .otherwise({
            templateUrl: 'app/views/404.html',
        });
    $locationProvider.html5Mode({
        enabled: true
    });
}]);
