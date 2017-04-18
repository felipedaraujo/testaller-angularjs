'use strict';

angular.module('testaller.companies', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/companies/new', {
    templateUrl: 'companies/new.html',
    controller: 'CompaniesNewCtrl',
    data: {
      requiresLogin: true
    }
  });
}])

.controller('CompaniesNewCtrl', ['$scope', '$http', '$location', 'API_URL',
                                function($scope, $http, $location, API_URL) {
  $scope.loading = false;

  $scope.create = function(name, cnpj) {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies',
      method: 'POST',
      data: {
        name: name,
        cnpj: cnpj
      }
    }).then(function(response) {
      $scope.loading = false;

      $location.path('/home');
    });
  };
}]);
