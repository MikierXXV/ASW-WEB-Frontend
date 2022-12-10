import axios from 'axios';

const API_URL = 'https://asw-web-production.up.railway.app/api/';
const token = "";
const headers = {
    Accept: 'application/json',
    Authorization: token,
};

class APIService {
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

export default new APIService();