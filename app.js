/**
 * @file fonteditor-server
 */

var http = require('http');

var route = require('./util/route');

route.add('/getfont', require('./route/getfont'));

route.add('/dwz', require('./route/dwz'));

route.add('/', require('./route/static'));

var env = process.env;
var port = 8080;

if(env.PORT) {
    port = env.PORT;
}

http.createServer(route.middleware()).listen(port, '0.0.0.0');
