"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (dom) {
    var rect = dom.getBoundingClientRect();
    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
};