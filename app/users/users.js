'use strict';

angular.module('testaller.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'users/new.html',
      controller: 'UsersNewCtrl'
    })
    .when('/users/:id', {
      templateUrl: 'users/edit.html',
      controller: 'UsersEditCtrl'
    });
}])

.controller('UsersNewCtrl', ['$scope', '$http', '$location', '$localStorage', 'API_URL',
                            function($scope, $http, $location, $localStorage, API_URL) {
  $scope.loading = false;
  $scope.error   = {};

  $scope.signup = function(email, password, password_confirmation) {
    $scope.loading = true;

    $http.post(API_URL + '/signup', {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }).success(function(response) {
      if(reponse.auth_token) {
        $localStorage.auth_token = response.auth_token;
        $location.path('/home');
      } else {
        $scope.error.message = {};
        $scope.loading = false;
      }
    });
  };
}])

.controller('UsersEditCtrl', ['$scope', function($scope) {
  $scope.update = function($event) {
    $location.path('/home');
  };
}]);
