import axios from 'axios';
import {LoginForm} from "@/types/loginForm.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchLogin = async (login: LoginForm) => {
  return axios.post(`${BACKEND_URL}/api/v1/members/login`, login, {
    withCredentials: true,
  });
};