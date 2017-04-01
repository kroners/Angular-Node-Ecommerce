(function() {
    'use strict';

	angular
		.module('farmacia')
		.factory('usersFactory', usersFactory);

	usersFactory.$inject = [$http];

	function usersFactoryR($http) {

		console.log('entering into Factory using http to make CRUD operations');
		var thisUser = null;
		var resetPassUser = {};

		// we expose callable members up to (usually used in services, but now in factories)
		// placing callable members up to, makes it easy to read and helps you identify which members can be called.
		// Helpful when file gets longer and avoids scrolling down to see what is exposed.
		// We create the functions below, and the factorie will be exposed as a service.
		var service = {   // this variable could also be called factory
			registerUser = registerUser;
			login = login;
			isLoggedIn = isLoggedIn;
			getUser = getUser;
			getUserByEmail = getUserByEmail;
			resetPassword = resetPassword;
			getResetPassUser = getResetPassUser;
			updateUser = updateUser;
			changePassword = changePassword;
			getAllUsers = getAllUsers;
			delUser = delUser;
		};

		return service;    // this variable could also be called factory

		// we avoid using functions expressions and instead used function declarations as below
		function registerUser(user, callback) {
			$http.post('/users', user).success(function(data) {
	        	// Returns random string in data.string
	        	if (callback && typeof callback == 'function') {
	         	   callback(data);
	        	}
	    	})
	  	};

	  	function login (user, callback) {
	  		$http.post('/login', user).success(function(data) {
	  			//Returns the User data that will be kept in Session
	  			console.log(data);

	  		})
	  	};

	}

	function usersFactory($http) {
		console.log('users');
		var users = [
			{
				id: 1,
				user: 'juan@perez.com',
				pass:'1234567890'
			},
			{
				id: 2,
				user: 'jose@perez.com',
				pass:'1234567890'
			},
			{
				id: 3,
				user: 'javier@perez.com',
				pass:'1234567890'
			},
			{
				id: 4,
				user: 'josue@perez.com',
				pass:'1234567890'
			},
		]

		var service = {
			info: users
		};
		console.log(service);

		return service;
	};

})();
