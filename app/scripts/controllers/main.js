'use strict';

angular.module('app.controllers')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Phonegap',
      'Bootstrap 3.0.2'
    ];

    $scope.colors = ['#334D5C','#45b29d','#EFC94C','#E27A3F','#DF5A49'];
    
    $scope.tiles = [{name: 'Sachin Stats', url: '#/SachinStatsLanding', class:'col-md-12'},{name: 'Personal Stuff', url: '#/PersonalStuff', class:'col-md-6'},
    				{name: 'Awesome Facts', url: '#/AwesomeFacts', class:'col-md-3'},{name: 'Love You God', url: '#/LoveYouGod', class:'col-md-3'}];

  });
