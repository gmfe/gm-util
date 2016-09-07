'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestInterceptor = function () {
    var interceptors = []; // [{request: function(){}, response: function(){}, responseError: function(){}}]
    var id = 0;

    return {
        add: function add(interceptor) {
            interceptor.__id = id++;
            interceptors.push(interceptor);
            return interceptor.__id;
        },
        remove: function remove(interceptorId) {
            interceptors = _underscore2.default.filter(interceptors, function (value) {
                return value.__id !== interceptorId;
            });
        },

        // 私有方法,谁用谁死
        interceptor: {
            request: function request(config) {
                var promise = Promise.resolve(config);
                _underscore2.default.each(interceptors, function (value) {
                    if (value.request) {
                        promise = promise.then(function (_config) {
                            // 如果request不按规范来,啥也不做. 则默认放回 config
                            return value.request(_config) || config;
                        });
                    }
                });

                return promise;
            },
            response: function response(json, config) {
                var promise = Promise.resolve(json);
                _underscore2.default.each(interceptors, function (value) {
                    if (value.response) {
                        promise = promise.then(function (json) {
                            // 如果response不按规范来,啥也不做. 则默认放回json
                            return value.response(json, config) || json;
                        });
                    }
                });
                return promise;
            },
            responseError: function responseError(reason, config) {
                var promise = Promise.reject(reason);
                _underscore2.default.each(interceptors, function (value) {
                    if (value.responseError) {
                        promise = promise.catch(function (reason) {
                            // 如果responseError不按规范来,啥也不做. reason
                            return Promise.reject(value.responseError(reason, config) || reason);
                        });
                    }
                });

                return promise;
            }
        }
    };
}();

exports.default = RequestInterceptor;