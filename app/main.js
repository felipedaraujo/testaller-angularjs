'use strict';

angular.module('testaller.main', [])

.controller('MainCtrl', ['$scope', '$window', 'authManager', '$localStorage',
                        function($scope, $window, authManager, $localStorage) {

  $scope.status = {
    isopen: false,
    isAuthenticated: authManager.isAuthenticated()
  };

  $scope.isNavCollapsed = true;

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.signout = function() {
    authManager.unauthenticate();

    $window.location.href = '#!/signin';
    $window.location.reload();
  };

}]);
