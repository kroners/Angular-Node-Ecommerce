(function(){
	'use strict';

	angular
		.module('farmacia')
		.service('UserService', UserService)

	UserService.$inject = ['$q','UserFactory'];

	function UserService ($q, UserFactory) {
		console.log("Dentro del UserService");

		var usuarios = [];
		var isSaving = false;
		var nuevoUser = null;
		var valid = true;
		var userSelected = null;
		var errorMessages = {
				name: 'First name field is required',
				lastName: 'Last name field is required',
				email: 'Last name field is required',
				password: 'Password is required'
			};
		var regErrors = null
		;
		var self = {
			usuarios: usuarios,
			isSaving: isSaving,
			nuevoUser: nuevoUser,
			valid: valid,
			userSelected: userSelected,
			errorMessages: errorMessages,
			regErrors: regErrors,
			validarErrorRegistro: validarErrorRegistro,
			crearUsuario: crearUsuario
		};

		return self;

		function validarErrorRegistro (nuevoUsuario){
			console.log(self.valid);
			console.log(valid);
			console.log(nuevoUser);
			console.log(self.nuevoUser);
			nuevoUser = nuevoUsuario;
			console.log(nuevoUser);
			// Se empieza con las validaciones
			if ( !nuevoUser.name || nuevoUser.name.trim().length < 1 ) {
				valid = false;
				regErrors.name = errorMessages.name;
			}
			if ( !nuevoUser.lastName || nuevoUser.lastName.trim().length < 1 ) {
				valid = false;
				regErrors.lastName = errorMessages.lastName;
			}
			if ( !nuevoUser.username || nuevoUser.username.trim().length < 1 ) {
				valid = false;
				regErrors.email = errorMessages.email;
			}
			if ( !nuevoUser.password || nuevoUser.password.trim().length < 1 ) {
				valid = false;
				regErrors.password = errorMessages.password;
			}
			console.log(valid);
		}

		function crearUsuario(nuevoUsuario) {
			console.log("Funcion crearUsuario en UserService");
			console.log(nuevoUsuario);
			// realzamos las validaciones llamando a la funciona anterior, la que nos realizara los cambios
			// respectivos a las variables
			validarErrorRegistro(nuevoUsuario);
			console.log(valid);
			console.log(nuevoUser);
			if (valid) {
				console.log("Se pasaron las validaciones");
				isSaving = true;
				// You don't need to return a promise in this case, because you are using a callback.
				// Callbacks and promises are the two ends of the spectrum.
				// UserFactory.registerUser(nuevoUsuario).$promise.then(function(response){
				UserFactory.registerUser(nuevoUsuario).then(function(response){
					console.log(response);
					isSaving = false;
					nuevoUser = null;
					regErrors = {};
					// return response;
					userSelected = response;
					console.log(userSelected);
					console.log(self.userSelected);
					self.userSelected = response;
					console.log(self.userSelected);
					// return userSelected;
				});
			} else {
				console.log(self);
			}
		}


	}

})();
