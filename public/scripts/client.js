var myApp = angular.module('myApp', ['ngRoute','firebase','chart.js']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/home.html',
            controller: 'SampleCtrl',
            controllerAs: 'sc'
        })
        .when('/my_track_list', {
            templateUrl: '/views/tracked-items.html',
            controller: 'TrackerController',
            controllerAs: 'tc'
        })
        .when('/charts/:Asin?', {
            templateUrl: '/views/charts.html',
            controller: 'ChartController',
            controllerAs: 'cc'
        })

        .otherwise({
            redirectTo: 'home'
        });
}]);
