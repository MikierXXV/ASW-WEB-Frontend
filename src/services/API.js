import axios from 'axios';

const API_URL = 'https://asw-web-production.up.railway.app/api';
const apikey = "6qFP{8$X(k/Z#gV@JL`:?q%@y5WcGy7F";
const headers = {
    Accept: 'application/json',
    Authorization: apikey,
};

class API {
    get(path) {
        return axios.get(API_URL + path, { headers });
    }

    post(path, body){
        return axios.post(API_URL + path, body, { headers });
    }

    put(path, body){
        return axios.put(API_URL + path, body, { headers });
    }

    delete(path){
        return axios.delete(API_URL + path, { headers });
    }
}

export default new API();