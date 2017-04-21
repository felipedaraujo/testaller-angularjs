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
  $scope.loading = false;

  $scope.init = function() {
    $scope.fetchCompanies();
  };

  $scope.fetchCompanies = function() {
    $scope.error = {}
    $scope.loading = true;

    $http({
      url: API_URL + '/companies',
      method: 'GET',
    }).then(response => {
      $scope.loading = false;
      $scope.companies = response.data;
    }, error => {
      $scope.loading = false;
      $scope.error.message = error.data.message;
    });
  };
}])

.controller('CompaniesNewCtrl', ['$scope', '$http', '$state', 'API_URL',
                                function($scope, $http, $state, API_URL) {
  $scope.error = {};
  $scope.loading = false;

  $scope.create = (name, cnpj) => {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies',
      method: 'POST',
      data: {
        name: name,
        cnpj: cnpj
      }
    }).then(() => {
      $scope.loading = false;
      $state.go('app.home');
    }, error => {
      $scope.loading = false;
      $scope.error.message = error.data.message;
    });
  };
}]);
