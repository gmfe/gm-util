let is = {};

is.weixin = () => {
    return /MicroMessenger/i.test(navigator.userAgent);
};

export default is;

