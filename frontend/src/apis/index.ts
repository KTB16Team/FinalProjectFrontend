import axios from 'axios';
import {logout, refreshAccessToken} from "@/contexts/AuthHelper.ts";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response?.data?.code === 'AUTH-001') {
      logout();
      return Promise.reject(error);
    }

    if (response?.data?.code === 'AUTH-003' && !config._retry) {
      config._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(config);
      }
    }

    return Promise.reject(error);
  }
);
