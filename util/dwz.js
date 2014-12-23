/**
 * @file 短网址
 */

var http = require('http');

/**
 * create tinyurl
 *
 * @param  {String}   url     目标url
 * @param  {Function} success 成功回调
 * @param  {Function} error   失败回调
 */
module.exports.create = function(url, success, error) {

    var postdata = 'url=' + url;

    var options = {
        host: 'dwz.cn',
        port: 80,
        path: '/create.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postdata.length
        }
    };

    var req = http.request(options, function(res) {

        var body = '';

        res
            .on('data', function(chunk) {
                body += chunk;
            })
            .on('end', function() {

                var ret;

                try {
                    ret = JSON.parse(body);
                }
                catch(ex) {
                    error(ex);
                }

                success({
                    tinyurl: ret.tinyurl,
                    longurl: ret.longurl
                });

            });
    });

    req.on('error', function(e) {
        error(e);
    });

    req.write(postdata + '\n');
    req.end();

};

