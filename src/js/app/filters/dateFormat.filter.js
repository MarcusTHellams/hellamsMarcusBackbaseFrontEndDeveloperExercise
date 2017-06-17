(function () {
    angular.module('myApp.filters.dateFormat', [])
        .filter('dateFormat', DateFormat);
    //Using this to format the date recived back from the openweather map api call  and output it in the UI. Did it this way so not to pollute my component controller and to keep in track with the single responsiblity philosphy
    function DateFormat() {
        return function (input) {
            return moment.unix(input).format('dddd MMMM Do YYYY');
        };
    }
})();