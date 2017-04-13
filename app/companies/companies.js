'use strict';

angular.module('testaller.companies', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/companies/new', {
    templateUrl: 'companies/new.html',
    controller: 'CompaniesNewCtrl'
  });
}])

.controller('CompaniesNewCtrl', ['$scope', function($scope) {
}]);
