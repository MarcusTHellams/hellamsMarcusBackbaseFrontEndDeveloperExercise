(function () {
    angular.module('myApp.filters.dateFormat', [])
        .filter('dateFormat', DateFormat);

    function DateFormat() {
        return function (input) {
            return moment.unix(input).format('dddd MMMM Do YYYY');
        };
    }
})();