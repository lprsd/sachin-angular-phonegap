'use strict';

angular.module('app.controllers')
    .controller('SocialFeedCtrl', ['$scope',
    	function($scope){
    		
    		$scope.page = "Social Feed";

			$(".sachinStat").animate({
		    	height: "550px"
		  	}, 1500 );
    		
    }])