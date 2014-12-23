/**
 * @file getfont
 */


var Proxy = require('../util/proxy');

module.exports = function(req, res) {
    return new Proxy({
        whitelists: [
            /^https?:\/\/.+?\.(ttf|woff|svg|eot)$/i
        ]
    })(req, res);
};
