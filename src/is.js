const is = {};

is.weixin = () => /MicroMessenger/i.test(navigator.userAgent);

is.mac = () => window.navigator.userAgent.indexOf('Mac') > -1;

is.promise = (arg) => window.toString.call(arg) === '[object Promise]';

export default is;

