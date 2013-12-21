'use strict';

function get_pie_chart_data(data, PieChartOptions){
	var chart_data = $.extend(true, {}, PieChartOptions.pos);
	chart_data.series[0].data = [];
	var flightType = {name: '', y: '', color: ''}
	flightType.name = "Point-to-Point";
	flightType.y = data["point-to-point"].percent;
	flightType.color = "#662d91";
	chart_data.series[0].data.push(flightType);
	var flightType2 = {name: '', y: '', color: ''}
	flightType2.name = "Connecting";
	flightType2.y = data['connecting'].percent;
	flightType2.color = "#82ca9c";
	chart_data.series[0].data.push(flightType2);
	return chart_data;
}

function getWonLost(matches, PieChartOptions){

	var won = 0, lost = 0;
	for (var i = 0; i < matches.length; i++){
		matches[i].match_result == 'won' ? won++ : lost++;
	}
	console.log(won, lost)

	var chart_data = $.extend(true, {}, PieChartOptions.pos);
	chart_data.series[0].data = [];
	var wonData = {name: '', y: '', color: ''}
	wonData.name = "Won";
	wonData.y = won;
	wonData.color = "#ff0dff";
	chart_data.series[0].data.push(wonData);
	var lostData = {name: '', y: '', color: ''}
	lostData.name = "Lost";
	lostData.y = lost;
	lostData.color = "#f00";
	chart_data.series[0].data.push(lostData);
	chart_data.title.text = "Matches Won Lost"
	return chart_data;
}


function getCenturyVsBattingOrder(matches, PieChartOptions){
	var battingOrder = {};
	for(var i = 0; i < matches.length; i++){
		if(matches[i].sachin_score >= 100){
			var batting_order = matches[i].batting_order;
			if(battingOrder[batting_order]){
				battingOrder[batting_order]++;
			} else {
				battingOrder[batting_order] = 1;
			}
		}
	}
	console.log(battingOrder)

	var chart_data = $.extend(true, {}, PieChartOptions.pos),
		color = ['','blue', 'orange', 'green', 'purple'];
	chart_data.series[0].data = [];
	for(var order in battingOrder){
		var data = {};
		data.name = order;
		data.y = battingOrder[order];
		data.color = color[parseInt(order)];
		chart_data.series[0].data.push(data);
	}
	chart_data.title.text = "Centuries vs Batting Order"
	chart_data.tooltip.formatter = function(){
        return '<b>Batted '+ this.key + ': </b>' + this.y + ' Ceturies';
    }

	return chart_data;
}


angular.module('app.controllers')
    .controller('SachinStatsCtrl', ['$scope', 'Data', 'PieChartOptions',
    	function($scope, Data, PieChartOptions){
    		
    		$scope.page = "Sachin Stats";

			$(".sachinStat").animate({
		    	height: "550px"
		  	}, 1500 );
    		
    		Data.get_local('scripts/lib/trafficComp.json').success(function(api_data){
    			$scope.matches = get_pie_chart_data(api_data.res['2013'], PieChartOptions);
    			$scope.runs = get_pie_chart_data(api_data.res['2012'], PieChartOptions);
    			$scope.centuries = get_pie_chart_data(api_data.res['2013'], PieChartOptions);

    		});

    		Data.get_local('scripts/lib/sachin_odi.json').success(function(api_data){
    			$scope.winLoss = getWonLost(api_data, PieChartOptions);
    			$scope.centuryVsBattingOrder = getCenturyVsBattingOrder(api_data, PieChartOptions);
    		});
    }])