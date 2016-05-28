'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
}

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var format = function format(str, data) {
    var result = str;
    if (arguments.length < 2) {
        return result;
    }

    result = result.replace(/\{([\d\w\.]+)\}/g, function (key) {
        var keys = arguments[1].split('.');
        var r = null;
        _underscore2['default'].each(keys, function (value, index) {
            if (index) {
                r = r[value];
            } else {
                r = data[value];
            }
        });
        return r;
    });
    return result;
};

exports['default'] = format;
module.exports = exports['default'];