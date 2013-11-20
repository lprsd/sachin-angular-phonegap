'use strict';

angular.module('feApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Phonegap',
      'Bootstrap 3.0.2'
    ];

    $scope.colors = ['#334D5C','#45b29d','#EFC94C','#E27A3F','#DF5A49'];
    
    $scope.tiles = [{name: 'Sachin Stats', url: '#/SachinStats'},{name: 'Personal Stuff', url: '#/PersonalStuff'},
    				{name: 'Awesome Facts', url: '#/AwesomeFacts'},{name: 'Love You God', url: '#/LoveYouGod'}];

  });
