'use strict';

angular.module('testaller.users', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('app.users_new', {
      url: '/signup',
      controller: 'UsersNewCtrl',
      templateUrl: 'components/users/new.html'
    })
    .state('app.users_edit', {
      url: '/users/:id',
      controller: 'UsersEditCtrl',
      templateUrl: 'components/users/edit.html',
      data: {
        requiresLogin: true
      },
      resolve: {
        currentUser: UserService => UserService.getUser()
      }
     });
}])

.controller('UsersNewCtrl', ['$scope', '$http', '$location', '$localStorage', 'API_URL',
                            function($scope, $http, $location, $localStorage, API_URL) {
  $scope.loading = false;
  $scope.error   = {};

  $scope.signup = function(email, password, password_confirmation) {
    $scope.loading = true;
    $scope.error   = {};

    $http({
      url: API_URL + '/users',
      skipAuthorization: true,
      method: 'POST',
      data: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }).then(function(response) {
      $localStorage.auth_token = response.data.auth_token;
      $location.path('/app/home');
    }, function(error) {
      $scope.error.message = error.data.message;
      $scope.loading = false;
    });
  };
}])

.controller('UsersEditCtrl', ['$scope', '$http', 'currentUser', 'API_URL',
                              function($scope, $http, currentUser, API_URL) {
  $scope.email = currentUser.email;

  $scope.update = function() {

  };
}]);
