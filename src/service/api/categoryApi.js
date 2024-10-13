import axios from "../axiosCustomize.js";

const getAllCategoryAPI =  () => {
    const URL_API = "/api/v1/admin/category";
    return axios.get(URL_API);
}

const createCategoryAPI =  (name) => {
    const data = {
        name: name,
    }
    const URL_API = "/api/v1/admin/category";
    return axios.post(URL_API, data);
}

const updateCategoryAPI =  (name) => {
    const data = {
        name: name,
    }
    const URL_API = "/api/v1/admin/category";
    return axios.put(URL_API, data);
}

const deleteCategoryAPI = (_id) => {
    const URL_API = `/api/v1/admin/category/$${_id}`;
    return axios.post(URL_API);
}

export {
    getAllCategoryAPI, createCategoryAPI, deleteCategoryAPI, updateCategoryAPI
}