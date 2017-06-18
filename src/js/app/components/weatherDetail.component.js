(function () {
    angular.module('myApp.components.weatherDetail', ['myApp.services.weatherService', 'myApp.filters.averageTemperature', 'myApp.filters.dateFormat', 'highcharts-ng'])
        .component('weatherDetail', {
            controller: WeatherDetail,
            bindings: {
                activeCity: '<'
            },
            // templateUrl: 'templates/weatherDetail.template.html',
            template: '<div class="row"> <div class="col-sm-12"> <a ui-sref="weatherlist" class="btn btn-primary">BACK</a> </div> </div> <br> <div class="row"> <div class="col-sm-6"> <div class="panel panel-success" ng-if="$ctrl.activeCity"> <div class="panel-heading"> <h4 class="panel-title">{{$ctrl.activeCity.city.name}}</h4> </div> <div class="list-group"> <div class="list-group-item" ng-repeat="day in $ctrl.activeCity.list | limitTo: 5"> <h4 class="list-group-item-heading">{{day.dt | dateFormat}}</h4> <dl class="list-group-item-text dl-horizontal"> <dt>Max Temperature</dt> <dd>{{day.temp.max}} &deg;C</dd> <dt>Minimum Temperature</dt> <dd>{{day.temp.min}} &deg;C</dd> <dt>Humidity</dt> <dd>{{day.humidity}}</dd> <dt>Forecast</dt> <dd>{{day.weather[0].description}} <img ng-src="http://openweathermap.org/img/w/{{day.weather[0].icon}}.png" alt="Weather Icon"> </dd> </dl> </div> </div> </div> </div> <div class="col-sm-6" ng-if="$ctrl.activeCity"> <highchart config="$ctrl.chartOptions"></highchart> </div> </div>'

        });

    WeatherDetail.$inject = ['weatherService'];
    function WeatherDetail(weatherService) {

        var ctrl = this;
        ctrl.chartOptions = {
            chart: {
                type: 'line',
            },
            tooltip: {
                pointFormat: '<div style="text-align:center"><strong>{point.y} </strong></div>',
                valueSuffix: ' °C'

            },
            xAxis: {
                type: 'datetime',
                title: null
            },
            title: {
                text: null
            },
            series: [],
            yAxis: {
                title: {
                    text: 'Temperature'
                }
            }
        };

        ctrl.$onInit = function () {
            chartNewData();
        };

        function chartNewData() {
            var data = [{ data: [], showInLegend: false }];
            var current;
            for (var i = 0; i < 5; i++) {
                current = ctrl.activeCity.list[i];
                data[0].data.push([moment.unix(current.dt).valueOf(), current.temp.max]);
            }
            ctrl.chartOptions.title.text = ctrl.activeCity.city.name;
            ctrl.chartOptions.series = data;
        }
    }
})();