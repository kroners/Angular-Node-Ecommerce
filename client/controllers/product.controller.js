(function () {
  'use strict';

  angular
  	.module('farmacia')
  	.controller('ProductController', ProductController);

  ProductController.$inject = ['$scope', 'ProductService'];

  function ProductController($scope, ProductService) {
    console.log("Dentro del product controller");
    // var vm = this;
    $scope.products = ProductService;
    $scope.productList = [];

    // check if user is logged in
    UserFactory.isLoggedIn(function(user) {
      if (user.id) {
        vm.loggedUser = user;
        vm.loggedIn = true;
      }
    })

    // add validations to control the logged in user
    if (vm.loggedIn) {

    }

  };

})();
