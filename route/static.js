/**
 * @file static
 */


var nodeStatic = require('node-static');

// node-static 会从整个项目入口开始读
var fileServer = new nodeStatic.Server('./public');

module.exports = function(req, res) {

    req.on('end', function () {
        fileServer.serve(req, res);
    }).resume();

};
