(function () {
    angular.module('myApp.components.weatherList', ['myApp.services.weatherService', 'myApp.filters.averageTemperature', 'myApp.filters.dateFormat', 'highcharts-ng'])
        .component('weatherList', {
            controller: WeatherList,
            bindings: {
                cities: '<'
            },
            template: '<div class="row"> <div ng-class="{ \'col-sm-4 \': $ctrl.activeCity,  \'col-sm-12 \': !$ctrl.activeCity}"> <div class="list-group"> <a ng-repeat="city in $ctrl.cities" class="list-group-item" ui-sref="weatherDetail({ cityId: city.id })" ng-class="{ \'active \': city.id === $ctrl.activeCityId}"> <h4 class="list-group-item-heading">{{city.name}}</h4> <dl class="list-group-item-text dl-horizontal"> <dt>Wind Speed</dt> <dd>{{city.wind.speed}}</dd> <dt>Average Temperature</dt> <dd>{{city.main | averageTemperature}} &deg;C </dd> </dl> </a> </div> </div> <div class="col-sm-4"> <div class="panel panel-success" ng-if="$ctrl.activeCity"> <div class="panel-heading"> <h4 class="panel-title">{{$ctrl.activeCity.city.name}}</h4> </div> <div class="list-group"> <div class="list-group-item" ng-repeat="day in $ctrl.activeCity.list | limitTo: 5"> <h4 class="list-group-item-heading">{{day.dt | dateFormat}}</h4> <dl class="list-group-item-text dl-horizontal"> <dt>Max Temperature</dt> <dd>{{day.temp.max}} &deg;C</dd> <dt>Minimum Temperature</dt> <dd>{{day.temp.min}} &deg;C</dd> <dt>Humidity</dt> <dd>{{day.humidity}}</dd> <dt>Forecast</dt> <dd>{{day.weather[0].description}} <img ng-src="http://openweathermap.org/img/w/{{day.weather[0].icon}}.png" alt="Weather Icon"> </dd> </dl> </div> </div> </div> </div> <div class="col-sm-4" ng-if="$ctrl.activeCity"> <highchart config="$ctrl.chartOptions"></highchart> </div></div>'
            // templateUrl: 'templates/weatherList.template.html'
        });

    // I seperated the openweather map http calls out into a service(weatherService) so as not to polllute my component file and and in keeping with the single responsiblity philosophy.

    WeatherList.$inject = ['weatherService'];
    function WeatherList(weatherService) {
    }
})();