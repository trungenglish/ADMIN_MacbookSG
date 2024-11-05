import axios from "../axiosCustomize.js";

const getAllOrderAPI = async () => {
    const URL_API = "/api/v1/admin/order";
    return axios(URL_API)
}

const deleteOrderAPI = async (id) => {
   const URL_API = `/api/v1/admin/order/${id}`;
   return axios.delete(URL_API);
}

export {
    getAllOrderAPI, deleteOrderAPI
}
