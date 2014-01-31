'use strict';

var colors;
var colorsArray = ['#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC',
'#7C76B9','#03C7A1','#AEC9EC','#EEB674','#B99076','#348EBA', '#4FCE87', '#EA8B64'
];

function get_pie_chart_data(data, PieChartOptions){
	var chart_data = $.extend(true, {}, PieChartOptions.simplePie);
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

function getScoreBuckets(matches, PieChartOptions) {

	var wonLostScoreBuckets = getWonLostScoreBuckets(matches),
		colors = Highcharts.getOptions().colors,
    categories = ['Won', 'Lost'],
    name = '',
    data = [{
		      y: wonLostScoreBuckets.won,
		      color: colors[0],
		      drilldown: {
		          name: 'Score Buckets',
		          categories: wonLostScoreBuckets.scoreBuckets,
		          data: wonLostScoreBuckets.wonScoreBuckets,
		          color: colors[0]
		      }
		  }, {
		      y: wonLostScoreBuckets.lost,
		      color: colors[1],
		      drilldown: {
		          name: 'Score Buckets',
		          categories: [].concat(wonLostScoreBuckets.scoreBuckets).reverse(),
		          data: wonLostScoreBuckets.lostScoreBuckets.reverse(),
		          color: colors[1]
		      }
		  }];

    var wonLostData = [];
    var scoreData = [];
    for (var i = 0; i < data.length; i++) {
        wonLostData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        for (var j = 0; j < data[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
            scoreData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    var chart_data = $.extend(true, {}, PieChartOptions.simplePie);
    chart_data.series = [{
		      data: wonLostData,
		      size: '35%',
		      dataLabels: {
		          formatter: function() {
		              return this.point.name;
		          },
		          style : {fontSize: 13},
		          color: 'white',
		          distance: -25
		      }
		  }, {
		      data: scoreData,
		      size: '40%',
		      innerSize: '35%',
		      dataLabels: {
		      		style : {fontSize: 13},
		          formatter: function() {
		              // display only if larger than 1
		              return this.y >= 1 ? '<b>'+ this.point.name +' runs:</b> '+ this.y +''  : null;
		          },
		          distance: 10
		      }
		  }];

		chart_data.title.text = 'Sachin Score Buckets vs India Won/Lost Match Counts';
		chart_data.plotOptions = {
	      pie: {
	          shadow: false,
	          center: ['50%', '50%'],
	          dataLabels: {style: ''}
	      }
	  };
		chart_data.chart.type = 'pie';
		chart_data.plotOptions.pie.dataLabels.style = { fontFamily: "OpenSansCondLight,Georgia,Times,serif"}

		return chart_data;
}

function getWonLostScoreBuckets(matches){
	
	var scoreBuckets = ['0-20', '21-49', '50-70', '71-90', '91-99', '100+'],
		wonScoreBuckets = [0,0,0,0,0,0],
		lostScoreBuckets = [0,0,0,0,0,0],
		wonLostScoreBuckets = {
			won: 0, lost: 0, 
			wonScoreBuckets: wonScoreBuckets, lostScoreBuckets: lostScoreBuckets,
			scoreBuckets: scoreBuckets
		};

	for (var i = 0; i < matches.length; i++){
		var result = matches[i].result ? matches[i].result : matches[i].match_result;
		if("won lost".indexOf(result) == -1) continue;
		
		result == 'won' ? wonLostScoreBuckets.won++ : wonLostScoreBuckets.lost++;
		var score = parseInt(matches[i].sachin_score);

		switch(true){
			case (score <= scoreBuckets[0].split('-')[1] || isNaN(score)):
				matches[i].match_result == 'won'? wonScoreBuckets[0]++ : lostScoreBuckets[0]++;
				break;
			case (score <= scoreBuckets[1].split('-')[1]):
				matches[i].match_result == 'won'? wonScoreBuckets[1]++ : lostScoreBuckets[1]++;
				break;
			case (score <= scoreBuckets[2].split('-')[1]):
				matches[i].match_result == 'won'? wonScoreBuckets[2]++ : lostScoreBuckets[2]++;
				break;
			case (score <= scoreBuckets[3].split('-')[1]):
				matches[i].match_result == 'won'? wonScoreBuckets[3]++ : lostScoreBuckets[3]++;
				break;
			case (score <= scoreBuckets[4].split('-')[1]):
				matches[i].match_result == 'won'? wonScoreBuckets[4]++ : lostScoreBuckets[4]++;
				break;
			case (score > scoreBuckets[4].split('-')[1]):
				matches[i].match_result == 'won'? wonScoreBuckets[5]++ : lostScoreBuckets[5]++;
				break;
		}
	}
	console.log(wonLostScoreBuckets)
	return wonLostScoreBuckets;
}

function getResultBuckets(matches, PieChartOptions, title) {

	var wonLostByBuckets = getWonLostByBuckets(matches),
		colors = Highcharts.getOptions().colors,
    categories = ['Won', 'Lost'],
    name = '',
    data = [{
		      y: wonLostByBuckets.won,
		      color: colors[0],
		      drilldown: {
		          name: 'Score Buckets',
		          categories: wonLostByBuckets.byBuckets,
		          data: wonLostByBuckets.wonByBuckets,
		          color: colors[0]
		      }
		  }, {
		      y: wonLostByBuckets.lost,
		      color: colors[1],
		      drilldown: {
		          name: 'Score Buckets',
		          categories: [].concat(wonLostByBuckets.byBuckets).reverse(),
		          data: wonLostByBuckets.lostByBuckets.reverse(),
		          color: colors[1]
		      }
		  }];

    var wonLostData = [];
    var byData = [];
    for (var i = 0; i < data.length; i++) {
        wonLostData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        for (var j = 0; j < data[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
            byData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    var chart_data = $.extend(true, {}, PieChartOptions.simplePie);
    chart_data.series = [{
		      data: wonLostData,
		      size: '35%',
		      dataLabels: {
		          formatter: function() {
		              return this.point.name;
		          },
		          style : {fontSize: 13},
		          color: 'white',
		          distance: -25
		      }
		  }, {
		      data: byData,
		      size: '40%',
		      innerSize: '35%',
		      dataLabels: {
		      		style : {fontSize: 13},
		          formatter: function() {
		              // display only if larger than 1
		              return this.y >= 1 ? '<b>By '+ this.point.name +':</b> '+ this.y +''  : null;
		          },
		          distance: 10
		      }
		  }];

		chart_data.title.text = 'India Won/Lost By & Match Counts ' + title;
		chart_data.plotOptions = {
	      pie: {
	          shadow: false,
	          center: ['50%', '50%'],
	          dataLabels: {style: ''}
	      }
	  };
		chart_data.chart.type = 'pie';
		chart_data.plotOptions.pie.dataLabels.style = { fontFamily: "OpenSansCondLight,Georgia,Times,serif"}

		return chart_data;
}

function getWonLostByBuckets(matches){
	
	var byBuckets = [
		'1 wkt', '2 wkts', '3 wkts', '4 wkts', '5 wkts',
		'6 wkts', '7 wkts', '8 wkts', '9 wkts', '10 wkts',
		'1-49 runs', '50-99 runs', '100-149 runs', '150-199 runs', '200+ runs'],
		wonByBuckets = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		lostByBuckets = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		wonLostByBuckets = {
			won: 0, lost: 0, 
			wonByBuckets: wonByBuckets, lostByBuckets: lostByBuckets,
			byBuckets: byBuckets
		};

	for (var i = 0; i < matches.length; i++){
		var won_lost_by = matches[i].won_lost_by,
			result = matches[i].result ? matches[i].result : matches[i].match_result;

		if("won lost".indexOf(result) == -1) continue;

		if(result == 'won') wonLostByBuckets.won++; 
		if(result == 'lost') wonLostByBuckets.lost++;
		
		switch(true){
			case (result == 'won'):
				if(won_lost_by.indexOf('wicket') > -1){
					wonByBuckets[parseInt(won_lost_by) - 1]++;	
				} else 
				if(won_lost_by.indexOf('run') > -1){
					var index = 9 + parseInt(parseInt(won_lost_by)/50);
					index = index > 14 ? 14 : index;
					wonByBuckets[index]++;	
				}
				break;
			case (result == 'lost'):
				if(won_lost_by.indexOf('wicket') > -1){
					lostByBuckets[parseInt(won_lost_by) - 1]++;	
				} else 
				if(won_lost_by.indexOf('run') > -1){
					var index = 9 + parseInt(parseInt(won_lost_by)/50);
					index = index > 14 ? 14 : index;
					lostByBuckets[index]++;	
				}
				break;
		}
	}
	console.log(wonLostByBuckets)
	return wonLostByBuckets;
}

function getAboveBelowWonLostPercentAt(matches, score, PieChartOptions) {

	var wonLostPercent = getWonLostPercent(matches, score),
		colors = Highcharts.getOptions().colors,
    categories = ['>= ' + score, '< ' + score],
    name = '',
    data = [{
		      y: wonLostPercent.aboveScorePercent,
		      color: colors[0],
		      drilldown: {
		          name: 'Won Lost Percent',
		          categories: wonLostPercent.wonLost,
		          data: wonLostPercent.wonLostAboveScore,
		          color: colors[0]
		      }
		  }, {
		      y: wonLostPercent.belowScorePercent,
		      color: colors[1],
		      drilldown: {
		          name: 'Won Lost Percent',
		          categories: [].concat(wonLostPercent.wonLost).reverse(),
		          data: wonLostPercent.wonLostBelowScore.reverse(),
		          color: colors[1]
		      }
		  }];

    var aboveBelowScorePercent = [];
    var wonLostPercentData = [];
    for (var i = 0; i < data.length; i++) {
        aboveBelowScorePercent.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        for (var j = 0; j < data[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
            wonLostPercentData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    var chart_data = $.extend(true, {}, PieChartOptions.simplePie);
    chart_data.series = [{
		      data: aboveBelowScorePercent,
		      size: '35%',
		      dataLabels: {
		          formatter: function() {
		              return this.point.name;
		          },
		          style : {fontSize: 13},
		          //format: '{point.name}: {point.percentage:.1f} %',
		          color: 'white',
		          distance: -30
		      }
		  }, {
		      data: wonLostPercentData,
		      size: '40%',
		      innerSize: '35%',
		      dataLabels: {
		      		style : {fontSize: 13},
		          formatter: function() {
		              // display only if larger than 1
		              return this.y >= 1 ? '<b>'+ this.point.name +':</b> '+ this.y +' matches'  : null;
		          },
		          //format: '<b>{point.name}:</b> {point.percentage:.1f} %',
		          distance: 2
		      }
		  }];

		chart_data.title.text = 'Sachin Score and India Won Lost Match Counts';
		chart_data.plotOptions = {
	      pie: {
	          shadow: false,
	          center: ['50%', '50%'],
	          dataLabels: {style: ''}
	      }
	  };
		chart_data.chart.type = 'pie';
		chart_data.plotOptions.pie.dataLabels.style = { fontFamily: "OpenSansCondLight,Georgia,Times,serif"}

		return chart_data;
}

function getWonLostPercent(matches, score){
	
	var wonLost = ['Won', 'Lost'],
		wonLostAboveScore = [0,0],
		wonLostBelowScore = [0,0],
		wonLostPercent = {
			aboveScorePercent: 0, belowScorePercent: 0, 
			wonLostAboveScore: wonLostAboveScore, wonLostBelowScore: wonLostBelowScore,
			wonLost: wonLost
		};

	for (var i = 0; i < matches.length; i++){
		if('won lost'.indexOf(matches[i].match_result) == -1) continue;
		if(matches[i].sachin_score >= score) {
			wonLostPercent.aboveScorePercent++;
			if(matches[i].match_result == 'won') {
				wonLostAboveScore[0]++;
			} else if(matches[i].match_result == 'lost') {
				wonLostAboveScore[1]++;
			}
		} else {
			wonLostPercent.belowScorePercent++;
			if(matches[i].match_result == 'won') {
				wonLostBelowScore[0]++;
			} else if(matches[i].match_result == 'lost') {
				wonLostBelowScore[1]++;
			}
		}
			
	}
	console.log(wonLostPercent)
	return wonLostPercent;
}

function getWonLostAt(matches, score, PieChartOptions){

	var wonLostPercent = getWonLostPercent(matches, score);
	
	var chart_data = $.extend(true, {}, PieChartOptions.simplePie);
	chart_data.series[0].data = [];
	var wonData = {name: '', y: '', color: ''}
	wonData.name = "Won";
	wonData.y = wonLostPercent.wonLostAboveScore[0];
	wonData.color = "#ff0dff";
	chart_data.series[0].data.push(wonData);
	var lostData = {name: '', y: '', color: ''}
	lostData.name = "Lost";
	lostData.y = wonLostPercent.wonLostAboveScore[1];
	lostData.color = "#f00";
	chart_data.series[0].data.push(lostData);
	chart_data.title.text = "Won Lost Match Counts at Specific Score";
	return chart_data;
}

function getWonLost(matches, PieChartOptions){

	var wonLostScoreBuckets = getWonLostScoreBuckets(matches);
	
	var chart_data = $.extend(true, {}, PieChartOptions.simplePie);
	chart_data.series[0].data = [];
	var wonData = {name: '', y: '', color: ''}
	wonData.name = "Won";
	wonData.y = wonLostScoreBuckets.won;
	wonData.color = "#ff0dff";
	chart_data.series[0].data.push(wonData);
	var lostData = {name: '', y: '', color: ''}
	lostData.name = "Lost";
	lostData.y = wonLostScoreBuckets.lost;
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

	var chart_data = $.extend(true, {}, PieChartOptions.simplePie),
		color = ['','blue', 'orange', 'green', 'purple'];
	chart_data.series[0].data = [];
	for(var order in battingOrder){
		var data = {};
		data.name = order;
		data.y = battingOrder[order];
		data.color = color[parseInt(order)];
		chart_data.series[0].data.push(data);
	}
	chart_data.title.text = "Centuries vs Inning"
	chart_data.tooltip.formatter = function(){
        return '<b>'+ this.key + ' Inning: </b>' + this.y + ' Centuries';
    }

	return chart_data;
}

function custom_chart_settings_by_avg_fare(chart_data){
    chart_data.chart.marginTop = 140;
    chart_data.xAxis = {
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true,
                        lineColor: '#aaa',
                        tickLength: 0,
                        title: { 
                        	text: "Average",
                        	align: 'middle',
                        	style:{
                        		color: "#666",
                        		fontFamily: "Arial",
                        		fontSize: "12px"
                        	}
                        },
                        "labels": {
                             y: 20,
                            "style": {
                                "color": "#666",
                                "fontFamily": "TitilliumWeb",
                                "fontSize": "12px"
                            },
                            "verticalAlign": "middle"
                       }
                   }
    chart_data.yAxis.max = 500;
    delete chart_data.yAxis.tickInterval;
    chart_data.yAxis.title ={
    							text: "Number of Matches",
                        		align: 'middle',
                        		style:{
	                        		color: "#666",
	                        		fontFamily: "Arial",
	                        		fontSize: "12px"
                        		}
    						};
    chart_data.legend = {
                align: 'right',
                verticalAlign: 'top',
                layout: 'horizontal',
                floating: true,
                x: 0,
                y: 0,
                itemMarginTop: 5,
                itemMarginBottom: 5
            };

    chart_data.tooltip = {
            enabled: true,
            formatter: function() {
            	console.log(this);
                return '<b>'+this.point.name+'</b><br>'+
                	   '<b>Matches: '+this.y+'</b><br>'+
                	   '<b>Average: '+this.x+'</b><br>'+
                	   '<b>Runs: '+this.point.runs+'</b>';
            }
        };

    chart_data.plotOptions.scatter = {
				    					states: {
				                            hover: {
				                                enabled: false,
				                                lineColor: 'rgb(100,100,100)'
				                            }
                        			 	}
    };    
    chart_data.plotOptions.series = {
								    	marker:{
								    		symbol: 'circle'
								    	}
    };
    
    delete chart_data.yAxis.min;
    chart_data.chart.type = 'scatter';
    chart_data.series = [];
    return chart_data;
}

function get_bubble_chart_data (api_data, colors, ChartOptions) {
    var chart_data = $.extend(true, {}, ChartOptions.pos);
    chart_data = custom_chart_settings_by_avg_fare(chart_data);
    for(var i = 0; i < api_data.length; i++){
        var seriesObj = {name: '', color: '', data: []};
        var dataObj =   {x: '', y: '', runs: '', name: '',
        					marker: {
	        					radius: '',
	        					symbol: 'circle'
    				    	}
    				    }
    	dataObj.x = parseFloat(api_data[i].average);
    	dataObj.y = parseInt(api_data[i].matches);
    	dataObj.marker.radius = parseFloat((api_data[i].runs)/500);
		dataObj.runs = parseInt(api_data[i].runs);
		dataObj.name = api_data[i].name;
        seriesObj.name = api_data[i].name;
        seriesObj.color = colorsArray[i];
        seriesObj.data.push(dataObj);
        chart_data.series.push(seriesObj);
    }
    console.log(colorsArray)
    console.log(chart_data)
    return chart_data;
}

function get_area_chart_data(data, AreaChartOptions){
	var chart = $.extend(true, {}, AreaChartOptions.areaChart);
	for (var i = 0; i < data.length; i++) {
		var top_score_array = [];
		var average = []
		var top_score = []
		var date = new Date(data[i].date);
		top_score_array.push(date.getTime());
		top_score_array.push(parseInt(data[i].cum_runs));
		top_score.push(date.getTime());
		top_score.push(parseInt(data[i].top_score));
		average.push(date.getTime());
		average.push(parseFloat(data[i].avg));
		chart.series[0].data.push(average);
		chart.series[1].data.push(top_score_array);
		chart.series[2].data.push(top_score);
	}
	return chart
}

function get_win_loss_area_chart(data, AreaChartOptions){
	var chart_data = $.extend(true, {}, AreaChartOptions.areaChart);
	chart_data.xAxis = {categories: []}
	chart_data.xAxis.categories = [];
	for(var yearVal = 1989; yearVal < 2013; yearVal++){
		chart_data.xAxis.categories.push(yearVal);
	}
	chart_data.series = [
            {
                name: 'All',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: '#4572A7',
                type: 'area',
                data: []
            },
            {
                name: 'Win',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: '#666666',
                type: 'area',
                data: []
            },
            {
                name: 'Loss',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: '#efefef',
                type: 'area',
                data: []
            },
            {
                name: 'Matches',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: '#89A54E',
                type: 'spline',
                yAxis: 1,
                data: []
            }]
	var startYear = 1989;
	while (startYear != 2012){
		var win = 0, loss = 0, all = 0, total_matches = 0;
		for (var i = 0; i < data.length; i++) {
	        var date = new Date(data[i].date);
	        var year = date.getFullYear(date);
	        if(year == startYear){
	        	var score = data[i].sachin_score === "-" ? 0 : data[i].sachin_score;
	        	if(data[i].match_result == 'won'){
	        		win = win + parseInt(score);
	        	}
	        	else if(data[i].match_result == 'lost'){
	        		loss = loss + parseInt(score);
	        	}
	        	all = all + parseInt(score);
	        	total_matches++
	        }		
	    }
	    chart_data.series[0].data.push(all); 
	    chart_data.series[1].data.push(win);
	    chart_data.series[2].data.push(loss);
	    chart_data.series[3].data.push(total_matches);
		startYear++
	}
	console.log(chart_data);
	return chart_data;
}

angular.module('app.controllers')
    .controller('SachinStatsCtrl',
    	function($scope, Data, PieChartOptions, ChartOptions, AreaChartOptions){
    		
    		$scope.page = "Sachin Stats";
    		
				$(".sachinStat").animate({
			    	height: "auto"
			  	}, 1500 );
    		
    		Data.get_local('scripts/lib/trafficComp.json').success(function(api_data){
    			$scope.matches = get_pie_chart_data(api_data.res['2013'], PieChartOptions);
                $scope.runs = get_pie_chart_data(api_data.res['2012'], PieChartOptions);
//                $scope.chosenStat = get_pie_chart_data(api_data.res['2012'], PieChartOptions);

    		});

    		Data.get_local('scripts/lib/sachin_odi.json').success(function(api_data){
    			$scope.scoreBuckets = getScoreBuckets(api_data, PieChartOptions);
    			$scope.winLoss = getWonLost(api_data, PieChartOptions);
    			$scope.centuryVsBattingOrder = getCenturyVsBattingOrder(api_data, PieChartOptions);
    			$scope.winLoss = getWonLost(api_data, PieChartOptions);
    			$scope.winLossChart = get_win_loss_area_chart(api_data, AreaChartOptions);
    			$scope.resultBucketsWithSachin = getResultBuckets(api_data, PieChartOptions, 'with Sachin');
    			$scope.score = 100;
    			$scope.aboveBelowWonLostPercentAt = getAboveBelowWonLostPercentAt(api_data, $scope.score, PieChartOptions);
	        	$scope.wonLostAt = getWonLostAt(api_data, $scope.score, PieChartOptions);
    			$scope.scoreWonLostPercent = function(score) {
    				if(!score || isNaN(score) || score < 0) {
    					alert('Enter valid score!');
    					return;
    				}

	        	$scope.aboveBelowWonLostPercentAt = getAboveBelowWonLostPercentAt(api_data, score, PieChartOptions);
	        	$scope.wonLostAt = getWonLostAt(api_data, score, PieChartOptions);
	        }

    		});

    		Data.get_local('scripts/lib/india_wo_sachin_odi.json').success(function(api_data){
    			$scope.resultBucketsWithoutSachin = getResultBuckets(api_data, PieChartOptions, 'without Sachin');
    		});
    
        Data.get_local('scripts/lib/record_json.json').success(function(api_data){
            $scope.recordChart = get_bubble_chart_data(api_data, colors, ChartOptions)
        });

        Data.get_local('scripts/lib/sachin_odi_cumulative.json').success(function (api_data){
        	$scope.areaChart = get_area_chart_data(api_data, AreaChartOptions);
        });

        $scope.getHighchartImage = function(){
        	var chart = $('.hc-bars').highcharts();
		    var svg = chart.getSVG();   
		    var base_image = new Image();
		    svg = "data:image/svg+xml,"+svg;
		    base_image.src = svg;
		    $scope.imageFeel = svg;
        }

      });
			

