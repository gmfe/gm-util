import _ from 'lodash'

const weixin = () => /MicroMessenger/i.test(navigator.userAgent)

const mac = () => window.navigator.userAgent.indexOf('Mac') > -1

const promise = (arg) => window.toString.call(arg) === '[object Promise]'

const mobile = window.navigator.userAgent.indexOf('Mobile') > -1

const number = value => {
  value += ''

  if (value === '') {
    return false
  }

  if (value.indexOf('x') > -1) {
    return false
  }

  return !_.isNaN(Number(value))
}

const integer = value => {
  value += ''

  if (_.isNumber(value)) {
    return parseInt(value) === +value
  }
  return false
}

const positive = value => {
  value += ''
  if (_.isNumber(value)) {
    return Math.abs(value) === +value && value > 0
  }
  return false
}

const negative = value => {
  value += ''
  if (_.isNumber(value)) {
    return Math.abs(value) === -value && value < 0
  }
  return false
}

const isChinese = value => {
  return /[\u4E00-\u9FA5]/.test(value)
}

// 强密码要求: 字母和数字组合,8位及以上
const strongPassword = (value) => {
  if (typeof value !== 'string') {
    return false
  }
  return /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{8,}$/i.test(value)
}

let isWeixinMP = null
let weixinMP = () => {
  if (isWeixinMP === null) {
    isWeixinMP = window.__wxjs_environment === 'miniprogram' || /miniprogram/.test(window.navigator.userAgent.toLowerCase())
  }
  return isWeixinMP
}

let isiOS = null
let iOS = () => {
  if (isiOS === null) {
    isiOS = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  return isiOS
}

const numberOrChar = value => {
  return /^(\d|[a-z]|[A-Z])+$/g.test(value)
}

const android = () => {
  return window.navigator.userAgent.indexOf('Android') > -1
}

const is = {
  weixin,
  mac,
  promise,
  number,
  integer,
  positive,
  negative,
  isChinese,
  strongPassword,
  mobile,
  weixinMP,
  iOS,
  android,
  numberOrChar
}

export default is
