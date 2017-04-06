angular
  .module('farmacia')
  .config(config);

function config($routeProvider) {
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
    .when('/adminYoyoLala', {
      templateUrl: 'partials/admin.html',
      controller: 'AdminController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'UserController'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'UserController'
    });
}
