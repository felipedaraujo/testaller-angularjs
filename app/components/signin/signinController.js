'use strict';

angular.module('testaller.signin', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app.signin', {
    url: '/signin',
    templateUrl: 'components/signin/signin.html'
  });
}])
