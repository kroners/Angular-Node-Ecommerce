(function () {
  'use strict';

  angular
    .module('farmacia')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope', 'UserFactory', 'ProductFactory'];

  function AdminController($scope, UserFactory, ProductFactory) {
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
