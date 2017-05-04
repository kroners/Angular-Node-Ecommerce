(function () {
  'use strict';

  angular
  	.module('farmacia')
  	.controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'UserFactory', 'SessionService'];

  function ProfileController($scope, UserFactory, SessionService) {

    console.log("Dentro de profile controller");
    $scope.loggedUser = {};
    $scope.loggedIn = false;

      // Search if user is LoggedIn
    function checkUserSession(){
      console.log("checkUserSession");

      if (!SessionService.user) {
        if
      } else {

      }
      SessionService.user
      UserFactory.isLoggedIn($scope.user)
        .then(function() {
          console.log($scope.user);
          if($scope.user.id){
            $scope.sessionUser = $scope.user;
            $scope.loggedIn = true;
          }
        })
    };
    

  };


})();
