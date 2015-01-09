/**
 * @file dwz
 * @author junmer
 */

var dwz = require('../lib/dwz');
var express = require('express');
var router = express.Router();

/* GET dwz page. */
router.get('/create', function (req, res) {

    var url = req.query.url;

    if (!url) {
        return res.end('no url');
    }

    dwz.create(
        url,
        function (data) {
            res.end(JSON.stringify(data));
        },
        function () {
            res.end('error');
        }
    );

});

module.exports = router;
