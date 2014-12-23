/**
 * simple route
 *
 * see https://github.com/ecomfe/saber-router
 */

var route = function(){ };

var rules = [];

function addRule(path, fn) {

    var rule = {
        path: new RegExp( '^\\' + path ),
        fn: fn
    };

    rules.push(rule);
}

function indexOfHandler(path) {
    var index = -1;

    rules.some(function (item, i) {
        if (item.path.toString() === path.toString()) {
            index = i;
        }
        return index !== -1;
    });

    return index;
}

route.middleware = function () {

    return function(req, res) {

        route.getHander(req.url)(req, res);

    };

};

route.getHander = function(path) {

    var handler;
    var defHandler;

    rules.some(function (item) {

        if (item.path instanceof RegExp) {
            if (item.path.test(path)) {
                handler = item;
            }
        }
        else if (path === item.path) {
            handler = item;
        }

        if (!item.path) {
            defHandler = item;
        }

        return !!handler;

    });

    handler = handler || defHandler;

    return handler.fn;

};

route.add = function(path, hander) {

    if (indexOfHandler(path) >= 0) {
        throw new Error('path has been existed');
    }

    addRule(path, hander);

};


module.exports = route;
