'use strict';

angular.module('testaller.signin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'SigninCtrl'
  });
}])

.controller('SigninCtrl', ['$scope', '$http', '$location', '$localStorage', 'authManager', 'API_URL',
                          function($scope, $http, $location, $localStorage, authManager, API_URL) {

  $scope.loading = false;
  $scope.error   = {};

  $scope.signin = function(email, password) {
    $scope.loading = true;

    $http({
      url: API_URL + '/auth/signin',
      skipAuthorization: true,
      method: 'POST',
      data: {
        email: email,
        password: password
      }
    }).then(function(response) {
      if(response.data.auth_token) {
        authManager.authenticate();
        
        $localStorage.auth_token = response.data.auth_token;
        $location.path('/home');
      } else {
        $scope.error.message = response.message;
        $scope.loading = false;
      }
    });
  };
}]);
