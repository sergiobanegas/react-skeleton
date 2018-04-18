import axios from 'axios';

const API_ENDPOINT = '/api';

export const post = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.post(API_ENDPOINT + endpoint, body).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const put = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.put(API_ENDPOINT + endpoint, body).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const patch = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.patch(API_ENDPOINT + endpoint, body).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const get = (endpoint, params) => {
    return new Promise((resolve, reject) => {
        axios.get(API_ENDPOINT + endpoint, {params: params}).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const del = (endpoint, body, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_ENDPOINT + endpoint).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};
