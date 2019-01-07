const locales = {
  en: {
    '连接超时': 'Connection timed out, please try again later',
    '未知错误重试': 'Unknown error, please refresh the page to try again!',
    '服务器错误': 'Server Error',
    '未知错误': 'Unknown Error',
    '系统繁忙': 'Server Error'
  },
  zh: {
    '连接超时': '连接超时，请稍后重试',
    '未知错误重试': '未知错误，请刷新页面重试！',
    '服务器错误': '服务器错误',
    '未知错误': '未知错误',
    '系统繁忙': '系统繁忙'
  }
}
let lng = 'zh'

function setLocale (setLng) {
  lng = setLng
}

function getLocale (key) {
  return locales[lng][key]
}

export {
  setLocale,
  getLocale
}
