'use strict';

angular.module('testaller.orders', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orders/new', {
    templateUrl: 'orders/new.html',
    controller: 'OrdersNewCtrl'
  });
}])

.controller('OrdersNewCtrl', ['$scope', function($scope) {
}]);
