var http = require('http');
var router = require('./router.js');
var www = http.createServer(router);
www.listen(8080);