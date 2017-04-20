'use strict';

angular.module('testaller.signin', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app.signin', {
    url: '/signin',
    controller: 'SigninCtrl',
    templateUrl: 'signin/signin.html'
  });
}])

.controller('SigninCtrl', ['$scope', function($scope) { }]);
