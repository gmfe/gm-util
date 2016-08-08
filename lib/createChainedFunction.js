"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = createChainedFunction;

function createChainedFunction() {
    var args = arguments;
    return function chainedFunction() {
        for (var i = 0; i < args.length; i++) {
            if (args[i] && args[i].apply) {
                args[i].apply(this, arguments);
            }
        }
    };
}

module.exports = exports["default"];