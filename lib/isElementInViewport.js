"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (dom) {
    var rect = dom.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};