import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ILoginPayload {
  readonly name: string;
  readonly pw: string;
}

export const fetchLogin = async (loginPayload: ILoginPayload) => {
  return axios.post(`${BACKEND_URL}/api/members/login`, loginPayload, {
    withCredentials: true,
  });
};