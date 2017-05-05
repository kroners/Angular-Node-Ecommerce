(function () {
  'use strict';

  angular
  	.module('farmacia')
  	.controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', '$location', 'UserFactory', 'SessionService'];

  function ProfileController($scope, $location, UserFactory, SessionService) {

    console.log("Dentro de profile controller");
    $scope.loggedUser = {};
    $scope.loggedIn = false;

      // Search if user is LoggedIn
    function checkUserSession(){
      console.log("checkUserSession");

      if (!SessionService.user) {
        console.log("Solo chequeo del frontend");
        swal("Es necesario estar logueado");
        $location.path("/");
      }  else {
        $scope.loggedUser = SessionService.user;
        $scope.loggedIn = true;
      }
      console.log("pendiente chequeo del backend");
      console.log($scope.user);
      // UserFactory.isLoggedIn($scope.user)
      //   .then(function() {
      //     console.log($scope.user);
      //     if($scope.user.id){
      //       $scope.sessionUser = $scope.user;
      //       $scope.loggedIn = true;
      //     }
      //   });
    };
    
    checkUserSession();

  };


})();
