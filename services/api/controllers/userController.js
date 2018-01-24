'use strict';


exports.listAllUser = function(req, res){

    var sql = require('mssql');
    
        // config for your database
        var config = {
            user: 'sa',
            password: 'welcome@123',
            server: '192.168.1.124\\MS2014SQLEXPRESS', 
            database: 'BATES_LIVE' 
        };
    
        // connect to your database
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
    
            // create Request object
            var request = new sql.Request();
               
            // query to the database and get the records
            request.query('select * from pr_sec_user_master', function (err, recordset) {
                
                if (err) console.log(err)
    
                // send records as a response
                res.send(recordset);
                sql.close();
            });
        });

};
