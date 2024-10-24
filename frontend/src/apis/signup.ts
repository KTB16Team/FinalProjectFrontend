import axios from "axios";
import {SignUpForm} from "@/types/signUpForm.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  gender: string;
  birth: string;
}

export const signup =  async (signUpForm: SignUpForm) => {
  const request: SignUpRequest = {
    username: signUpForm.username,
    email: signUpForm.email,
    password: signUpForm.password,
    gender: signUpForm.gender,
    birth: signUpForm.birth
  }

  return await axios.post(`${BACKEND_URL}/api/v1/members/signup`, request);
}