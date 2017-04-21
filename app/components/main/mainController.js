'use strict';

angular.module('testaller.main', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app', {
    abstract: true,
    url: '/app',
    controller: 'MainCtrl',
    template: '<ui-view/>'
  });
}])

.controller('MainCtrl', ['$scope', '$window', 'authManager', '$localStorage',
                         '$http', 'API_URL', '$timeout',
                         function($scope, $window, authManager, $localStorage,
                         $http, API_URL, $timeout) {

  $scope.error = {};
  $scope.loading = false;
  $scope.isNavCollapsed = true;

  $scope.isAuthenticated = () => authManager.isAuthenticated();

  $scope.signin = (email, password) => {
    $scope.loading = true;

    $http({
      url: API_URL + '/auth/signin',
      skipAuthorization: true,
      method: 'POST',
      data: {
        email: email,
        password: password
      }
    }).then(response => {
      $localStorage.auth_token = response.data.auth_token;

      // timeout a seguir evita que a aplicação tente navegar para home antes
      // que angular-jwt faça a autenticação da aplicação
      $timeout(function(){
        $window.location.href = '/#!/app/home';
      }, 1000);
    }, error => {
      $scope.loading = false;
      $scope.error.message = error.data.message;
    });
  };

  $scope.signout = () => {
    delete $localStorage.auth_token;

    $timeout(() => $window.location.href = '/#!/app/signin', 1000);
  };
}]);
