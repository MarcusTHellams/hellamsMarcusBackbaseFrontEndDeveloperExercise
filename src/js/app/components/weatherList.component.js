(function () {
    angular.module('myApp.components.weatherList', ['myApp.services.weatherService', 'myApp.filters.averageTemperature', 'myApp.filters.dateFormat', 'highcharts-ng'])
        .component('weatherList', {
            controller: WeatherList,
            template: '<div class="row"> <div ng-class="{\'col-sm-4\': $ctrl.activeCity, \'col-sm-12\': !$ctrl.activeCity}"> <div class="list-group"> <a ng-repeat="city in $ctrl.cities" class="list-group-item" href="javascript:void(0);" ng-click="$ctrl.setActiveCity(city.id)" ng-class="{\'active\': city.id === $ctrl.activeCityId}"> <h4 class="list-group-item-heading">{{city.name}}</h4> <dl class="list-group-item-text dl-horizontal"> <dt>Wind Speed</dt> <dd>{{city.wind.speed}}</dd> <dt>Average Temperature</dt> <dd>{{city.main | averageTemperature}} &deg;C </dd> </dl> </a> </div> </div> <div class="col-sm-4"> <div class="panel panel-success" ng-if="$ctrl.activeCity"> <div class="panel-heading"> <h4 class="panel-title">{{$ctrl.activeCity.city.name}}</h4> </div> <div class="list-group"> <div class="list-group-item" ng-repeat="day in $ctrl.activeCity.list | limitTo: 5"> <h4 class="list-group-item-heading">{{day.dt | dateFormat}}</h4> <dl class="list-group-item-text dl-horizontal"> <dt>Max Temperature</dt> <dd>{{day.temp.max}} &deg;C</dd> <dt>Minimum Temperature</dt> <dd>{{day.temp.min}} &deg;C</dd> <dt>Humidity</dt> <dd>{{day.humidity}}</dd> <dt>Forecast</dt> <dd>{{day.weather[0].description}} <img ng-src="http://openweathermap.org/img/w/{{day.weather[0].icon}}.png" alt="Weather Icon"> </dd> </dl> </div> </div> </div> </div> <div class="col-sm-4" ng-if="$ctrl.activeCity"> <highchart config="$ctrl.chartOptions"></highchart> </div></div>'
        });

    // I seperated the openweather map http calls out into a service(weatherService) so as not to polllute my component file and and in keeping with the single responsiblity philosophy.

    WeatherList.$inject = ['weatherService'];
    function WeatherList(weatherService) {

        var ctrl = this;
        ctrl.cities = [];
        ctrl.activeCity = null;
        ctrl.setActiveCity = setActiveCity;
        ctrl.activeCityId = null;
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
            //call the weatherService.getCitiesWeather method when the component is initiated to populate the app with the 5 cities weather.
            weatherService.getCitiesWeather()
                .then(function (response) {
                    ctrl.cities = response;
                });
        };

        // When one of the cities is clicked I set the activeCityid to set a class on the selected city in the UI so the user has a visual representation which city is chosen on the list. I also call weatherService.getCityFiveDayForecast with the approprite cityid to the openweather map api to get the five day forecast
        function setActiveCity(id) {
            ctrl.activeCityId = id;
            weatherService
                .getCityFiveDayForecast(String(id))
                .then(function (response) {
                    ctrl.activeCity = response;
                    chartNewData();
                });
        }

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