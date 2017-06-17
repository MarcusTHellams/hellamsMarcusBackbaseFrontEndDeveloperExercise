(function () {
    angular.module('myApp', ['myApp.components.weatherList']);

    // I'm bootstrapping the app the following way because it's the modern way Angular 1.x apps are bootstrapped these days. 

    angular.element().ready(function () {
        // bootstrap the app manually
        angular.bootstrap(document, ['myApp']);
    });

})();