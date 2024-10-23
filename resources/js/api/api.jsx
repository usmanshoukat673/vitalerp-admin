import axios from 'axios';
import { deleteStore } from '../store/localStorage';
import { NotificationManager } from 'react-notifications';

const axiosInstance = axios.create({
    baseURL: '',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const store = JSON.parse(sessionStorage.getItem('__vitalerp_appstate__'));
        const token = store.token.activeToken;
        const company = store.orgs.company;
        config.headers.Authorization = `${token.token_type} ${token.access_token}`;
        config.headers['X-Company-ID'] = company.id;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Handle 401 Unauthorized error (e.g., log out the user)
                NotificationManager.error('Session Expired.', 'Error');
                deleteStore();
                // :TODO: want to dispatch actions to update the auth state here.
            } else if (error.response.status === 500) {
                // Handle 500 Internal Server Error (e.g., display an error message)
                NotificationManager.error('Server Error, Please contact customer support.', 'Error');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;