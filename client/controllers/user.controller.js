(function() {
    'use strict';

angular
	.module('farmacia')
	.controller('UserController', UserController);

UserController.$inject = ['usersFactory'];

function UserController(usersFactory) {
  var vm = this; // not using $scope as best practices from Jhon Papa, unless necessary
  // consider using $scope in a controller when publishing or subscribing events
  // using $emit, $broadcast, $on

	//console.log(usersFactory);
  //initializing variables inside the Controller
  vm.user = {};
  vm.loggedUser = {};
  vm.loggedIn = false;
  vm.loginUser = loginUser;
  vm.registerUser = registerUser;
  vm.logout = logout;
  vm.toggle = toggle;
  vm.loginErrors = '';
  vm.regErrors = {
        firstName       : '',
        lastName        : '',
        password        : '',
        confirmPassword : ''
  };
  var errorMessages = {
      firstName        : 'First name field is required',
      lastName         : 'Last name field is required',
      email            : 'Last name field is required',
      password         : 'Password is required'
  }

  vm.userFact = usersFactory;

  //Create user
  // Connect to factory to Create user
  // According to Jhon Papa, we should defer the Controller Logic to service
  function registerUser() {

    //making inside Front End Validations
    if ( !vm.user.firstName || vm.user.firstName.trim().length < 1 ) {
        valid = false;
        vm.regErrors.firstName = errorMessages.firstName; }
    if ( !vm.user.lastName || vm.user.lastName.trim().length < 1 ) {
        valid = false;
        vm.regErrors.lastName = errorMessages.lastName; }
    if ( !vm.user.email || vm.user.email.trim().length < 1 ) {
        valid = false;
        vm.regErrors.email = errorMessages.email; }
    if ( !vm.user.password || vm.user.password.trim().length < 1 ) {
        valid = false;
        vm.regErrors.password = errorMessages.password; }
    if ( !vm.confirmPassword || !vm.user.password || vm.user.password != vm.confirmPassword ) {
        valid = false;
        vm.regErrors.confirmPassword = errorMessages.confirmPassword; }

    // If user passes validations, then we continue to registerUser
    // Register inside Factories
    usersFactory.save(vm.user, function(data) {
      console.log(data);
      console.log('Usuario Creado');

      // Aun no se añaden validators, por lo que solo se asigna la data de usuario al logueado, despues de ser creado.
      vm.loggedUser = data.user;
    })
  };

  // Search if user is LoggedIn
  function checkSessionUser () {
    vm.userFact.isLoggedIn(function(vm.user) {
      if(vm.user.id){
        vm.loggedUser = user;
        vm.loggedIn = true;
      }
    })
  };

  // User is Logging In
  function loginUser () {
    vm.loginErrors = '';

    usersFactory.login($scope.loginUser, function(data) {
      if (data) {
        //Yes User.
        if (!data.error) {
          vm.loggedUser = data;
          vm.loggedIn = true;

          $('#Login').modal('toggle');
          vm.loginUser = {};
        } else {
          //Bad Password.
          vm.loginErrors = 'Failed login, please check your email and password.';
        }
      //No User.
      } else{
        vm.loginErrors = 'Failed login, please check your email and password.';
      }
    })
  };

  function logout() {
    // Log out through Passport, then clear local user data and redirect
    $http.get('/logout').success(function(){
      $scope.loggedUser = {};
      $scope.loggedIn = false;
    });
  };

};

})();
