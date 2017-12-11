import axios from 'axios';

export default class RequestJson {
    instance;

    constructor (token) {
        let config = {
            baseURL: 'http://todo.dev/api',
        };
        if ('undefined' !== typeof token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        this.instance = axios.create(config);
    }

    get (endPoint, config) {
        return this.instance.get(endPoint, config);
    }

    post (endPoint, data, config) {
        return this.instance.post(endPoint, data, config);
    }

    put (endPoint, data, config) {
        return this.instance.put(endPoint, data, config);
    }

    patch (endPoint, data, config) {
        return this.instance.patch(endPoint, data, config);

    }

    delete (endPoint, config) {
        return this.instance.delete(endPoint, config);
    }
}