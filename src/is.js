const weixin = () => /MicroMessenger/i.test(navigator.userAgent);

const mac = () => window.navigator.userAgent.indexOf('Mac') > -1;

const promise = (arg) => window.toString.call(arg) === '[object Promise]';

const number = value => {
    value += '';

    if (value === '') {
        return false;
    }

    if (value.indexOf('x') > -1) {
        return false;
    }

    return !_.isNaN(Number(value));
};

const integer = value => {
    value += '';

    if (isNumber(value)) {
        return parseInt(value) === +value;
    }
    return false;
};

const positive = value => {
    value += '';
    if (isNumber(value)) {
        return Math.abs(value) === +value && value > 0;
    }
    return false;
};

const negative = value => {
    value += '';
    if (isNumber(value)) {
        return Math.abs(value) === -value && value < 0;
    }
    return false;
};

const is = {
    weixin, mac,
    promise,
    number, integer, positive, negative
};

export default is;

