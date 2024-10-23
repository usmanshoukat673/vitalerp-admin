// AxiosContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';

const AxiosContext = createContext();

export const useAxios = () => {
    return useContext(AxiosContext);
};

export const AxiosProvider = ({ children }) => {
    const [axiosInstance, setAxiosInstance] = useState(axios.create({ baseURL: '' }));
    const token = useSelector((state) => state.token.activeToken);
    const company = useSelector((state) => state.orgs.company);

    useEffect(() => {
        const updateHeaders = () => {

            const localAxiosInstance = axios.create({
                baseURL: '',
            });

            localAxiosInstance.interceptors.request.use(
                (config) => {
                    const token = store.getState().token.activeToken;
                    const company = store.getState().orgs.company;

                    config.headers.Authorization = `${token.token_type} ${token.access_token}`;

                    config.headers['X-Company-ID'] = company.id;

                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
            setAxiosInstance(localAxiosInstance);
        };

        // Initial setup
        updateHeaders();

        // Subscribe to changes in the Redux store and update headers accordingly
        const unsubscribe = () => {
            updateHeaders();
        };

        return unsubscribe;
    }, [token, company]);

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
};