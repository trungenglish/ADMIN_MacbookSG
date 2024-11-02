import axios from 'axios';
import NProgress from "nprogress";

NProgress.configure({
    showSpinner: true,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

instance.interceptors.request.use(config => {
    // Do something before request is sent
    NProgress.start();
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
}, error => {
    // Do something with request error
    NProgress.done();
    return Promise.reject(error);
});

instance.interceptors.response.use(
    response => {
        NProgress.done();
    if (response && response.data) {
        return response.data;
    }
    return response;
},
    async (error) => {
        NProgress.done();
        const originalRequest = error.config;
        // Kiểm tra nếu lỗi là 401 và chưa thử lại
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu đã thử lại

            try {
                // Gọi API để refresh token
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/refresh-token`,
                    { refreshToken }
                );

                // Lưu access token mới và gửi lại request ban đầu
                const newAccessToken = response.data.access_token;
                localStorage.setItem('access_token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest); // Gửi lại request
            } catch (refreshError) {
                console.error('Unable to refresh token:', refreshError);
                //logout and clear token
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;