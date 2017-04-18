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
    $scope.error   = {};

    $http({
      url: API_URL + '/signup',
      skipAuthorization: true,
      method: 'POST',
      data: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }).then(function(response) {
      $localStorage.auth_token = response.data.auth_token;
      $location.path('/home');
    }, function(error) {
      $scope.error.message = error.data.message;
      $scope.loading = false;
    });
  };
}])

.controller('UsersEditCtrl', ['$scope', function($scope) {
  $scope.update = function($event) {
    $location.path('/home');
  };
}]);
