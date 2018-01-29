'use strict'

angular.module('myproject1App')
.config(function($stateProvider){
    $stateProvider.state('main.order',{
        url:'/order',
        templateUrl:'/order/views/orderList.html',
        controller:'orderController',
        controllerAs:'orderCtrl'
    })    
    .state('main.createOrder',{
        url:'/createOrder',
        templateUrl:'/order/views/createOrder.html',
        controller:'orderController',
        controllerAs:'orderCtrl'
    })    
});