import axios from 'axios';

export default class Request {
    instance;

    constructor(token) {
        let config = {
            baseURL: 'http://todo.localhost',
        };
        if('undefined' !== typeof token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        this.instance = axios.create(config);
    }

    get(endPoint, config) {
        return this.instance.get(endPoint, config);
    }

    post(endPoint, data, config) {
        return this.instance.post(endPoint, data, config);
    }

    put(endPoint, data, config) {
        return this.instance.put(endPoint, data, config);
    }

    patch(endPoint, data, config) {
        return this.instance.patch(endPoint, data, config);
    }

    delete(endPoint, config) {
        return this.instance.delete(endPoint, config);
    }

    getData(endPoint, responseHandler) {
        this.get(endPoint)
            .then(response => {
                responseHandler(response);
            });
    }

    putData(endPoint, responseHandler) {
        this.put(endPoint)
            .then(response => {
                responseHandler(response);
            });
    }
}