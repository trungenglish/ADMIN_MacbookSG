import axios from '../axiosCustomize.js';

const getAllUserAPI = () => {
    const URL_API = "/api/v1/admin/users";
    return axios.get(URL_API);
}

const createUserAPI = (fullName, email, password, phoneNumber, city) => {
    const data = {
        name: fullName,
        email: email,
        password: password,
        phone: phoneNumber,
        city: city
    }
    const URL_API = "/api/v1/admin/users";
    return axios.post(URL_API, data);
}

const updateUserAPI = (_id, name, phone, city, email) => {
    const data = {
        _id: _id,
        name: name,
        phone: phone,
        city: city,
        email: email
    }
    const URL_API = "/api/v1/admin/users";
    return axios.put(URL_API, data);
}

const deleteUserAPI = (_id) => {
    const URL_API = `/api/v1/admin/users/${_id}`;
    return axios.delete(URL_API);
}

export {
    getAllUserAPI, createUserAPI, updateUserAPI, deleteUserAPI
}