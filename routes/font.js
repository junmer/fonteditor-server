/**
 * @file getfont
 * @author junmer
 */

var express = require('express');
var router = express.Router();

var FileProxy = require('../lib/file-proxy');

router.get('/proxy', function (req, res) {

    return new FileProxy({
        whitelists: [
            /^https?:\/\/.+?\.(ttf|woff|svg|eot)$/i
        ]
    })(req, res);

});

module.exports = router;
