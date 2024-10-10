import axios from '../axiosCustomize.js';

const getAllUserAPI = async () => {
    const URL_API = "/api/v1/admin/users";
    return axios.get(URL_API);
}

export {
    getAllUserAPI
}