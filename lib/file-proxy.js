/**
 * @file simple proxy
 */

var http = require('http');
var url = require('url');

/**
 * isInWhiteLists
 *
 * @param  {String}  targetUrl  targetUrl
 * @param  {Array}   whitelists whitelists
 * @return {Boolean}
 */
function isInWhiteLists(targetUrl, whitelists) {
    return whitelists.some(function(whiteUrl) {
        return whiteUrl.test(targetUrl);
    });
}


/**
 * Proxy
 *
 * @param {Object=} opt options
 */
function Proxy (opt) {

    opt = opt || {};

    var proxy = this;

    proxy.key = opt.key || 'url';

    if (Array.isArray(opt.whitelists)) {
        proxy.whitelists = opt.whitelists;
    }

    return function(req, res) {

        var params = url.parse(req.url, true).query;

        var targetUrl = params[proxy.key] || opt.url;

        // 有木有 url
        if(!targetUrl) {
            res.end('no url');
            return;
        }

        // url 在白名单么
        if (
            proxy.whitelists && !isInWhiteLists(targetUrl, proxy.whitelists)
            ) {
            res.end('url: ' + targetUrl + ' is not in whitelists');
            return;
        }

        var targetUrlOptions = url.parse(targetUrl);

        var reqOptions = {
            hostname: targetUrlOptions.hostname,
            port: targetUrlOptions.port || 80,
            method: req.method,
            path: targetUrlOptions.path,
            headers: req.headers
        };

        reqOptions.headers.host = targetUrlOptions.host;

        var proxyRequest = http.request(reqOptions, function(proxyResponse){

            proxyResponse.pipe(res);

        });

        req.pipe(proxyRequest);

    };

}

module.exports = Proxy;
