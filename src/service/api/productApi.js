import axios from "../axiosCustomize.js";

const getAllProductAPI = async () => {
    const URL_API = "/api/v1/admin/products";
    return axios.get(URL_API);
}

export {
    getAllProductAPI
}