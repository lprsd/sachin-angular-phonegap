'use strict';

angular.module('app.controllers')
    .controller('SachinStatsLandingCtrl', ['$scope', 'Data', 'PieChartOptions',
    	function($scope, Data, PieChartOptions){
    		
    		$scope.page = "Sachin Landing Stats";

			$(".sachinStat").animate({
		    	height: "550px"
		  	}, 1500 );
    		
    		
    }])