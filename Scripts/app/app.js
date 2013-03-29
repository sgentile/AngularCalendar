app = {};

app.calendarMain = angular.module('CalendarMain', ['ui']) //ui is the angular-ui module
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: app.HomeCtrl });
        $routeProvider.when('/events', { templateUrl: 'partials/calendar.html', controller: app.CalendarCtrl });
        $routeProvider.otherwise({ redirectTo: '/home' }); //make this the default
    }]);
