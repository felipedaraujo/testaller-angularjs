'use strict';

// Declare app level module which depends on views, and components
angular.module('testaller', [
  'ngRoute',
  'testaller.signin',
  'testaller.home',
  'testaller.companies',
  'testaller.orders',
  'testaller.users',
  'testaller.version',
  'ui.bootstrap',
  'ngStorage'
])
.constant('API_URL', 'https://testaller-rails.herokuapp.com')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
