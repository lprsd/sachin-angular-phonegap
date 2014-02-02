angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('feApp', [
  'app.controllers',
  'app.services',
  'app.directives',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'uiSlider'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/main.html' }).when('/summary', {
      templateUrl: 'views/summary.html',
      controller: 'SummaryCtrl'
    }).when('/SachinStats', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/ScoreBuckets', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/ResultBuckets', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/WonLostCenturiesInnning', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/RecordChart', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/LifeTimeChart', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/WinLossChart', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/FindOutYourSelf', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/FarewellSpeech', {
      templateUrl: 'views/sachin_stats.html',
      controller: 'SachinStatsCtrl'
    }).when('/SocialFeed', {
      templateUrl: 'views/social_feed.html',
      controller: 'SocialFeedCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);