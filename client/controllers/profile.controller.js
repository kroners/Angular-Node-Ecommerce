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
    $scope.pass = {};
    console.log($scope.pass);

    $scope.updateProfile = updateProfile;
    $scope.changePassword = changePassword;
    $scope.showPassword = showPassword;

      // Search if user is LoggedIn
    function checkUserSession(){
      console.log("checkUserSession");

      if (!SessionService.user) {
        console.log("Solo chequeo del frontend");
        swal("Es necesario estar logueado");
        $location.path("/");
      }  else {
        $scope.loggedUser = SessionService.user;
        console.log($scope.loggedUser);
        $scope.loggedIn = true;
        console.log($scope.loggedIn);
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

    function updateProfile(){
      console.log("Updating User Info");
      UserFactory.updateUser($scope.loggedUser).then(function(data){
        console.log("Usuario actualizado");
      });
    };

    function changePassword(){
      console.log("Changing password");
      console.log($scope.pass);
      $scope.pass.username = $scope.loggedUser.username;
      console.log($scope.pass);
      console.log($scope.pass.newPassword);
      console.log($scope.pass.newPassword1);
      if (!$scope.pass) {

        console.log($scope.pass.newPassword);
        console.log($scope.pass.newPassword1);
        swal("Contraseñas no coinciden");
        $scope.pass = {};
      } else {
        UserFactory.changePassword($scope.pass).then(function(data){
          console.log("password change completed");
          console.log(data);
          $scope.pass = {};
          swal("Se cambio exitosamente la contraseña");
        })
        .catch(function(error){
          console.log("password change not completed");
          console.log(error);
          $scope.pass = {};
        });
      }

    };

    function showPassword(){

    };

  };


})();
