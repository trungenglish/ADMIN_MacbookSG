import axios from "../axiosCustomize.js";

const loginAPI = async (username, password) => {
    const URL_API = "/api/v1/admin/login";
    const data = { username, password }
    return axios.post(URL_API, data)
}

const createAdminAPI = async (name, username, email, phone, password, role) => {
    const URL_API = "/api/v1/admin/register";
    const data = {name, username, email, phone, password, role}
    return axios.post(URL_API, data)
}

export {
    loginAPI, createAdminAPI
};