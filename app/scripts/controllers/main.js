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
    $scope.tiles = ['Sachin Stats', 'Fun Facts', 'Awesome Things', 'More Awesome Things'];

  });
