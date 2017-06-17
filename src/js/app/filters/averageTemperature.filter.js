(function () {
    angular.module('myApp.filters.averageTemperature', [])
        .filter('averageTemperature', AverageTemperature);

    function AverageTemperature() {
        return function (obj) {
            return (obj.temp_max + obj.temp_min) / 2;
        };
    }
})();