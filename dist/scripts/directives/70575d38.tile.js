'use strict';

angular.module('app.directives')

.directive('tile', function () {
  return function(scope, element, attrs) {
    angular.element(element).css({'width': tileSize+'px', 'height': tileSize+'px'});
    $('h2').css({'font-size': fontSize});
  };
})