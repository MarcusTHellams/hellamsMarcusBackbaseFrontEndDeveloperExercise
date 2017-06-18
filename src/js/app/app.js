(function () {
    angular.module('myApp', ['myApp.components.weatherList', 'myApp.components.weatherDetail', 'ui.router', 'myApp.services.weatherService'])
        .config(config);

    // I'm bootstrapping the app the following way because it's the modern way Angular 1.x apps are bootstrapped these days. 

    angular.element().ready(function () {
        // bootstrap the app manually
        angular.bootstrap(document, ['myApp']);
    });
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        var states = [
            {
                name: 'weatherlist',
                url: '/',
                component: 'weatherList',
                // This state defines a 'people' resolve
                // It delegates to the PeopleService to HTTP fetch (async)
                // The people component receives this via its `bindings: `
                resolve: {
                    cities: getWeather
                }
            },

            {
                name: 'weatherDetail',
                // This state takes a URL parameter called personId
                url: '/city/{cityId}',
                component: 'weatherDetail',
                // This state defines a 'person' resolve
                // It delegates to the PeopleService, passing the personId parameter
                resolve: {
                    activeCity: getCityFiveDayForecast
                }
            }
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });

        getWeather.$inject = ['weatherService'];
        function getWeather(weatherService) {
            return weatherService.getCitiesWeather();
        }
        getCityFiveDayForecast.$inject = ['weatherService', '$transition$'];
        function getCityFiveDayForecast(weatherService, $transition$) {
            return weatherService.getCityFiveDayForecast($transition$.params().cityId);
        }
    }

})();