import axios from "../axiosCustomize.js";

const getAllProductAPI = async () => {
    const URL_API = "/api/v1/admin/product";
    return axios.get(URL_API);
}

const createProductAPI = async (name, price,priceAfterDiscount, imgUrls, description, idCategory, quantity, discount) => {
    const data = {
        name: name,
        price: price,
        priceAfterDiscount: priceAfterDiscount,
        imgUrls: imgUrls,
        description: description,
        idCategory: idCategory,
        quantity: quantity,
        discount: discount
    }
    const URL_API = "/api/v1/admin/product";
    return axios.post(URL_API, data);
}

const updateProductAPI = async (id, name, price,priceAfterDiscount, imgUrls, description, idCategory, quantity, discount) => {
    const data = {
        _id: id,
        name: name,
        price: price,
        priceAfterDiscount: priceAfterDiscount,
        imgUrls: imgUrls,
        description: description,
        idCategory: idCategory,
        quantity: quantity,
        discount: discount
    }
    const URL_API = "/api/v1/admin/product";
    return axios.put(URL_API, data);
}

const deleteProductAPI = async (id) => {
    const URL_API = `/api/v1/admin/product/${id}`;
    return axios.delete(URL_API);
}

export {
    getAllProductAPI, updateProductAPI, createProductAPI, deleteProductAPI
}