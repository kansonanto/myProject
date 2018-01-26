'use strict';

module.exports = function(app){
var userController = require('../controllers/userController.js');

app.route('/api/GetAllUser')
.get(userController.listAllUser);
};
