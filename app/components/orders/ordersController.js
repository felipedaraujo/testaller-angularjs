'use strict';

angular.module('testaller.orders', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('app.orders', {
      url: '/orders',
      controller: 'OrdersIndexCtrl',
      templateUrl: 'components/orders/index.html',
      data: {
        requiresLogin: true
      },
      params: {
        cnpj: null,
        order_id: null
      }
    })
    .state('app.orders_new', {
      url: '/orders/new',
      controller: 'OrdersNewCtrl',
      templateUrl: 'components/orders/new.html',
      data: {
        requiresLogin: true
      }
    });
}])

.controller('OrdersIndexCtrl', ['$scope', '$stateParams', '$http', '$location', 'API_URL',
                                function($scope, $stateParams, $http, $location, API_URL) {
  $scope.error = {};
  $scope.loading = false;

  $scope.cnpj = $stateParams.cnpj;
  $scope.order_id = $stateParams.order_id;

  $scope.init = () => {
    $scope.fetchOrders();
  };

  $scope.fetchOrders = () => {
    $scope.loading = true;

    $http({
      url: API_URL + '/orders',
      method: 'GET',
      params: {
        cnpj: $scope.cnpj,
        id: $scope.order_id
      }
    }).then(response => {
      $scope.loading = false;
      $scope.orders = response.data;
    }, error => fail(error));
  };

  // TODO: verificar porque a requisição para atualizar um pedido retorna 404
  $scope.updateOrder = (order, status) => {
    $scope.loading = true;

    $http({
      url: API_URL + '/orders/' + order.id,
      method: 'PUT',
      data: {
        status: status
      }
    }).then(() => {
      $scope.loading = false;
    }, error => fail(error));
  };


  var fail = error => {
    $scope.loading = false;
    $scope.error.message = error.data.message;
  }
}])

.controller('OrdersNewCtrl', ['$scope', '$http', 'API_URL', '$state',
                        function($scope, $http, API_URL, $state) {

  $scope.error = {};
  $scope.loading = false;

  $scope.init = () => {
    $scope.items = [];
    $scope.product = '';
    $scope.products = [];
    $scope.fetchCompanies();
  };

  $scope.fetchCompanies = () => {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies',
      method: 'GET',
    }).then(response => {
      $scope.loading = false;
      $scope.companies = response.data;
    }, error => fail(error));
  };

  $scope.fetchProducts = () => {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies/' + $scope.company_id + '/products',
      method: 'GET',
    }).then(response => {
      $scope.loading = false;
      $scope.products = response.data;
    }, error => fail(error));
  };

  $scope.createProduct = (query) => {
    $scope.loading = true;

    $http({
      url: API_URL + '/companies/' + $scope.company_id + '/products',
      method: 'POST',
      data: {
        name: query.toLowerCase()
      }
    }).then(response => {
      $scope.loading = false;
      $scope.products.push(response.data);
      $scope.addItem(null, response.data);
    }, error => fail(error));
  }

  $scope.createOrder = () => {
    if($scope.products.length <= 0) {
      erroMensagemNewOrder();
      return
    }

    const products = $scope.items.map(item =>
      ({ id: item.id, quantity: item.quantity })
    );

    $http({
      url: API_URL + '/orders',
      method: 'POST',
      data: {
        products: products
      }
    }).then(() => {
      $scope.loading = false;
      $state.go('app.home');
    }, error => fail(error));
  };

  $scope.addItem = (_, product) => {
    const orderItem = $scope.items.find(i => {
      // impede que produtos com mesmo nome e empresas diferentes sejam agrupados
      return i.name === product.name && i.company_id === product.company_id;
    });

    if (orderItem) {
      orderItem.quantity++;
    } else {
      $scope.items.push({
        id: product.id,
        name: product.name,
        quantity: 1,
        company_id: product.company_id
      });
    }

    cleanProductQuery();
  };

  $scope.removeItem = (product) => {
    const orderIndex = $scope.items.findIndex(i => i.name === product.name);
    $scope.items.splice(orderIndex, 1);
  };

  $scope.isTypeaheadOpen = () => $scope.product !== '' ? true : false;

  $scope.incriseProduct = (product) => {
    let orderItem = $scope.items.find(i => i.name === product.name);
    orderItem.quantity++;
  }

  $scope.decriseProduct = (product) => {
    let orderItem = $scope.items.find(i => i.name === product.name);
    if(orderItem.quantity === 1) {
      $scope.removeItem(product);
    } else {
      orderItem.quantity--;
    }
  }

  var cleanProductQuery = () => $scope.product = '';

  var fail = error => {
    $scope.loading = false;
    $scope.error.message = error.data.message;
  }

  var erroMensagemNewOrder = () => {
    fail({data: {message: "Pedido deve conter pelo menos 1 produto"}})
  };
}]);
