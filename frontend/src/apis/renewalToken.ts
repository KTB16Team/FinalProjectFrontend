// src/api/axiosInstance.tsx
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useAxiosInstance = () => {
  const { accessToken, refreshAccessToken, logout } = useContext(AuthContext)!;

  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
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
      const originalRequest = error.config;

      // 401 발생시 accessToken 재발급
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          logout();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
