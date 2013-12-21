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

var colorsArray = ['#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC','#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC'];

function get_series_data(Data, api_data, chosen_json, chosen_attr){

    var series_data = []
    var total_this_stat = $.map(api_data[chosen_json], function(x){return +x.Runs}).reduce(function(previousValue, currentValue){ return previousValue + currentValue;})
    console.log(total_this_stat);
    var i = 0;
    for(var each_stat in api_data[chosen_json]){
        var s = api_data[chosen_json][each_stat];
        series_data.push({
            name : s.name,
            y :+(+(s[chosen_attr])/total_this_stat*100).toFixed(1),
            color : colorsArray[i++]
        });
    }
    console.log(series_data);
    return series_data;
}



function plot_odi_stat_data($scope, Data, chart_options){

    var chosen_json = 'v Country';
    var chosen_attr = 'Runs';
    var api_data = $scope.r_api_data;

    var series_data = get_series_data(Data,api_data,chosen_json,chosen_attr);
    var chart_data = angular.copy(chart_options.pos);
    chart_data.series = [{name:chosen_json, type: 'pie', data:series_data}];
    chart_data.title.text = 'chosen_json';
    $scope.chosenStat = chart_data;
}


angular.module('app.controllers')
    .controller('SachinStatsCtrl',
    	function($scope, Data, PieChartOptions){
    		
    		$scope.page = "Sachin Stats";

			$(".sachinStat").animate({
		    	height: "550px"
		  	}, 1500 );
    		
    		Data.get_local('scripts/lib/trafficComp.json').success(function(api_data){
    			$scope.matches = get_pie_chart_data(api_data.res['2013'], PieChartOptions);
                $scope.runs = get_pie_chart_data(api_data.res['2012'], PieChartOptions);
//                $scope.chosenStat = get_pie_chart_data(api_data.res['2012'], PieChartOptions);

    		});

            Data.get_local('scripts/lib/sachin_odi.json').success(function(api_data){
                $scope.winLoss = getWonLost(api_data, PieChartOptions);
            });

            Data.get_local('scripts/lib/sachin_odi_summary.json').success(function(api_data){
                $scope.r_api_data = api_data;
                plot_odi_stat_data($scope, Data, PieChartOptions)

            });
        });
