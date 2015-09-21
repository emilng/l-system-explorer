var connect = require('connect');
var http = require('http');
// var path = require('path');

var app = connect().use(connect.static('.'));

http.createServer(app).listen(4000);

