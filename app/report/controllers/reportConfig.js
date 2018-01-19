'use strict';

angular.module('myproject1App')
.config(function($stateProvider){

    $stateProvider.state('main.report',{
        url:'/report',
        templateUrl:'/report/views/reportPrint.html',
        controller:'reportController',
        controllerAS:'reportCtrl'
    });
    
});