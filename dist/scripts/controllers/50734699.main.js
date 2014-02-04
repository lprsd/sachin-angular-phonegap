'use strict';

angular.module('app.controllers')
  .controller('MainCtrl', function ($scope, $location, $timeout) {
    $scope.colors = ['#334D5C','#EFC94C','#45b29d','#E27A3F','#DF5A49', '#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC','#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC', '#25ADA7'];
    $scope.heightSize = sizeYoutube();
    $scope.chartHeightSummary = setChartSize(2);
    $scope.chartHeight1 = setChartSize(1);
    $scope.chartHeight2 = setChartSize(0);
    $scope.chartHeight = setChartSize(2)
    $scope.tiles = [
      {name: 'Career <br/> Summary', url: '/summary', class:'col-md-3'},
      {name: 'Score Buckets <br/> & <br/> Won/Lost Counts', url: '/ScoreBuckets', class:'col-md-3'},
      {name: 'Won/Lost By <br/> & <br/> Match Counts', url: '/ResultBuckets', class:'col-md-3'},
      //{name: 'Won/Lost <br/> & <br/> Centuries vs Inning', url: '/WonLostCenturiesInnning', class:'col-md-3'},
      {name: 'Life Time <br/> Chart', url: '/LifeTimeChart', class:'col-md-3'},
      {name: 'Sachin <br/> vs <br/> Other Batsmen', url: '/RecordChart', class:'col-md-3'},
      {name: 'Won/Lost <br/> Areachart', url: '/WinLossChart', class:'col-md-3'},
      {name: 'Find Out <br/> Yourself', url: '/FindOutYourSelf', class:'col-md-3'},
      {name: 'Farewell <br/> Speech', url: '/FarewellSpeech', class:'col-md-3'},
      {name: 'Provide <br/> Feedback', url: '/Feedback', class:'col-md-3'}
    ];

    $scope.$watch(function(){ return $location.path()}, function(value){
      $scope.currentView = value;
      console.log($scope.currentView);
    })

    $scope.flipped = false;

    $scope.flipEffect = function(href){
      $scope.flipped = true;
      $timeout(function(){
        $location.path(href);
        $scope.flipped = false;
      }, 700);
    }

    $scope.charting_options = {
      w_wo_options: ['With Sachin', 'Without Sachin'],
      findout_options: ['Simple', 'Advanced'],
      format_options: ['ODI', 'Test']
    }

    $scope.chosen_option = {
      without: $scope.charting_options.w_wo_options[0],
      findout: $scope.charting_options.findout_options[0],
      format: $scope.charting_options.format_options[0]
    }
  })

  .controller('SummaryCtrl', function($scope, Data, PieChartOptions){
    var get_series_data = function(api_data, chosen_json, chosen_attr){
      var colorsArray = ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#AFA263', '#6AF9C4', '#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', 'orange'];
      var series_data = []
      var total_this_stat = $.map(api_data[chosen_json], function(x){return +x.Runs}).reduce(function(previousValue, currentValue){ return previousValue + currentValue;})
      console.log(total_this_stat);
      var i = 0;
      for(var each_stat in api_data[chosen_json]){
        var s = api_data[chosen_json][each_stat];
        series_data.push({
          name : s.name,
          percent_y :+(+(s[chosen_attr])/total_this_stat*100).toFixed(1),
          y : +(s[chosen_attr]),
          color : colorsArray[i++]
        });
      }
      console.log(series_data);
      return series_data;
    }

    var plot_graph = function(data, format){
      var chosen_json = $scope.chosen_option.json_option;
      var chosen_attr = $scope.chosen_option.attr_option;
      var api_data = data;

      var series_data = get_series_data(api_data,chosen_json,chosen_attr);
      var chart_data = angular.copy(PieChartOptions.simplePie);
      chart_data.series = [{name:chosen_json, type: 'pie', data:series_data}];
      chart_data.plotOptions.pie.dataLabels = {
                                                enabled: true,
                                                style: { fontFamily: "OpenSansCondLight,Georgia,Times,serif",
                                                  fontSize: 13
                                                },
                                                formatter: function() {
                                                  return '<b>'+ this.point.name +': </b> '+ this.y +'';
                                                },
                                                distance: 10
                                              }
      chart_data.plotOptions.pie.center = ['50%', '50%'];
      chart_data.chart.marginTop = chart_data.chart.marginBottom = 50;
      console.log(chart_data)
      $scope['chosenStat' + format] = chart_data;
    }

    $scope.$watch('chosen_option',function(chosen_option){
      if ($scope.odi_data){
        plot_graph($scope.odi_data, 'odi');
      }
      if ($scope.test_data){
        plot_graph($scope.test_data, 'test');
      }

      $scope.chosenStat = $scope['chosenStat' + chosen_option.format.toLowerCase()];
    },true)

    Data.get_local('scripts/lib/sachin_odi_summary.json').success(function(api_data){
      $scope.odi_data = api_data;

      $scope.charting_options = function(){
        var json_options = _.keys(api_data);

        var get_attr_options = function(){
          var all_attrs = _.keys(api_data[json_options[0]][0]);
          console.log(all_attrs);
          var name_index = all_attrs.indexOf("name");
          all_attrs.splice(name_index,1);
          return all_attrs
        }
        return {
          json_options: json_options,
          attr_options: get_attr_options()
        }
      }()
      
      $scope.charting_options.format_options = ['ODI', 'Test'];
      $scope.chosen_option = {
        json_option: $scope.charting_options.json_options[0],
        attr_option: $scope.charting_options.attr_options[1],
        format: $scope.charting_options.format_options[0]
      }
      
      plot_graph($scope.odi_data, 'odi');
    });


    Data.get_local('scripts/lib/test/sachin_test_summary.json').success(function(api_data){
      $scope.test_data = api_data;

      $scope.charting_options = function(){
        var json_options = _.keys(api_data);

        var get_attr_options = function(){
          var all_attrs = _.keys(api_data[json_options[0]][0]);
          console.log(all_attrs);
          var name_index = all_attrs.indexOf("name");
          all_attrs.splice(name_index,1);
          return all_attrs
        }
        return {
          json_options: json_options,
          attr_options: get_attr_options()
        }
      }()
      
      $scope.charting_options.format_options = ['ODI', 'Test'];
      $scope.chosen_option = {
        json_option: $scope.charting_options.json_options[0],
        attr_option: $scope.charting_options.attr_options[1],
        format: $scope.charting_options.format_options[0]
      }
      
      plot_graph($scope.odi_data, 'test');
    });


  });
 
window.onload = window.onresize = window.onorientationchange = function(){
  sizeUI();
  sizeYoutube();
  setChartSize($('.blackBackground ').filter(':visible').length);
}

var screenWidth, tileCount, tileSize, chartWidth, fontSize, screenHeight;

function setChartSize(adder){
  screenHeight = window.innerHeight;
  var heightSize = screenHeight-(adder*45)-80;
  $('.hc-bars').css({'height' : heightSize+'px'})
  $('.container').css({'height' : heightSize+80+'px'})
  return heightSize;
}

function sizeYoutube(){
  screenWidth = window.innerWidth;
  var heightSize = screenWidth*66.66/100;
  $('iframe').css({'height' : heightSize+'px'});
  return heightSize;
}

function sizeUI() {
  fontSize = '24px';
  screenWidth = window.innerWidth;
  screenWidth = screenWidth > 1024 ? 1024 : screenWidth;
  if(screenWidth < 320){
    tileCount = 2;
  } else {
    tileCount = Math.round(screenWidth / 160);
  }  
  tileSize = (screenWidth - 4) / tileCount;
  chartWidth = screenWidth;
  
  if(screenWidth < 200) {
    fontSize = '14px';  
  } else if(screenWidth < 270) {
    fontSize = '20px';
  }

  $('h2').css({'font-size': fontSize});
  $('.col-md-3').css({'width': tileSize+'px', 'height': tileSize+'px'});
  $('.tile').css({'visibility': 'visible'});
}