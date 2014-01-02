'use strict';

angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);


angular.module('feApp', ['app.controllers', 'app.services', 'app.directives', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/summary', {
          templateUrl: 'views/summary.html',
          controller: 'SummaryCtrl'
      })
      .when('/SachinStats', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      .when('/ScoreBuckets', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      .when('/ResultBuckets', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      .when('/WonLostCenturiesInnning', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      .when('/RecordChart', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      .when('/LifeTimeChart', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      
      
      .when('/SocialFeed', {
        templateUrl: 'views/social_feed.html',
        controller: 'SocialFeedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
