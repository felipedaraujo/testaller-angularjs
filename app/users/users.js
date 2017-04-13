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

.controller('UsersNewCtrl', ['$scope', function($scope) {
  $scope.signup = function($event) {
    $location.path('/home');
  };
}])

.controller('UsersEditCtrl', ['$scope', function($scope) {
  $scope.update = function($event) {
    $location.path('/home');
  };
}]);
