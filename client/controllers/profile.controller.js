(function () {
  'use strict';

  angular
  	.module('farmacia')
  	.controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'UserFactory'];

  function ProfileController($scope, UserFactory) {
    // var vm = this;
    console.log("Dentro de profile controller");
    $scope.loggedUser = {};
    $scope.loggedIn = false;

    

  };


})();
