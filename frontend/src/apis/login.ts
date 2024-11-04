import axios from 'axios';
import {LoginForm} from "@/types/loginForm.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchLogin = async (login: LoginForm) => {
  const params = new URLSearchParams();
  params.append('email', login.email);
  params.append('password', login.password);

  return axios.post(`${BACKEND_URL}/api/v1/members/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
  });
};