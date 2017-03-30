(function() {
    'use strict';

angular
	.module('farmacia')
	.factory('usersFactory', usersFactory);

function usersFactoryR($resource) {
  console.log('entering into resource')
}

function usersFactory() {
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
