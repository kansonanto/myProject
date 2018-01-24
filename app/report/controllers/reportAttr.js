'use strict'

angular.module('myproject1App')
.service('reportEntity',function(){

    this.reportDetails = [];

    this.setReportEntity = function(value){
        this.reportDetails = value;
    }

    this.getReportEntity = function(){
        return this.reportDetails;
    }
    
});