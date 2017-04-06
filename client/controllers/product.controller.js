(function () {
  'use strict';

  angular
  	.module('farmacia')
  	.controller('ProductController', ProductController);

  ProductController.$inject = ['$scope', 'UserFactory', 'ProductFactory'];
  console.log(3);
  function ProductController($scope, UserFactory, ProductFactory) {
    console.log(33);
    var vm = this;
    vm.loggedUser = {};
    vm.loggedIn = false;

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
