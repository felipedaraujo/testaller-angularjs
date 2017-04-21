'use strict';

angular.module('testaller.companies', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('app.home', {
    url: '/home',
    controller: 'CompaniesIndexCtrl',
    templateUrl: 'components/companies/index.html',
    data: {
      requiresLogin: true
    }
  })
  .state('app.companies_new', {
    url: '/companies/new',
    controller: 'CompaniesNewCtrl',
    templateUrl: 'components/companies/new.html',
    data: {
      requiresLogin: true
    }
  });
}])

.controller('CompaniesIndexCtrl', ['$scope', '$http', 'API_URL',
                        function($scope, $http, API_URL) {
  $scope.error = {}

  $scope.init = function() {
    $scope.fetchCompanies();
  };

  $scope.fetchCompanies = function() {
    $scope.error = {}

    $http({
      url: API_URL + '/companies',
      method: 'GET',
    }).then(
      response => $scope.companies = response.data,
      error => $scope.error.message = error.data.message
    );
  };
}])

.controller('CompaniesNewCtrl', ['$scope', '$http', '$state', 'API_URL',
                                function($scope, $http, $state, API_URL) {
  $scope.error = {};

  $scope.create = (name, cnpj) => {
    $http({
      url: API_URL + '/companies',
      method: 'POST',
      data: {
        name: name,
        cnpj: cnpj
      }
    }).then(
      () => $state.go('app.home'),
      error => $scope.error.message = error.data.message
    );
  };
}]);
