(function(){

	'use strict';

	angular
		.module('farmacia')
		.service('SessionService', SessionService)

	SessionService.$inject = [];

	function SessionService () {
		console.log("Inside SessionService");

		this.create = function (sessionId, userId, user, userRole) {
			this.id = sessionId;
			this.userId = userId;
			this.user = user;
			this.userRole = userRole;
		}
		
		this.destroy = function() {
			this.id = null;
			this.userId = null;
			this.user = null;
			this.userRole = null;
		}

		this.validateLoginErrors = function() {

		}
	}


})();