'use strict';

angular.module('testaller.signin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'SigninCtrl'
  });
}])

.controller('SigninCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.signin = function($event) {
    $location.path('/home');
  };
}]);
