(function () {
    angular.module('myApp.filters.averageTemperature', [])
        .filter('averageTemperature', AverageTemperature);
    //Using this to get the average temperature and output it in the UI. Did it this way so not to pollute my component controller and to keep  in track with the single responsiblity philosphy
    function AverageTemperature() {
        return function (obj) {
            return (obj.temp_max + obj.temp_min) / 2;
        };
    }
})();