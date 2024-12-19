// 대댓글 좋아요
import {axiosInstance} from "@/apis/index.ts";
import {SendEmailCodeForm} from "@/types/emailForm.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const sendReissuePasswordEmailCode = async (request : SendEmailCodeForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/email/verification-request/password-reissue`, request);
}

export const sendSignupEmailCode = async (request : SendEmailCodeForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/email/verification-request/signup`, request);
}