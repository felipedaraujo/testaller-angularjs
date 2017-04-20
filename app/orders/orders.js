'use strict';

angular.module('testaller.orders', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app.orders_new', {
    url: '/orders/new',
    controller: 'OrdersNewCtrl',
    templateUrl: 'orders/new.html',
    data: {
      requiresLogin: true
    }
  });
}])

.controller('OrdersNewCtrl', ['$scope', '$http', 'API_URL',
                        function($scope, $http, API_URL) {
  $scope.init = function() {
    $scope.fetchCompanies();
  };

  $scope.fetchCompanies = function() {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies',
      method: 'GET',
    }).then(function(response) {
      if(response.data) {
        $scope.loading = false;
        $scope.companies = response.data;
      } else {
        $scope.loading = false;
        $scope.error.message = response.message;
      }
    });
  };

  $scope.fetchProducts = function() {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies/' + $scope.company_id + '/products',
      method: 'GET',
    }).then(function(response) {
      if(response.data) {
        $scope.loading = false;
        //$scope.products = response.data;
        $scope.products = [{id: 1, name: 'cebola'}, {id: 2, name: 'cenoura'}, {id: 3, name: 'cerveja'}]
      } else {
        $scope.loading = false;
        $scope.error.message = response.message;
      }
    });
  };
}]);
