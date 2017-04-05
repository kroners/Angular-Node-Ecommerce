(function () {
  'use strict';

  angular
  	.module('farmacia')
  	.controller('ProductController', ProductController);

  ProductController.$inject = ['UserFactory', '$scope'];

  function ProductController(UserFactory, $scope) {
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
