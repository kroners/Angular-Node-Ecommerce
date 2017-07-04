(function(){

	'use strict';

	angular
		.module('farmacia')
		.factory('AuthService', AuthService)

	AuthService.$inject = ['$http', 'SessionService', 'USER_ROLES'];

	function AuthService($http, SessionService, USER_ROLES) {
		console.log("Dentro del AuthService");

		var authService = {
			login: login,
			isAuthenticated: isAuthenticated,
			isAuthorized: isAuthorized
		}

		return authService;

		function login(credentials) {
      console.log("Log in user -------------");
    	console.log(credentials);

			return $http.post('/login', credentials).then(function (logueado) {
				//Returns the User data that will be kept in Session
        console.log(logueado);
				SessionService.create('logged', logueado.data, logueado.data.username, logueado.data.name, USER_ROLES.user );
				return logueado.data;
			})
      .catch(function(error){
      	console.log('error', error);
      	return error;
      });
		}

    // function login (user, callback) {
	  // 	$http.post('/login', {'data':user}).then(function(data) {
		         //Returns the User data that will be kept in Session
    //         console.log(data);
    // })
  // };

        function isAuthenticated () {
        	return !!SessionService.userId;
        }

        function isAuthorized (authorizedRoles) {
        	if (!angular.isArray(authorizedRoles)) {
        		authorizedRoles = [authorizedRoles];
        	}
        	return (authService.isAuthenticated() && authorizedRoles.indexOf(SessionService.userRole) !== -1);
        }

        // Manual login status check, to be used on controller loads
        function isLoggedIn (callback){
            $http.get('/checkLogin').then(function(data){
                if(data.id){
                    callback(data);
                }
                else{
                    callback('NO');
                }
            });
        };
	}


})();
