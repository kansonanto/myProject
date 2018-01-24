
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


var routes = require('./api/routes/userRoutes.js'); //importing route
routes(app);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
