'use strict';

/**
 * @ngdoc function
 * @name myproject1App.controller:loginController
 * @description
 * # loginController
 * Controller of the myproject1App
 */
angular.module('myproject1App')
  .controller('loginController',loginController);

  loginController.$inject=['$scope','$state'];
  
   function loginController(loginscope,navigate) {
    var vm = this;
    loginscope.username = 'antony';
   
   vm.login = login;
   function login() {
    navigate.go('main.home');   
   }

  };
