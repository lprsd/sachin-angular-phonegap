'use strict';

angular.module('app.controllers')
  .controller('MainCtrl', function ($scope) {
    $scope.colors = ['#334D5C','#45b29d','#EFC94C','#E27A3F','#DF5A49'];
    
    $scope.tiles = [{name: 'Sachin Stats', url: '#/SachinStatsLanding', class:'col-md-12'},{name: 'Career Summary', url: '#/summary', class:'col-md-6'},
    				{name: 'Awesome Facts', url: '#/AwesomeFacts', class:'col-md-3'},{name: 'Social Feed', url: '#/SocialFeed', class:'col-md-3'}];

  })

  .controller('SummaryCtrl', function($scope, Data, PieChartOptions){

    var get_series_data = function(api_data, chosen_json, chosen_attr){
      var colorsArray = ['#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC','#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', '#A4A1CC'];
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

    var plot_graph = function(){
      var chosen_json = 'v Country';
      var chosen_attr = 'Runs';
      var api_data = $scope.r_api_data;

      var series_data = get_series_data(api_data,chosen_json,chosen_attr);
      var chart_data = angular.copy(PieChartOptions.simplePie);
      chart_data.series = [{name:chosen_json, type: 'pie', data:series_data}];
      chart_data.title.text = chosen_json;
      $scope.chosenStat = chart_data;
    }

    Data.get_local('scripts/lib/sachin_odi_summary.json').success(function(api_data){
      $scope.r_api_data = api_data;
      plot_graph();

    });


  });
