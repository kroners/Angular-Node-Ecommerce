(function() {
  'use strict';

angular
	.module('farmacia')
	.controller('UserController', UserController);

UserController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthService', 'SessionService' ,'UserService','UserFactory', 'AUTH_EVENTS','SweetAlert'];

function UserController($rootScope, $scope, $http, $location, AuthService, SessionService, UserService, UserFactory, AUTH_EVENTS, SweetAlert) {

  console.log("Inside User Controller");

  // var $scope = this; // not using $scope as best practices from John Papa, unless necessary
  // consider using $scope in a controller when publishing or subscribing events
  // using $emit, $broadcast, $on

  //initializing variables inside the Controller
  $scope.user = {}; //informacion que ingresa al formulario de registro
  $scope.sessionUser = {};
  $scope.loggedIn = false;
  $scope.credentials = { // user infor que ingresa al formulario de login
    username: '',
    password: ''
  };
  $scope.recovermail = {};
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
  $scope.setCurrentUser = setCurrentUser;
  $scope.lostPasswd = lostPasswd;
  $scope.recuperandoPass = recuperandoPass;

  function toggle() {
    $scope.mobile_drop = !$scope.mobile_drop;
  };



  // Create user
  // Connect to factory to Create user
  // According to Jhon Papa, we should defer the Controller Logic to service
  function registerUser() {
    console.log('Registrando Nuevo usuario');

    // se crea una instancia del service
    var serviceUser = UserService;
    console.log(serviceUser);

    // Llamamos al UserService para realizar ahi las validaciones
    var valid = UserService.validarErrorRegistro($scope.user);
    console.log(valid);
    console.log(UserService.valid);

    // Se seguira al factory con creacion de Usuario
    // Siempre y cuando se cumpla la condicional que sale del service
    if (valid){
      console.log("Validaciones del Service aporbadas");

      UserFactory.registerUser($scope.user).then(function(response){
        console.log(response);
        if (response.status == 200) {
          console.log('Usuario Creado'); // si no se presentan errores , el usuario deberia estar creado
          $('#Register').modal('toggle');
          $scope.user = {};
          swal("Te has registrado exitosamente");
        } else {
          console.log("Usuario no creado");
          console.log(response.data)
          $('#Register').modal('toggle');
          $scope.user = {};
          swal("Error al registrar", "warning");
        }


        // validar el estado del service
        console.log(serviceUser);
        var serviceUser = UserService;
        console.log(serviceUser);

        // limpiar el service
        UserService.restartData();
      })
      .catch(function(error){
        console.log("Se pasan validaciones pero no se registro");
        console.log(error);

        // limpiar el service
        UserService.restartData();
      });

    } else if (!valid) {
      console.log("No se pasaron las validaciones del Service");
      console.log(serviceUser.regErrors);

      swal("Error al registrar");
      // SweetAlert.swal("Error al Registrar", res.regErrors, "warning");
      // SweetAlert.swal({
      //    title: "Are you sure?",
      //    text: "Your will not be able to recover this imaginary file!",
      //    type: "warning",
      //    showCancelButton: true,
      //    confirmButtonColor: "#DD6B55",
      //    confirmButtonText: "Yes, delete it!",
      //    closeOnConfirm: false},
      // function(){
      //    SweetAlert.swal("Booyah!");
      // });
      $scope.user = {}; // En error se borran los campos para llenar el registro

      // limpiar el service
      UserService.restartData();

      // validar el estado del service
      console.log(serviceUser);
      var serviceUser = UserService;
      console.log(serviceUser);
    }
    console.log("Fuera del if-valid")

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
    console.log("Inside login function");

    $scope.loginErrors = '';

    // Llamamos al SessionService para realizar ahi las validaciones
    var valid = SessionService.validarErrorLogin($scope.credentials);
    console.log(valid);
    console.log(SessionService.valid);

    if (!valid) {
      swal("Error al hacer login");
      cleanControllerData();

    } else {

      AuthService.login($scope.credentials).then(function (user) {
        console.log(user);
        console.log("Success Login User");
        // after success login, we communicate the authentication state through events (with $broadcast)
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);

        $('#Login').modal('toggle');
        $scope.credentials = { // user infor que ingresa al formulario de login
          username: '',
          password: ''
        };

        $location.path("/profile");
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
    }
  };

  function setCurrentUser(user){
    $scope.sessionUser = user;
    $scope.loggedIn = true;
  }

  function logout() {
    // Log out through Passport, then clear local user data and redirect
    // $http.get('/logout').then(function(){
    //   $scope.sessionUser = {};
    //   $scope.loggedIn = false;
    //   AuthService.logout();
    // });
    $scope.sessionUser = {};
    $scope.loggedIn = false;
    SessionService.destroy();
    $location.path('/');
  };

  function cleanControllerData() {
    $scope.user = {};
    $scope.credentials = {
      usermail: '',
      password: ''
    };
  }

  // llamando funcion para recuperar contrasena
  function lostPasswd(){
    $('#Login').modal('toggle');
    $location.path('/recoverPass')
  }

  function recuperandoPass(){
    console.log($scope.username);
    UserFactory.resetPassword($scope.username).then(function(data){
      console.log(data);
      console.log("Success Recover pass mail User");
      swal("Se le enviaran las indicaciones de recuperacion al correo ingresado. Gracias");
    })
    .catch(function(error){
      console.log("Se pasan validaciones pero no se registro");
      console.log(error);

      // limpiar el service
      UserService.restartData();
    });
    $location.path('/');
  }

};

})();
