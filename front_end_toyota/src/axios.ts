import axios from 'axios';
import { logOutAction, updateTokens } from './app/slices/appSlice';
import { store } from './app/store';
import processENV from './configs/process';

const instance = axios.create({
    baseURL: processENV.VITE_URL_BACKEND,
});

instance.interceptors.request.use((config) => {
    const token = store.getState().auth.tokens?.access_token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        // Kiểm tra nếu lỗi 401 (Unauthorized) và request chưa được retry trước đó
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu đã retry
            try {
                const refreshToken = store.getState().auth.tokens?.refresh_token;
                if (!refreshToken) {
                    // Nếu không có refresh token, đăng xuất người dùng
                    store.dispatch(logOutAction());
                    return Promise.reject(error);
                }

                // Gửi request lấy token mới (giả sử endpoint là /auth/refresh)
                const response = await axios.post(
                    `${processENV.VITE_URL_BACKEND}/v1/user/refresh-token`,
                    { refresh_token: refreshToken },
                    // Nếu backend yêu cầu thêm header hoặc vớiCredentials thì cấu hình thêm ở đây
                );

                const newTokens = response.data.data;
                // Cập nhật token mới vào Redux store
                store.dispatch(updateTokens(newTokens));

                // Gán token mới vào header của request gốc và retry request đó
                originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
                return instance(originalRequest);
            } catch (refreshError) {
                // Nếu refresh token thất bại, đăng xuất người dùng và trả lỗi
                store.dispatch(logOutAction());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default instance;
