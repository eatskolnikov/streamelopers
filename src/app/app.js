var app = angular.module('StreamelopersApp', ['ngRoute']);
app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home/index.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .otherwise({
            templateUrl: 'app/views/404.html',
        });
    $locationProvider.html5Mode({
        enabled: true
    });
}]);
