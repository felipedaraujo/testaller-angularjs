'use strict';

angular.module('testaller.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    data: {
      requiresLogin: true
    }
  });
}])

.controller('HomeCtrl', ['$scope', '$http', 'API_URL',
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
}]);
