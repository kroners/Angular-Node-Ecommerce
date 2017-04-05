angular
  .module('farmacia')
  .config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/products', {
      templateUrl: 'partials/products.html',
      controller: 'Products',
      controllerAs: 'prod'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'Profile',
      controllerAs: 'profile'
    })
    .when('/adminYoyoLala', {
      templateUrl: 'partials/admin.html',
      controller: 'Admin',
      controllerAs: 'yola'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'User',
      controllerAs: 'us'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'User',
      controllerAs: 'us'
    });
}
