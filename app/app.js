'use strict';

// Declare app level module which depends on views, and components
angular.module('testaller', [
  'ui.router',
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
.constant('API_URL', 'https://testaller-rails.herokuapp.com')
.run(['authManager', function(authManager) {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
}])
.run(['$http', '$localStorage', function($http, $localStorage) {
  $http.defaults.headers.common.Authorization = $localStorage.auth_token;
}])
.config(['$locationProvider', '$urlRouterProvider', 'jwtOptionsProvider', '$httpProvider', '$localStorageProvider',
        function($locationProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider, $localStorageProvider) {

  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/app/home');

  jwtOptionsProvider.config({
    tokenGetter: function() {
      return $localStorageProvider.get('auth_token');
    },
    unauthenticatedRedirectPath: '/app/signin',
    whiteListedDomains: ['testaller-rails.herokuapp.com', '127.0.0.1']
  });

  $httpProvider.interceptors.push('jwtInterceptor');
}]);
