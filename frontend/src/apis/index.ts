import axios from 'axios';
import {useContext} from "react";
import {AuthContext} from "@/contexts/AuthContext.tsx";

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
    const authContext = useContext(AuthContext);

    // 에러 코드가 AUTH-001, AccessToken 만료이면 로그아웃 처리
    if (response?.data?.code === 'AUTH-001') {
      authContext?.logout();
      return Promise.reject(error);
    }

    // 에러 코드가 AUTH-003, AccessToken 만료이면 새로운 AccessToken 요청
    if (response?.data?.code === 'AUTH-003' && !config._retry) {
      config._retry = true;
      const newAccessToken = await authContext?.refreshAccessToken();

      if (newAccessToken) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(config);
      }
    }

    return Promise.reject(error);
  }
);
