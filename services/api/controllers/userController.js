'use strict';


exports.listAllUser = function(req, res){

    var sql = require('mssql');
    
        // config for your database
        var config = {
            user: 'sa',
            password: 'welcome@123',
            server: 'NC-PC', 
            database: 'DEV-AA-OFFSET' 
        };
    
        // connect to your database
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
    
            // create Request object
            var request = new sql.Request();
               
            // query to the database and get the records
            request.query('select * from AA_USER_INFO', function (err, task) {
                
                if (err) console.log(err)
    
                // send records as a response
//                res.send(recordset);
                res.json(task);
                sql.close();
            });
        });

};
