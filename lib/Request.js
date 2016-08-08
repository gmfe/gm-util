'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _paramJs = require('./param.js');

var _paramJs2 = _interopRequireDefault(_paramJs);

var _formatJs = require('./format.js');

var _formatJs2 = _interopRequireDefault(_formatJs);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _RequestInterceptor = require('./RequestInterceptor');

var _RequestInterceptor2 = _interopRequireDefault(_RequestInterceptor);

var setPromiseTimeout = function setPromiseTimeout(promise, ms) {
    if (ms === false) {
        return promise;
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('连接超时，请稍后重试');
        }, ms);
        promise.then(resolve, reject);
    });
};

var processRequest = function processRequest(config) {
    return _RequestInterceptor2['default'].interceptor.request(config);
};

var processResponse = function processResponse(promise, url, sucCode, config) {
    var color = 'color: #8a6d3b;';

    return setPromiseTimeout(promise, config.options.timeout).then(function (res) {
        if (res.ok) {
            var ct = res.headers.get('content-type');
            // 后台可能会有登录拦截，返回登录页面
            if (ct.indexOf('text/html') > -1) {
                return res.text().then(function (html) {
                    if (html.indexOf('title>登陆</title') > -1) {
                        return Promise.reject('请登录!');
                    }
                    return Promise.reject('未知错误！！！！！');
                });
            } else {
                return res.json();
            }
        }
        return Promise.reject((0, _formatJs2['default'])('服务器错误 {status} {statusText}', res));
    }).then(function (json) {
        return _RequestInterceptor2['default'].interceptor.response(json, config);
    }, function (reason) {
        return Promise.reject(_RequestInterceptor2['default'].interceptor.responseError(reason, config));
    }).then(function (json) {
        if (sucCode.indexOf(json.code) > -1) {
            return json;
        } else {
            console.log('%c*** Request url: %s、code: %s、msg: %s', color, url, json.code, json.msg);
            return Promise.reject(json.msg || '未知错误');
        }
    })['catch'](function (reason) {
        // reason 有点复杂，各种实现，碰到一个解决一个吧
        if (toString.call(reason) === '[object Promise]') {
            return reason['catch'](function (rea) {
                console.error('%c*** Request catch %s', color, rea);
                // reason 是个对象。目前先给字符串。吧。后续有需要在扩展
                return Promise.reject('' + rea);
            });
        } else {
            console.error('%c*** Request catch %s', color, reason);
            // reason 是个对象。目前先给字符串。吧。后续有需要在扩展
            return Promise.reject('' + reason);
        }
    });
};

var Request = function Request(url, options) {
    this._data = {};
    this.url = url;
    this.sucCode = [0];
    this.options = Object.assign({
        timeout: 10000, // number or false
        method: 'get',
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'include' // 需要设置才能获取cookie
    }, options);
};
Request.prototype = {
    code: function code(codes) {
        if (_underscore2['default'].isArray(codes)) {
            this.sucCode = this.sucCode.concat(codes);
        } else {
            this.sucCode.push(codes);
        }
        return this;
    },
    timeout: function timeout(_timeout) {
        Object.assign(this.options, {
            timeout: _timeout
        });
        return this;
    },
    data: function data(_data) {
        // 过滤null  undefined 只Object 类型。
        this._data = Object.assign({}, _data);
        if (toString.call(this._data) === '[object Object]') {
            this._data = _underscore2['default'].pick(this._data, function (value) {
                return value !== null && value !== undefined;
            });
        }
        return this;
    },
    json: function json(_data) {
        this._data = JSON.stringify(_data);
        return this;
    },
    _getConfig: function _getConfig() {
        var t = this;
        return {
            url: t.url,
            data: t._data,
            sucCode: t.sucCode,
            options: t.options
        };
    },
    _setConfig: function _setConfig(d) {
        var t = this;
        t.url = d.url;
        t._data = d.data;
        t.sucCode = d.sucCode;
        t.options = d.options;
    },
    _beforeRequest: function _beforeRequest() {
        var t = this;
        return processRequest(t._getConfig()).then(t._setConfig.bind(t));
    },
    get: function get() {
        var t = this;

        return t._beforeRequest().then(function () {
            var p = (0, _paramJs2['default'])(t._data);
            var newUrl = t.url + (t.url.indexOf('?') > -1 ? '&' : '?') + p;
            return processResponse(fetch(newUrl, t.options), t.url, t.sucCode, t._getConfig());
        });
    },
    post: function post() {
        var t = this;
        var data = t._data;
        var body;
        t.options.method = 'post';

        return t._beforeRequest().then(function () {
            // 兼容传[json string] [formData] 的情况,暂时这两种. 其他的看情况
            if (toString.call(data) === '[object Object]') {
                body = new FormData();
                for (var e in data) {
                    body.append(e, data[e]);
                }
            } else {
                body = data;
            }
            t.options.body = body;
            return processResponse(fetch(t.url, t.options), t.url, t.sucCode, t._getConfig());
        });
    }
};

var RequestFactory = function RequestFactory(url, options) {
    return new Request(url, options);
};

exports['default'] = RequestFactory;
module.exports = exports['default'];