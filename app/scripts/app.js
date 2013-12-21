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
      .when('/SachinStatsLanding', {
        templateUrl: 'views/sachin_stats_landing.html',
        controller: 'SachinStatsLandingCtrl'
      })
      .when('/SachinStats', {
          templateUrl: 'views/sachin_stats.html',
          controller: 'SachinStatsCtrl'
      })
      .when('/summary', {
          templateUrl: 'views/summary.html',
          controller: 'SummaryCtrl'
      })
      .when('/SocialFeed', {
        templateUrl: 'views/social_feed.html',
        controller: 'SocialFeedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
