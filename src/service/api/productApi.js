import axios from "../axiosCustomize.js";

const getAllProductAPI = async () => {
    const URL_API = "/api/v1/admin/product";
    return axios.get(URL_API);
}

const updateAvailableProductsAPI = async (id, isActive) => {
    const data = {isActive}
    const URL_API = `/api/v1/admin/product/availability/${id}`;
    return axios.put(URL_API, data);
}

const createProductAPI = async (name, description, idCategory, defaultVariant, variants, images, specifications) => {
    const data = {
        name: name,
        description: description,
        idCategory: idCategory,
        images: images,
        defaultVariant: defaultVariant,
        variants: variants,
        specifications: specifications
    };
    const URL_API = "/api/v1/admin/product";
    return axios.post(URL_API, data);
}

const updateProductAPI = async (id, name, description, idCategory, defaultVariant, variants, images, specifications) => {
    const data = {
        _id: id,
        name: name,
        description: description,
        idCategory: idCategory,
        images: images,
        defaultVariant: defaultVariant,
        variants: variants,
        specifications: specifications
    }
    const URL_API = "/api/v1/admin/product";
    return axios.put(URL_API, data);
}

const deleteProductAPI = async (id) => {
    const URL_API = `/api/v1/admin/product/${id}`;
    return axios.delete(URL_API);
}

const getProductByIdAPI = async (id) => {
    const URL_API = `/api/v1/admin/productById/${id}`;
    return axios.get(URL_API);
}

export {
    getAllProductAPI, updateProductAPI, createProductAPI, deleteProductAPI, updateAvailableProductsAPI,
    getProductByIdAPI
}