(function(){

	'use strict';

	angular
		.module('farmacia')
		.service('SessionService', SessionService)

	SessionService.$inject = [];

	function SessionService () {

		console.log("Inside SessionService");

		this.valid = true;
		this.userSelected = null;
		this.errorMessages = {
				username: 'Email field is required',
				password: 'Password is required'
			};
		this.loginErrors = {};

		this.validarErrorLogin = function (loggingUser){

			console.log(this.valid);
			console.log(loggingUser);
			// Se empieza con las validaciones
			if ( !loggingUser.username || loggingUser.username.trim().length < 1 ) {
				this.valid = false;
				this.loginErrors.username = this.errorMessages.username;
			}
			if ( !loggingUser.password || loggingUser.password.trim().length < 1 ) {
				this.valid = false;
				this.loginErrors.password = this.errorMessages.password;
			}
			console.log(this.valid);

			if (this.valid) {
				return true;
			} else {
				return false;
			}
		}

		this.create = function (sessionId, user, username, name, userRole) {
			this.id = sessionId;
			this.user = user;
			this.username = username;
			this.name = name;
			this.userRole = userRole;
		}
		
		this.destroy = function() {
			this.id = null;
			this.user = null;
			this.username = null;
			this.name = null;
			this.userRole = null;
		}

	}


})();