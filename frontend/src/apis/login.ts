import axios from 'axios';
import {Login} from "@/types/login.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchLogin = async (login: Login) => {
  return axios.post(`${BACKEND_URL}/api/v1/members/login`, login, {
    withCredentials: true,
  });
};