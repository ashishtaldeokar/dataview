'use strict';

/**
 * @ngdoc overview
 * @name dataviewApp
 * @description
 * # dataviewApp
 *
 * Main module of the application.
 */
angular
  .module('dataviewApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/charts', {
        templateUrl: 'views/charts.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
