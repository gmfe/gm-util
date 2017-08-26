import _ from 'lodash';

var format = function (str, data) {

    console.warn('废弃，用es6的');

    var result = str;
    if (arguments.length < 2) {
        return result;
    }

    result = result.replace(/\{([\d\w\.]+)\}/g, function (key) {
        var keys = arguments[1].split('.');
        var r = null;
        _.each(keys, function (value, index) {
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

export default format;