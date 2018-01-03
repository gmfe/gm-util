import md5 from './md5';
import UUID from './uuid';

const configHeaders = (name, version, clientId) => {
    const headers = {};

    headers['X-Guanmai-Client'] = `${name}/${version} ${clientId}`;
    headers['X-Guanmai-Request-Id'] = md5(UUID.generate());

    return headers;
};

export default configHeaders;