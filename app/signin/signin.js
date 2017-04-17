'use strict';

angular.module('testaller.signin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'SigninCtrl'
  });
}])

.controller('SigninCtrl', ['$scope', '$http', '$location', '$localStorage', 'API_URL',
                          function($scope, $http, $location, $localStorage, API_URL) {

  $scope.loading = false;
  $scope.error   = {};

  $scope.signin = function(email, password) {
    $scope.loading = true;

    $http.post(API_URL + '/auth/signin', {
      email: email,
      password: password
    }).then(function(response) {
      if(reponse.auth_token) {
        $localStorage.auth_token = response.auth_token;
        $location.path('/home');
      } else {
        $scope.error.message = response.message;
        $scope.loading = false;
      }
    });
  };
}]);
