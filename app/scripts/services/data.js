angular.module('app.services').factory('Data',['$http', '$rootScope', function ($http, $rootScope){

    var Data = {

        get_local: function(path){
            var promise = $http.get(path).success(
                function(data){
                    window.recent_api_response = data;
                    window.recent_api_url = path;
                    return (data)
                }
            )
            return promise
        },

        get_graph_series: function (each_api_data, chart_label, api_label, y_label){
            var d = _.toArray(each_api_data);
            for (var j in d){
                d[j][chart_label] = +d[j][api_label];
                d[j]['y'] = +(d[j][y_label]).toFixed(1);
            }
            return d
        }
}
    return Data;
}]);

angular.module('app.services').factory('DefaultChartOptions', [function(){
    var defaultChartOptions = {

        chart: {
            style: {
                "fontFamily": "OpenSansCondLight",
                "fontSize": '16px',
                "color": "#666"
            },
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '',
            style: {
                "fontFamily": "OpenSansCondLight",
                fontSize: 16,
                color: "#777"
            }
        },
        "xAxis": {
             lineColor: '#aaa',
             title: { align: 'middle'},
             "labels": {
                 "style": {
                    "color": "#666",
                    "fontFamily": "OpenSansCondLight",
                    "fontSize": "12px"
                },
                "verticalAlign": "middle"
            }
        },
        "yAxis": {
             "lineColor": "#aaa",
             "labels": {
                "style": {
                    "color": "#666",
                    "fontFamily" : "OpenSansCondLight",
                    "fontSize": "12px"
                }
            },
            "title": {
                align: 'middle',
                "style":{
                    "color": "#666",
                    "fontFamily" : "OpenSansCondLight",
                    "fontSize": "12px",
                    "fontWeight": 100
                }
            },
            "maxPadding": 0,
            "alternateGridColor": false,
            "gridLineWidth": 0,
            "minTickInterval": 20
        },
        "plotOptions": {
        },
        "credits" : {
            "enabled": false
        },
        "legend": {
            itemMarginBottom: 7,
            itemStyle: {
                    color: '#666',
                    fontFamily: 'OpenSansCondLight',
                    fontSize: '13px'
            }
        }
    };

    return defaultChartOptions;
}]);

angular.module('app.services').factory('ChartOptions', ['DefaultChartOptions', function (defaultChartOptions){

    booking_curve_chart = {

        "chart": {
            "type": "line"
        },
        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y:-20,
            borderWidth:0,
            itemStyle: {
                fontFamily: "OpenSansCondLight",
                "fontSize": '16px',
                "color": "#666"
            }
        },
        "title": {
            "text": ''
        },
        "subtitle": {
            "text": ''
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return '<b>' + this.x + ' days: ' +Math.round(this.y) + '%</b>';
            }
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 4,
                    symbol: "circle"
                }
            }
        },
        xAxis:{
            gridLineWidth: 0,
            tickLength: 0,
            allowDecimals: false,
            categories: [],
            title: { text: 'Reading Days', align: 'middle',
                style: {color: '#666',
                    fontWeight: 'normal'}
            },
            min: 0,
            max: 63, //9 weeks, as suggested by Carlos.
            tickInterval: 7,
            labels:{
                format: '{value}'
            },
            type:'number'
        },
        "credits" : {
            "enabled": false
        },
        yAxis:{
            title: {text: ''},
            min: 0,
            max: 100,
            tickLength: 0,
            gridLineWidth: 0,
            plotLines: [{
                value: 0,
                width: 0,
                color: '#000'
            }]
        }
    };

    cluster ={};
    cm_chart = {};
    angular.copy(booking_curve_chart,cluster);
    angular.copy(booking_curve_chart,cm_chart);
    cm_chart.tooltip = {
        enabled: true,
        formatter: function(){
            return '<b>' + this.y +'</b>';
        }
    }
    cluster.xAxis.labels.format = '{value}'

    var BCC = {

        pos: $.extend(true, booking_curve_chart, defaultChartOptions),
        cluster_chart: $.extend(true, cluster, defaultChartOptions),
        channel_mix_chart : cm_chart
    };


    return BCC
}]);
angular.module('app.services').factory('LOSChart', ['DefaultChartOptions', function (defaultChartOptions){

    los_chart = {

        "chart": {
            "type": "column"
        },
        xAxis:{
            gridLineWidth: 0,
            tickLength: 0,
            allowDecimals: false,
            categories: [''],
            title: { text: 'Days', align: 'high',
                style: {color: '#666',
                    fontWeight: 'normal'}
            },
            labels:{
                format: '{value}'
            },
            type:'category'
        },
        yAxis:{
            title: {text: ''},
            min: 0,
            max: 100
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return '<b>'+this.y+'</b>';
            }
        },
        legend:{
            enabled: false
        },
        "title": {
            "text": ''
        }

    };

    cluster ={};
//    angular.copy(booking_curve_chart,cluster)
//    cluster.xAxis.labels.format = '{value}'

    var BCC = {

        pax: $.extend(true, los_chart, defaultChartOptions),
        cluster_chart: $.extend(true, cluster, defaultChartOptions)

    };


    return BCC
}]);

angular.module('app.services').factory('ControlTowerChart', ['DefaultChartOptions', function (defaultChartOptions){

    ctc_options = {

        chart: {
            type: "spline"
        },

        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y:-20,
            borderWidth:0
        },
        "title": {
            "text": ''
        },
        "subtitle": {
            "text": ''
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return '<b>' + this.series.name + " "+this.x + ' weeks: ' +Math.round(this.y) + '</b>';
            }
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 4,
                    symbol: "circle",
                    enabled: false
                }
            }
        },
        xAxis:{
            title: { text: 'Weeks', align: 'middle',
                style: {color: '#666',
                    fontWeight: 'normal'}
            },
            labels:{
                format: '{value}'
            },
            type:'number'
//            categories: _.range(54)
        },
        "credits" : {
            "enabled": false
        },
        yAxis:{
            title: {text: ''}
        }
    };


    return $.extend(true,ctc_options,defaultChartOptions)

}]);

angular.module('app.services').factory('PostedFlightsChartOptions', ['DefaultChartOptions', function (defaultChartOptions){

    posted_flight_bar_chart = {

         chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                },
                tickLength: 0,
                "lineWidth": 0
            },
            yAxis: {
                min: 0,
                "lineWidth": 1,
                "lineColor": "#666",
                title:{
                    text: "# of Posted Flights"
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                         formatter: function() {
                            return '<span class="orange dataLabel">'+ this.point.posted_percent.toFixed(1) +'</span>'+
                                '|<span class="brown dataLabel">'+ this.point.total_percent.toFixed(1) + '</span>';
                        }
                    },
                    pointWidth: 22
                }
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
             tooltip: {
                formatter: function() {
                    return '<b>'+ Math.round(this.y) +'</b>';
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                color: "blue",
                data: []
            }]
}
    var BCC = {

        pos: $.extend(true, posted_flight_bar_chart, defaultChartOptions) 

    };


    return BCC
}]);

angular.module('app.services').factory('ChartOptionsFinancialKPI',['DefaultChartOptions', function (defaultChartOptions){

    fin_kpi_chart = {

        "chart": {
            "type": "line"
        },
        legend: {
            enabled: false
        },
        "title": {
            "text": ''
        },
        "subtitle": {
            "text": ''
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return '<b>'+ Math.round(this.y) +'</b>';
            }
        },
        xAxis:{
            categories: [],
            gridLineWidth: 0,
            lineColor : "#666666",
            labels: {
                rotation: -45,
                style: {
                    fontSize: 8.7
                }
            }
        },
        "credits" : {
            "enabled": false
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 4,
                    symbol: "circle"
                }
            }
        },
        yAxis:{
            title: {text: ''},
            tickLength: 0,
            gridLineWidth: 0,
            lineColor : "#666666",
            labels: {
                style: {
                    fontSize: 8.7
                }
            },
            plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#000'
                }]
        },
        series: []
    }


    var BCC = {

        pos: $.extend(true, fin_kpi_chart, defaultChartOptions)

    }


    return BCC;
}]);

angular.module('app.services').factory('PieChartOptions',[function ($http){

    var simple_pie_chart = {

        chart: {
            style: {"fontFamily": "OpenSansCondLight"},
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            animation: {
                duration: 1800
            }
        },
        title: {
            text: '',
            style: {
                "fontFamily": "OpenSansCondLight",
                fontSize: 16,
                color: "#777"
            },
            align: 'center',
            verticalAlign: 'bottom'
        },
        tooltip: {
            formatter: function(){
                return '<b>'+ this.key + ': </b>' + this.y;
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '{point.percentage:.1f} %',
                    style: { fontFamily: "OpenSansCondLight,Georgia,Times,serif"}
                }
            }
        },
        series: [{
            type: 'pie',
            data: [],
            size: '50%'
        }]
        
    }


    var BCC = {

        simplePie: simple_pie_chart

    }
    return BCC;
}]);

angular.module('app.services').factory('StackChartOptions',[function (){

    traffic_comp_stack_chart = {

        chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                 lineColor: 'white',
                categories: [],
                labels: {
                    enabled: false,
                    y: 20
                }
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                gridLineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'white'
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        x: 70,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',
                        formatter: function() {
                            return ''+ this.y +' % '+
                                this.series.name;
                        }
                    }
                }
            },
            series: []
    }


    var BCC = {

        pos: traffic_comp_stack_chart

    }
    return BCC;
}]);

angular.module('app.services').factory('StackColumnChartOptions',['DefaultChartOptions', function (defaultChartOptions){

    shareIndex = {

        chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                //y: -15,
                borderWidth:0
            },
            xAxis: {
                 lineColor: '#aaa',
                categories: [],
                labels: {
                    y: 20
                }
            },
            yAxis: {
                min: 0,
                gridLineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: true
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ Math.round(this.y) +'</b>';
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: []
    }


    var BCC = {

        pos: $.extend(true, shareIndex, defaultChartOptions)

    }
    return BCC;
}]);

angular.module('app.services').factory('BubbleChartOptions',['DefaultChartOptions', function (defaultChartOptions){

    fareStructure = {

            chart: {
                type: 'scatter',
                marginTop: 120,
                marginRight: 50
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                title: {
                    enabled: false
                },
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: ''
                },
                "gridLineWidth": 1
            },
            legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                borderWidth:0
            },
            plotOptions: {
                series: {
                    marker: {
                        radius: 5,
                        symbol: "circle"
                    }
                },
                scatter: {
                    dataLabels: {
                        x: 25,
                        y: 10,
                        enabled: true,
                        useHTML: true,
                        formatter: function() {
                            return '<span class="dataLabel">' + 
                            this.y + 
                            '</span>';
                        }
                    },
                    pointWidth: 22
                
                }
            },
            tooltip: { enabled: true,
                        formatter: function() {
                            return '<b>AP: </b>' + 
                            this.point.ap + '  ' + 
                            '<b>Min Stay: </b>' +
                            this.point.los; 
                        } 
                    },
            series: [{name: 'OW', color: "#a462c5", data: [], dataLabels: {color: "#a462c5"}}, //OW Bubbles 
                {name: 'RT', color: "#d1cc1f", data: [], dataLabels: {color: "#d1cc1f"}} //RT Bubbles
                ]
    }


    var BCC = {

        fareStructure: $.extend(true, fareStructure, defaultChartOptions)

    }
    return BCC;
}]);

angular.module('app.services').factory('AreaChartOptions',[function ($http){

    var area_chart = {

        chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Sachin Lifetime Score Chart'
            },
            subtitle: {
                text: 'God Stats'
            },
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: 'Runs',
                    style: {
                        color: ''
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: '',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    style: {
                        color: '#4572A7'
                    }
                },
              maxPadding: 0,
              minPadding:0,
              opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                floating: true,
                align: 'right',
                verticalAlign: 'top',
                backgroundColor: '#FFFFFF'
            },
            series: [{
                name: 'Average',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: '#89A54E',
                type: 'spline',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ''
                }
    
            }, {
                name: 'Runs',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: '#4572A7',
                type: 'area',
                data: [],
                tooltip: {
                    valueSuffix: ''
                }
            },
            {
                name: 'Top Score',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                color: 'red',
                type: 'spline',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ''
                }
            }]
        
    }


    var BCC = {

        areaChart: area_chart

    }
    return BCC;
}]);
