(function() {
    'use strict';

angular
	.module('farmacia')
	.controller('UserController', UserController);

UserController.$inject = ['$rootScope', '$scope', '$http', '$location', 'UserFactory'];

function UserController($rootScope, $scope, $http, $location, UserFactory) {

  console.log("Inside User Controller");

  // var $scope = this; // not using $scope as best practices from John Papa, unless necessary
  // consider using $scope in a controller when publishing or subscribing events
  // using $emit, $broadcast, $on

	//console.log(usersFactory);
  //initializing variables inside the Controller
  $scope.user = {}; //informacion que ingresa al formulario de registro
  $scope.sessionUser = {};
  $scope.loggedIn = false;
  $scope.loginUser = {}; // user infor que ingresa al formulario de login
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

  var errorMessages = {
      name        : 'First name field is required',
      lastName         : 'Last name field is required',
      email            : 'Last name field is required',
      password         : 'Password is required'
  };

  function toggle() {
    $scope.mobile_drop = !$scope.mobile_drop;
  };



  // Create user
  // Connect to factory to Create user
  // According to Jhon Papa, we should defer the Controller Logic to service
  function registerUser() {
    var valid = true;
    console.log('Registrando Nuevo usuario');
    //making inside Front End Validations
    if ( !$scope.user.name || $scope.user.name.trim().length < 1 ) {
        valid = false;
        $scope.regErrors.name = errorMessages.name; }
    if ( !$scope.user.lastName || $scope.user.lastName.trim().length < 1 ) {
        valid = false;
        $scope.regErrors.lastName = errorMessages.lastName; }
    if ( !$scope.user.username || $scope.user.username.trim().length < 1 ) {
        valid = false;
        $scope.regErrors.email = errorMessages.email; }
    if ( !$scope.user.password || $scope.user.password.trim().length < 1 ) {
        valid = false;
        $scope.regErrors.password = errorMessages.password; }
    if ( !$scope.confirmPassword || !$scope.user.password || $scope.user.password != $scope.confirmPassword ) {
        valid = false;
        $scope.regErrors.confirmPassword = errorMessages.confirmPassword; }

    // If user passes validations, then we continue to registerUser
    // Register inside Factories
    UserFactory.registerUser($scope.user, function(data) {
      console.log(data);
      console.log('Usuario Creado');
      $('#Register').modal('toggle');
      $scope.user = {};
      if (data.data.status == "SUCCESS") {
        $scope.sessionUser = data.config.data.name;
        $scope.loggedIn = true;
      }
      // Aun no se añaden validators, por lo que solo se asigna la data de usuario al logueado, despues de ser creado.
      // $scope.sessionUser = data.user;
    })
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

    UserFactory.login($scope.loginUser, function(data) {
      if (data) {
        //Yes User.
        if (!data.error) {
          console.log(data);
          $scope.sessionUser = data;
          $scope.loggedIn = true;

          $('#Login').modal('toggle');
          $scope.loginUser = {};
        } else {
          //Bad Password.
          $scope.loginErrors = 'Failed login, please check your email and password.';
        }
      //No User.
      } else{
        $scope.loginErrors = 'Failed login, please check your email and password.';
      }
    })
  };

  function logout() {
    // Log out through Passport, then clear local user data and redirect
    $http.get('/logout').success(function(){
      $scope.sessionUser = {};
      $scope.loggedIn = false;
    });
  };

};

})();
