'use strict';

// Declare app level module which depends on views, and components
angular.module('testaller', [
  'ngRoute',
  'testaller.main',
  'testaller.signin',
  'testaller.home',
  'testaller.companies',
  'testaller.orders',
  'testaller.users',
  'testaller.version',
  'ui.bootstrap',
  'ngStorage',
  'angular-jwt',
  'ui.utils.masks'
])
.constant('API_URL', 'http://127.0.0.1:3000')
.run(['authManager', function(authManager) {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
}])
.run(['$http', '$localStorage', function($http, $localStorage) {
  $http.defaults.headers.common.Authorization = $localStorage.auth_token;
}])
.config(['$locationProvider', '$routeProvider', 'jwtOptionsProvider', '$httpProvider', '$localStorageProvider',
        function($locationProvider, $routeProvider, jwtOptionsProvider, $httpProvider, $localStorageProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});

  jwtOptionsProvider.config({
    tokenGetter: function() {
      return $localStorageProvider.get('auth_token');
    },
    unauthenticatedRedirectPath: '/signin',
    whiteListedDomains: ['https://testaller-rails.herokuapp.com', 'http://127.0.0.1:3000']
  });

  $httpProvider.interceptors.push('jwtInterceptor');
}]);
