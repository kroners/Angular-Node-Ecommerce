(function() {
  'use strict';

angular
	.module('farmacia')
	.controller('UserController', UserController);

UserController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthService', 'UserService','UserFactory','SweetAlert'];

function UserController($rootScope, $scope, $http, $location, AuthService, UserService, UserFactory, AUTH_EVENTS, SweetAlert) {

  console.log("Inside User Controller");

  // var $scope = this; // not using $scope as best practices from John Papa, unless necessary
  // consider using $scope in a controller when publishing or subscribing events
  // using $emit, $broadcast, $on

  //initializing variables inside the Controller
  $scope.user = {}; //informacion que ingresa al formulario de registro
  $scope.sessionUser = {};
  $scope.loggedIn = false;
  $scope.credentials = { // user infor que ingresa al formulario de login
    usermail: '',
    password: ''
  };
  $scope.userService = UserService;

  $scope.loginErrors = '';
  $scope.regErrors = {
        name       : '',
        lastName        : '',
        password        : '',
        confirmPassword : ''
  };

  //initializing function variables
  $scope.login = login;
  $scope.registerUser = registerUser;
  $scope.logout = logout;
  $scope.toggle = toggle;

  function toggle() {
    $scope.mobile_drop = !$scope.mobile_drop;
  };



  // Create user
  // Connect to factory to Create user
  // According to Jhon Papa, we should defer the Controller Logic to service
  function registerUser() {

    // define the service
    var userServ = UserService;
    console.log('Registrando Nuevo usuario');
    // Llamamos al UserService para realizar ahi las validaciones y seguir al factory con creacion de Usuario
    UserService.crearUsuario($scope.user)
    console.log(userServ);

    if (!UserService.regErrors){

      console.log('Usuario Creado'); // si no se presentan errores , el usuario deberia estar creado
      $('#Register').modal('toggle');
      $scope.user = {};
      swal("Te has registrado exitosamente");

    } else if (UserService.regErrors) {
      SweetAlert.swal("Error al Registrar", res.regErrors, "warning");
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will not be able to recover this imaginary file!",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Yes, delete it!",
         closeOnConfirm: false},
      function(){
         SweetAlert.swal("Booyah!");
      });
      $scope.user = {}; // En error se borran los campos para llenar el registro
    }

    // .then(function(res) {
    //   console.log(res);
    //   if (res.regErrors) {
    //
    //     SweetAlert.swal("Error al Registrar", res.regErrors, "warning");
    //     SweetAlert.swal({
    //        title: "Are you sure?",
    //        text: "Your will not be able to recover this imaginary file!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete it!",
    //        closeOnConfirm: false},
    //     function(){
    //        SweetAlert.swal("Booyah!");
    //     });
    //     $scope.user = {}; // En error se borran los campos para llenar el registro
    //   } else {
    //     console.log('Usuario Creado'); // si no se presentan errores , el usuario deberia estar creado
    //     $('#Register').modal('toggle');
    //     $scope.user = {};
    //     // if (res.data.status == "SUCCESS") {
    //     //   $scope.sessionUser = res.config.data.name;
    //     //   $scope.loggedIn = true;
    //     // }
    //     // Aun no se añaden validators, por lo que solo se asigna la data de usuario al logueado, despues de ser creado.
    //     // $scope.sessionUser = data.user;
    //     SweetAlert.swal("Bienvenido", "Te has registrado exitosamente", "success");
    //   }
    // }, function(error){
    //   // printing error handled by then
    //   console.log('error', error);
    // });

  };

  // Search if user is LoggedIn
  function checkUserSession(){
    console.log("The user " + $scope.user);
    UserFactory.isLoggedIn($scope.user)
      .then(function() {
        console.log($scope.user);
        if($scope.user.id){
          $scope.sessionUser = $scope.user;
          $scope.loggedIn = true;
        }
      })
  };

  //checkUserSession();

  // User is Logging In
  function login () {
    $scope.loginErrors = '';

    AuthService.login($scope.credentials).then(function (user) {
      // after success login, we communicate the authentication state through events (with $broadcast)
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });

    // UserFactory.login($scope.loginUser, function(data) {
    //   if (data) {
    //     //Yes User.
    //     if (!data.error) {
    //       console.log(data);
    //       $scope.sessionUser = data;
    //       $scope.loggedIn = true;

    //       $('#Login').modal('toggle');
    //       $scope.loginUser = {};
    //     } else {
    //       //Bad Password.
    //       $scope.loginErrors = 'Failed login, please check your email and password.';
    //     }
    //   //No User.
    //   } else{
    //     $scope.loginErrors = 'Failed login, please check your email and password.';
    //   }
    // })
  };

  function logout() {
    // Log out through Passport, then clear local user data and redirect
    $http.get('/logout').then(function(){
      $scope.sessionUser = {};
      $scope.loggedIn = false;
    });
  };

};

})();
