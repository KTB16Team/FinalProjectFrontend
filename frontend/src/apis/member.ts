import {axiosInstance} from "@/apis/index.ts";
import {DeleteMemberForm, UpdatePasswordForm, UpdateNicknameForm} from "@/types/member.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteMember = async (request: DeleteMemberForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/members`, request);
}

export const updatePassword = async (request: UpdatePasswordForm) => {
  return await axiosInstance.put(`${BACKEND_URL}/api/v1/members/password`, request);
}

export const getProfile = async () => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/members`);
}

export const updateNickname = async (request: UpdateNicknameForm) => {
  return await axiosInstance.put(`${BACKEND_URL}/api/v1/members/nickname`, request);
}