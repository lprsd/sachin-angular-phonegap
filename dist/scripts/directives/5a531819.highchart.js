'use strict';

angular.module('app.directives')

.directive('summarychart', function () {
  return {
    restrict: 'E',
    template: '<div class="hc-bars"></div>',
    scope: {
        chartData: "=chartId"
    },
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart: {
          renderTo: element[0],
          type: attrs.type || null,
          height: attrs.height || 350,
          width: attrs.width
        },
        colors: [attrs.color]
      };
      var chart;
        //Update when charts data changes
        scope.$watch(function() { return scope.chartData; }, function(value) {
          if(!value) return;
            var deepCopy = true;
            var newSettings = {};
            $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
            if (!chart || scope.chartData.series.length != chart.series.length || scope.chartData.series[0].data.length != chart.series[0].data.length) {
              chart = new Highcharts.Chart(newSettings);
            } else {
              for (var i = 0; i < chart.series.length; i++) {
                // chart.series[i].setData(scope.chartData.series[i].data);
                var new_data = scope.chartData.series[i].data;
                for (var j=0;j<new_data.length;j++){
                  chart.series[i].data[j].update(new_data[j]);
                }                
              }
            }
        }, true);
      }
    };
})


.directive('chart', function () {
  return {
    restrict: 'E',
    template: '<div class="hc-bars"></div>',
    scope: {
        chartData: "=chartId"
    },
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart: {
          renderTo: element[0],
          type: attrs.type || null,
          height: attrs.height,
          width: attrs.width
        },
        colors: [attrs.color]
      };
      var chart;
        //Update when charts data changes
        scope.$watch(function() { return scope.chartData; }, function(value) {
          if(!value) return;
            var deepCopy = true;
            var newSettings = {};
            $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
            if (scope.chartData && scope.chartData.series.length > 0) {
              chart = new Highcharts.Chart(newSettings);
            } else {
              for (var i = 0; i < chart.series.length; i++) {
                // chart.series[i].setData(scope.chartData.series[i].data);
                var new_data = scope.chartData.series[i].data;
                for (var j=0;j<new_data.length;j++){
                  chart.series[i].data[j].update(new_data[j]);
                }                
              }
            }
        }, true);
      }
    };
})



.directive('fbshare',function(){
  return function(scope,element,attrs, $location){
    var currentType = attrs.sharetype;

    element.bind("click", function(){
        var chart = $('.hc-bars').filter(':visible').highcharts();
        var svg = chart.getSVG();
        var width = parseInt(svg.match(/width="([0-9]+)"/)[1]),
        height = parseInt(svg.match(/height="([0-9]+)"/)[1]),
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        if (canvas.getContext && canvas.getContext('2d')) {
        
            canvg(canvas, svg);
            
            var image = canvas.toDataURL("image/png");
    
            console.log(image);
        } else {
            alert ("Your browser doesn't support this feature, please use a modern browser");
        }

        // var base_image = new Image();
        // svg = "data:image/svg+xml,"+svg;
        // base_image.src = svg;

        if(window.plugins != undefined){
          if(currentType == 'facebook'){
            window.plugins.socialsharing.shareViaFacebook('Sachin is great because:   #SachinStats', '', image, 'http://j.mp/sachins');  
          }
          else if(currentType == 'twitter'){
            window.plugins.socialsharing.shareViaTwitter('Sachin is great because:   #SachinStats', '', image, 'http://j.mp/sachins');  
          }
          else{
            window.plugins.socialsharing.share('Sachin is great because:   #SachinStats', '', image, 'http://j.mp/sachins');  
          }
        }
        else{
          window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http%3A%2F%2Fj.mp%2Fsachins&p[image][0]="+image+"&p[title]=Sachin%27s%20Stats&p[summary]=Sachin%20is%20great%20because:%20%23SachinStatsApp", '_blank')
        }
    })
  }
})
