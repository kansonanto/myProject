'use strict';

/**
 * @ngdoc overview
 * @name myproject1App
 * @description
 * # myproject1App
 *
 * Main module of the application.
 */
angular
  .module('myproject1App', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl',
    //     controllerAs: 'main'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });

    $urlRouterProvider.otherwise("/login");
      var helloState = {
        name: 'main.home',
        url: '/home',
        templateUrl: '/home/views/home.html'
      }
    
      var aboutState = {
        name: 'main.about',
        url: '/about',
        templateUrl: '/about/views/about.html'
      }
      var loginState ={
        name: 'login', 
        url: '/login',
        templateUrl: '/login/views/login.html',
        data: {
            pageTitle: 'Login'
        },
        containerClass: 'gray-bg',
        controller: 'loginController',
        controllerAs: 'loginCtrl'
       }

       var mainState ={
        name : 'main',   
        abstract: true,        
          url: "/main",
          templateUrl: "/home/views/main.html"     
        
       }
       
       $stateProvider.state(mainState);
      $stateProvider.state(helloState);
      $stateProvider.state(aboutState);
      $stateProvider.state(loginState);

      
  })
  .run(run);


  run.$inject = ['$rootScope','$state','$location', '$cookies', '$http'];

  function run($rootScope,$state,$location, $cookies, $http) {
    
    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //         alert('locationChangeStart')
    //     // redirect to login page if not logged in and trying to access a restricted page
    //     var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
    //     var loggedIn = null;
    //     if (restrictedPage && !loggedIn) {
    //         //$location.path('/login');
    //         $state.go('login');
    //     }
    // });

    
      $rootScope.$on('$stateChangeStart', function (event, next, current) {
      alert('stateChangeStart')
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
      var loggedIn = null;
      if (restrictedPage && !loggedIn) {
          //$location.path('/login');
         // $state.go('login');
      }
  });

  $rootScope.$on('$stateChangeSuccess', function (event, next, current) {
  alert('stateChangeSuccess')
  });

  }
