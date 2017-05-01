(function(){
	'use strict';

	angular
		.module('farmacia')
		.service('UserService', UserService)

	UserService.$inject = ['$q','UserFactory'];

	function UserService ($q, UserFactory) {
		console.log("Dentro del UserService");

		this.usuarios = [];
		this.isSaving = false;
		this.nuevoUser = null;
		this.valid = true;
		this.userSelected = null;
		this.errorMessages = {
				name: 'First name field is required',
				lastName: 'Last name field is required',
				email: 'Last name field is required',
				password: 'Password is required'
			};
		this.regErrors = {};

		this.validarErrorRegistro = function (nuevoUsuario){

			console.log(this.valid);
			console.log(this.nuevoUser);
			this.nuevoUser = nuevoUsuario;
			console.log(this.nuevoUser);
			// Se empieza con las validaciones
			if ( !this.nuevoUser.name || this.nuevoUser.name.trim().length < 1 ) {
				this.valid = false;
				this.regErrors.name = this.errorMessages.name;
			}
			if ( !this.nuevoUser.lastName || this.nuevoUser.lastName.trim().length < 1 ) {
				this.valid = false;
				this.regErrors.lastName = this.errorMessages.lastName;
			}
			if ( !this.nuevoUser.username || this.nuevoUser.username.trim().length < 1 ) {
				this.valid = false;
				this.regErrors.email = this.errorMessages.email;
			}
			if ( !this.nuevoUser.password || this.nuevoUser.password.trim().length < 1 ) {
				this.valid = false;
				this.regErrors.password = this.errorMessages.password;
			}
			console.log(this.valid);

			if (this.valid) {
				return true;
			} else {
				return false;
			}
		}

		this.restartData = function() {
			this.usuarios = [];
			this.isSaving = false;
			this.nuevoUser = null;
			this.valid = true;
			this.userSelected = null;
			this.regErrors = {};
		}

		// this.crearUsuario = function (nuevoUsuario) {
		// 	console.log("Funcion crearUsuario en UserService");
		// 	console.log(nuevoUsuario);
		// 	// realzamos las validaciones llamando a la funciona anterior, la que nos realizara los cambios
		// 	// respectivos a las variables
		// 	this.validarErrorRegistro(nuevoUsuario);
		// 	console.log(this.valid);
		// 	console.log(this.nuevoUser);
		// 	if (this.valid) {
		// 		console.log("Se pasaron las validaciones");
		// 		this.isSaving = true;
		// 		// You don't need to return a promise in this case, because you are using a callback.
		// 		// Callbacks and promises are the two ends of the spectrum.
		// 		// UserFactory.registerUser(nuevoUsuario).$promise.then(function(response){
		// 		UserFactory.registerUser(nuevoUsuario).then(function(response){
		// 			console.log(response);
		// 			this.nuevoUser = null;
		// 			this.regErrors = {};
		// 			// return response;
		// 			this.userSelected = response;
		// 			console.log(this.userSelected);
		//
		// 		});
		//
		// 		return this.userSelected;
		// 	} else {
		// 		console.log(this.regErrors);
		// 		return this.regErrors
		// 	}
		// }


	}

})();
