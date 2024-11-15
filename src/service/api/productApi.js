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

const createProductAPI = async (name, description, idCategory, defaultVariant, variants, images) => {
    const data = {
        name: name,
        description: description,
        idCategory: idCategory,
        images: images,
        defaultVariant: defaultVariant,
        variants: variants
    };
    const URL_API = "/api/v1/admin/product";
    return axios.post(URL_API, data);
}

const updateProductAPI = async (id, name, condition, price,priceAfterDiscount, imgUrls, description, idCategory, quantity, discount) => {
    const data = {
        _id: id,
        name: name,
        condition: condition,
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

const getProductByIdAPI = async (id) => {
    const URL_API = `/api/v1/admin/productById/${id}`;
    return axios.get(URL_API);
}

export {
    getAllProductAPI, updateProductAPI, createProductAPI, deleteProductAPI, updateAvailableProductsAPI,
    getProductByIdAPI
}