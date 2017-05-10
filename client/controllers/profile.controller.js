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
      UserFactory
    };

    function changePassword(){
      console.log("Changing password");
      console.log($scope.pass);
      $scope.pass.username = $scope.loggedUser.username;

      if ($scope.pass.newPassword != $scope.pass.newpassword1) {
        swal("Contraseñas no coinciden");
        $scope.pass = {};
        return next();
      }
      UserFactory.changePassword($scope.pass).then(function(data){
        console.log("password change completed");
        console.log(data);

      })
    };

    function showPassword(){

    };

  };


})();
