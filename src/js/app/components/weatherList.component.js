(function () {
    angular.module('myApp.components.weatherList', [])
        .component('weatherList', {
            controller: WeatherList,
            templateUrl: 'templates/weatherList.template.html'
        });
    WeatherList.$inject = [];
    function WeatherList() { }
})();