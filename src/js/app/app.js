(function () {
    angular.module('myApp', ['myApp.components.weatherList']);

    angular.element().ready(function () {
        // bootstrap the app manually
        angular.bootstrap(document, ['myApp']);
    });

})();