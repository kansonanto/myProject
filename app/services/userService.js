
(function(){
'use strict';

angular.module('services',['success-services']);
angular.module('success-services',[])
.service('userService',['$http','$q',function($http,$q){

    var service = {};
    
            service.GetAll = GetAll;
            service.GetById = GetById;
            service.GetByUsername = GetByUsername;
            // service.Create = Create;
            // service.Update = Update;
            // service.Delete = Delete;
    
    return service;

    function GetAll() {
        var deferred = $q.defer();
        var req = {
            method: 'GET',
            url: 'http://localhost:5000/api/GetAllUser'
            // headers: {
            //   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiZTJzdGVzdHMxQGdtYWlsLmNvbSIsImV4cGlyYXRpb24iOjE1MTgwNDg2MDEwMDgsImV4dGVybmFsIjp0cnVlLCJhZG1pbiI6dHJ1ZSwidXNlcklkIjoyOTEyLCJvcmdhbml6YXRpb25JZCI6MiwidHlwZSI6InN0YWZmIiwib3JnYW5pemF0aW9uVHlwZSI6ImZyZWUifQ.iKRdKRDVuV9Uk0kd1fyHa4S6A_OWh47mkjFnIjNf9xs'
            // }
          };

        return $http(req).then(function(res){
            deferred.resolve(res);
            console.log(res);
        });
        
        return deferred.promise;
    }

    function GetById(userID) {
        var deferred = $q.defer();
        var req = {
            method: 'GET',
            url: 'http://localhost/auth/users/'+userID,
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiZTJzdGVzdHMxQGdtYWlsLmNvbSIsImV4cGlyYXRpb24iOjE1MTgwNDg2MDEwMDgsImV4dGVybmFsIjp0cnVlLCJhZG1pbiI6dHJ1ZSwidXNlcklkIjoyOTEyLCJvcmdhbml6YXRpb25JZCI6MiwidHlwZSI6InN0YWZmIiwib3JnYW5pemF0aW9uVHlwZSI6ImZyZWUifQ.iKRdKRDVuV9Uk0kd1fyHa4S6A_OWh47mkjFnIjNf9xs'
            }
          };

        return $http(req).then(function(res){
            deferred.resolve(res.data);
            console.log('GetById' + angular.toJson(res.data));
        });
        
        return deferred.promise;
    }

    function GetByUsername(){
        
        

        // var sql = require('mssql');
        
        //     // config for your database
        //     var config = {
        //         user: 'sa',
        //         password: 'mypassword',
        //         server: 'localhost', 
        //         database: 'SchoolDB' 
        //     };
        
        //     // connect to your database
        //     sql.connect(config, function (err) {
            
        //         if (err) console.log(err);
        
        //         // create Request object
        //         var request = new sql.Request();
                   
        //         // query to the database and get the records
        //         request.query('select * from Student', function (err, recordset) {
                    
        //             if (err) console.log(err)
        
        //             // send records as a response
        //             res.send(recordset);
                    
        //         });
        //     });
    }

}])
.factory('userAPI',['userService',function(userService){
        return userService;
}]);

})();
