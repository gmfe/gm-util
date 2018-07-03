import md5 from './md5'
import UUID from './uuid'
import RequestInterceptor from './RequestInterceptor'

const configHeaders = (name, __VERSION__, clientId) => {
  console.warn('configHeaders is deprecated. Use gm-service/common/config_headers.js instead.')

  RequestInterceptor.add({
    request (config) {
      config.options.headers = config.options.headers || {}

      config.options.headers['X-Guanmai-Client'] = `${name}/${__VERSION__} ${clientId}`
      config.options.headers['X-Guanmai-Request-Id'] = md5(UUID.generate())

      return config
    }
  })
}

export default configHeaders
