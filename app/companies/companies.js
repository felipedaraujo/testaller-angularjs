'use strict';

angular.module('testaller.companies', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app.companies_new', {
    url: '/companies/new',
    controller: 'CompaniesNewCtrl',
    templateUrl: 'companies/new.html',
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
