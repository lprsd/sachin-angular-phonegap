'use strict';

angular.module('feApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/SachinStats', {
        templateUrl: 'views/sachin_stats.html',
        controller: 'SachinStatsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
