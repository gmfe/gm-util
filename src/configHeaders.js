import md5 from './md5';
import UUID from './uuid';
import RequestInterceptor from './RequestInterceptor';

const configHeaders = (name, version, clientId)=> {
    RequestInterceptor.add({
        request(config){
            config.options.headers = config.options.headers || {};

            config.options.headers['X-Guanmai-Client'] = `${name}/${version} ${clientId}`;
            config.options.headers['X-Guanmai-Request-Id'] = md5(UUID.generate());

            return config;
        }
    });
};

export default configHeaders;