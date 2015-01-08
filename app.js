/**
 * @file fonteditor-server
 */

var http = require('http');

var route = require('./util/route');

route.add('/getfont', require('./route/getfont'));

route.add('/dwz', require('./route/dwz'));

route.add('/', require('./route/static'));

var env = process.env;

var port = env.PORT || 8080;
var host = env.HOST || '0.0.0.0';

http.createServer(route.middleware()).listen(port, host);

console.log('server started at', host + ':' + port);
