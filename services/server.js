
var express = require('express');
var app = express()
, cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:9000',
    credentials: true,
}

app.use(cors(corsOptions));

// app.all("/api/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     return next();
// });


app.get('/api/GetUser', function (req, res) {
   
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

    
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
