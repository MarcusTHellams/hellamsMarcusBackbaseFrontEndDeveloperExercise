(function () {
    angular.module('myApp.components.weatherList', ['myApp.services.weatherService', 'myApp.filters.averageTemperature', 'myApp.filters.dateFormat', 'highcharts-ng'])
        .component('weatherList', {
            controller: WeatherList,
            templateUrl: 'templates/weatherList.template.html'
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