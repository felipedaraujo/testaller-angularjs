'use strict';

// Declare app level module which depends on views, and components
angular.module('testaller', [
  'ui.router',
  'testaller.companies',
  'testaller.main',
  'testaller.orders',
  'testaller.signin',
  'testaller.users',
  'testaller.version',
  'ui.bootstrap',
  'ui.bootstrap.typeahead',
  'ngStorage',
  'angular-jwt',
  'ui.utils.masks',
  'angular-loading-bar',
  'ngAnimate'
])
.constant('API_URL', 'https://testaller-rails.herokuapp.com')
// .constant('API_URL', 'http://127.0.0.1:3000')
.run(['authManager', function(authManager) {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
}])
.run(['$http', '$localStorage', function($http, $localStorage) {
  $http.defaults.headers.common.Authorization = $localStorage.auth_token;
}])
.config(['$locationProvider', '$urlRouterProvider', 'jwtOptionsProvider', '$httpProvider', '$localStorageProvider', 'cfpLoadingBarProvider',
        function($locationProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider, $localStorageProvider, cfpLoadingBarProvider) {

  $locationProvider.hashPrefix('!');

  cfpLoadingBarProvider.includeSpinner = false;

  if ($localStorageProvider.get('auth_token')) {
    $urlRouterProvider.otherwise('/app/home');
  } else {
    $urlRouterProvider.otherwise('/app/signin');
  }

  jwtOptionsProvider.config({
    tokenGetter: () =>  $localStorageProvider.get('auth_token'),
    unauthenticatedRedirectPath: '/app/signin',
    whiteListedDomains: ['testaller-rails.herokuapp.com', '127.0.0.1']
  });

  $httpProvider.interceptors.push('jwtInterceptor');
}]);
