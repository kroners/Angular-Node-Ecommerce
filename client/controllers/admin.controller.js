(function () {
  'use strict';

  angular
    .module('farmacia')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope', 'UserFactory', 'ProductFactory', 'SessionService'];

  function AdminController($scope, UserFactory, ProductFactory, SessionService) {
    // var vm = this;
    console.log("I'm in the admin controller");
    $scope.loggedUser = {};
    $scope.loggedIn = false;

    // check if user is logged in
    UserFactory.isLoggedIn(function(user) {
      if (user.id) {
        vm.loggedUser = user;
        vm.loggedIn = true;
      }
    })

    // check if user have credentials to be in admin page

    // add validations to control the logged in user
    if (vm.loggedIn) {

    }

  };




})();
