'use strict';

angular.module('myproject1App')
.directive('myInvoiceHeader',function(){
    return {
        restrict:'E',
        templateUrl:'/report/views/invoiceHeader.html'
    };
  })
.config(function($stateProvider){

    $stateProvider.state('main.report',{
        url:'/report',
        templateUrl:'/report/views/reportPrint.html',
        controller:'reportController',
        controllerAs:'reportCtrl'
    })    
    .state('main.sampleReport',{
        url:'/sampleReport',
        templateUrl:'/report/views/sampleReport.html',
        controller:'reportController',
        controllerAs:'reportCtrl'
    })
    .state('main.sampleReport2',{
        url:'/sampleReport2',
        templateUrl:'/report/views/sampleReport2.html',
        controller:'reportsample',
        controllerAs:'reportCtrl1'
    });
    
});