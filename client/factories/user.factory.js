(function() {
    'use strict';

	angular
		.module('farmacia')
		.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', '$location'];

	function UserFactory($http, $location) {

		console.log('entering into Factory using http to make CRUD operations');
		var thisUser = null;
		var resetPassUser = {};

		// we expose callable members up to (usually used in services, but now in factories)
		// placing callable members up to, makes it easy to read and helps you identify which members can be called.
		// Helpful when file gets longer and avoids scrolling down to see what is exposed.
		// We create the functions below, and the factorie will be exposed as a service.
		var service = {   // this variable could also be called factory
			registerUser = registerUser,
			login = login,
			isLoggedIn = isLoggedIn,
			getUser = getUser,
			getUserByEmail = getUserByEmail,
			resetPassword = resetPassword,
			getResetPassUser = getResetPassUser,
			updateUser = updateUser,
			changePassword = changePassword,
			getAllUsers = getAllUsers,
			delUser = delUser
		};

		return {service};    // this variable could also be called factory

		// we avoid using functions expressions and instead used function declarations as below
		function registerUser(user, callback) {
			$http.post('/crearUsuario', user).success(function(data) {
	       // Returns random string in data.string
	       if (callback && typeof callback == 'function') {
	          return callback(data);
	       }
	    })
	  };

	  function login (user, callback) {
	  	$http.post('/login', user).success(function(data) {
	  		//Returns the User data that will be kept in Session
	  		console.log(data);
	  	})
	  };
    // Manual login status check, to be used on controller loads
    function isLoggedIn (callback){
        $http.get('/checkLogin').success(function(user){
            if(user.id){
                callback(user);
            }
            else{
                callback('NO');
            }
        });
    };

    // Grab user by ID, send back user data
    function getUser (userid, callback) {
        $http.post('/getUserInfo', {userid:userid}).success(function(data) {
            callback(data);
        })
    };

    function getUserByEmail (email, callback) {
        $http.post('/getUserByEmail', {email: email}).success(function(data) {
            if (callback) {
                callback(data);
                resetPassUser = data.data;
            }
        })
    }
    function getUserByResetUrl (url, callback) {
        $http.post('/getUserByResetUrl', {resetUrl: url}).success(function(data) {
            if (callback) {
                callback(data);
            }
        })
    }
    function resetPassword (password, url, callback) {
        $http.post('/resetPassword', {password: password, resetUrl: url}).success(function(data) {
            if (callback) {
                callback(data)
            }
        })
    }
    function getResetPassUser () {
        return resetPassUser;
    }
    function getAllUsers () {
        return 'resetPassUser';
    }
    function delUser () {
        return 'resetPassUser';
    }

    function updateUser (userinfo) {
        $http.post('/updateUser', userinfo).success(function(){
        })
    };
    function changePassword (pass, callback) {
        $http.post('/changePassword', pass).success(function(data){
            callback(data);
        })
    };

	}

})();
