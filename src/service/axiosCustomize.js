import axios from 'axios';

//set config defaults when creating an instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;