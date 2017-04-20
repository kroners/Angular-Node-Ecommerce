(function(){	
	'use strict';

	angular
		.module('farmacia')
		.service('UserService', UserService)

	UserService.$inject = ['UserFactory'];

	function UserService (UserFactory) {
		console.log("Dentro del UserService");

		var self = {
			'usuarios': [],
			'isSaving': false,
			'nuevoUser': null,
			'valid': true,
			'userSelected': null,
			'errorMessages' = {
				name: 'First name field is required',
				lastName: 'Last name field is required',
				email: 'Last name field is required',
				password: 'Password is required'
			},
			'regErrors':{},
			validarErrorRegistro: function (nuevoUsuario){
				self.nuevoUser = nuevoUsuario;
				// Se empieza con las validaciones
				if ( !self.nuevoUser.name || self.nuevoUser.name.trim().length < 1 ) {
					self.valid = false;
					self.regErrors.name = self.errorMessages.name; 
				}
				if ( !self.nuevoUser.lastName || self.nuevoUser.lastName.trim().length < 1 ) {
					self.valid = false;
					self.regErrors.lastName = self.errorMessages.lastName; 
				}
				if ( !self.nuevoUser.username || self.nuevoUser.username.trim().length < 1 ) {
					self.valid = false;
					self.regErrors.email = self.errorMessages.email; 
				}
				if ( !self.nuevoUser.password || self.nuevoUser.password.trim().length < 1 ) {
					self.valid = false;
					self.regErrors.password = self.errorMessages.password; 
				}
			},
			crearUsuario: function(nuevoUsuario) {
				console.log("Funcion crearUsuario en UserService");
				// realzamos las validaciones llamando a la funciona anterior, la que nos realizara los cambios
				// respectivos a las variables
				self.validarErrorRegistro(nuevoUsuario);
				if (self.valid) {
					console.log("Se pasaron las validaciones");
					UserFactory.registerUser(nuevoUsuario, function(res){
						console.log(res);
						self.nuevoUser = null;
						self.regErrors = {};
						return res;
					};
				} else {
					return self.regErrors;
				}
			}
			
		}

		return self;
	}

})();