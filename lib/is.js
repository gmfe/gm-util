"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var is = {};

is.weixin = function () {
    return (/MicroMessenger/i.test(navigator.userAgent)
    );
};

exports["default"] = is;
module.exports = exports["default"];