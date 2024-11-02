import axios from "../axiosCustomize.js";

const getAllAdminAPI = async () => {
    const URL_API = "/api/v1/admin/administrator";
    return axios.get(URL_API);
}

const updateAdminAPI = async (_id, role, name, email, phone) => {
    const data = {
        _id: _id,
        role: role,
        name: name,
        email: email,
        phone: phone
    }
    const URL_API = "/api/v1/admin/";
    return axios.put(URL_API, data);
}

const deleteAdminAPI = async (_id) => {
    const URL_API = `/api/v1/admin//${_id}`;
    return axios.delete(URL_API);
}

export {
    getAllAdminAPI, deleteAdminAPI, updateAdminAPI
}