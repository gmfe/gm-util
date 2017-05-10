let is = {};

is.weixin = () => /MicroMessenger/i.test(navigator.userAgent);

is.mac = () => window.navigator.userAgent.indexOf('Mac') > -1;

export default is;

