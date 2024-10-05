import axios from 'axios';

//set config defaults when creating an instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export default instance;