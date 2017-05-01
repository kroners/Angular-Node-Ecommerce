(function(){

	'use strict';

	angular
		.module('farmacia')
		.factory('AuthService', AuthService)

	AuthService.$inject = ['$http', 'SessionService'];

	function AuthService($http, SessionService) {
		console.log("Dentro del AuthService");
		var authService = {
			login: login,
			isAuthenticated: isAuthenticated,
			isAuthorized: isAuthorized
		}

		return authService;

		function login(credentials) {
			return $http
				.post('/login', credentials)
				.then(function (data) {
					//Returns the User data that will be kept in Session
                	console.log(data);
					SessionService.create(data.data.id,data.data.user.id,data.data.user.role);
					return data.data.user;
				});
		}

        // function login (user, callback) {
	  	    // $http.post('/login', {'data':user}).then(function(data) {
        //         //Returns the User data that will be kept in Session
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