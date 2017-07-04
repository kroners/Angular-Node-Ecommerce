angular
  .module('farmacia')
  .config(config);

function config($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'UserController'
    })
    .when('/products', {
      templateUrl: 'partials/products.html',
      controller: 'ProductsController'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileController'
    })
    .when('/contact', {
      templateUrl: 'partials/contactus.html'
    })
    .when('/adminYoyoLala', {
      templateUrl: 'partials/admin-panel.html',
      controller: 'AdminController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'UserController'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'UserController'
    })
    .when('/recoverPass', {
      templateUrl: 'partials/recuperarPass.html',
      controller: 'UserController'
    })
    .otherwise({
      redirectTo: '/'
    });
}
