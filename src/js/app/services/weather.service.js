(function () {
    angular.module('myApp.services.weatherService', [])
        .service('weatherService', WeatherService);
    WeatherService.$inject = ['$http'];
    function WeatherService($http) {

        return {
            getCitiesWeather: getCitiesWeather,
            getCityFiveDayForecast: getCityFiveDayForecast
        };

        // functions to make the api calls to openweather map api        
        function getCitiesWeather() {
            return $http.get(
                'http://api.openweathermap.org/data/2.5/group?id=' +
                '2643743' +
                ',2759794' +
                ',6455259' +
                ',2950159' +
                ',4306693' +
                '&units=metric' +
                '&APPID=ef5933c66e0492080473b4ec086c7f9f'
            )
                .then(function (response) {
                    return response.data.list;
                });
        }

        function getCityFiveDayForecast(id) {
            return $http.get(
                'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + id + '&APPID=ef5933c66e0492080473b4ec086c7f9f&units=metric'
            )
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();