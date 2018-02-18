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
    'ngTouch',
    'summernote',
    'htmlToPdfSave',
    'services',
    'ui.select'   
 
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
  .config(function($httpProvider){    
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  })
  .run(run)
  .directive('starRating', function() {
    return {
      restrict: 'EA',
      template:
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
      scope: {
        ratingValue: '=ngModel',
        max: '=?', // optional (default is 5)
        onRatingSelect: '&?',
        readonly: '=?'
      },
      link: function(scope, element, attributes) {
        if (scope.max == undefined) {
          scope.max = 5;
        }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
      }
    };
  })
  
  .filter('INR', function () {        
    return function (input) {
        if (! isNaN(input)) {
            var currencySymbol = '₹';
            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            
            if (result.length > 1) {
                output += "." + result[1];
            }            

            return currencySymbol + output;
        }
    }
})

.filter('INRCOPIES', function () {        
  return function (input) {
      if (! isNaN(input)) {
          var currencySymbol = '';
          //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
          var result = input.toString().split('.');

          var lastThree = result[0].substring(result[0].length - 3);
          var otherNumbers = result[0].substring(0, result[0].length - 3);
          if (otherNumbers != '')
              lastThree = ',' + lastThree;
          var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
          
          if (result.length > 1) {
              output += "." + result[1];
          }            

          return currencySymbol + output;
      }
  }
});


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
