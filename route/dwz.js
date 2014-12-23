/**
 * @file dwz
 */

var url = require('url');
var dwz = require('../util/dwz');

module.exports = function(req, res) {

    var params = url.parse(req.url, true).query;

    dwz.create(
        params.url,
        function(data) {
            res.end(JSON.stringify(data));
        },
        function() {
            res.end('error');
        }
    );

};
