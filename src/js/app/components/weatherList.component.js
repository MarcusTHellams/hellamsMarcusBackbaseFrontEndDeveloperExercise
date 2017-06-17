(function () {
    angular.module('myApp.components.weatherList', ['myApp.services.weatherService', 'myApp.filters.averageTemperature', 'myApp.filters.dateFormat'])
        .component('weatherList', {
            controller: WeatherList,
            templateUrl: 'templates/weatherList.template.html'
        });

    WeatherList.$inject = ['weatherService'];
    function WeatherList(weatherService) {

        var ctrl = this;
        ctrl.cities = [];
        ctrl.activeCity = null;
        ctrl.setActiveCity = setActiveCity;
        ctrl.activeCityId = null;

        ctrl.$onInit = function () {
            weatherService.getCitiesWeather()
                .then(function (response) {
                    ctrl.cities = response;
                });
        };

        function setActiveCity(id) {
            ctrl.activeCityId = id;
            weatherService
                .getCityFiveDayForecast(String(id))
                .then(function (response) {
                    ctrl.activeCity = response;
                });
        }
    }
})();