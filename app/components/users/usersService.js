angular.module('testaller.users')

.service('UserService', ['$http', 'API_URL', function($http, API_URL) {
  return {
    getUser: () => $http.get(API_URL + '/me').then(response => response.data)
  }
}]);
