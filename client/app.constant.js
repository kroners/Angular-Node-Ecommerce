(function () {
	'use strict';

	angular
		.module('farmacia')
		.constant('AUTH_EVENTS', {
			loginSucess: 'auth-login-success',
			loginFailed: 'auth-login-failed',
			logoutSuccess: 'auth-logout-success',
			sessionTiemout: 'auth-session-timeout',
			notAuthenticated: 'auth-not authenticated',
			notAuthorized: 'auth-not-authorized'
		})
		.constant('USER_ROLES', {
			all: '*',
			admin: 'admin',
			editor: 'editor',
			user: 'user',
			guest: 'guest'
		});
})();