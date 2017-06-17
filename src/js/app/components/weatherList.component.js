(function () {
    angular.module('myApp.components.weatherList', ['myApp.services.weatherService', 'myApp.filters.averageTemperature', 'myApp.filters.dateFormat'])
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
                });
        }
    }
})();