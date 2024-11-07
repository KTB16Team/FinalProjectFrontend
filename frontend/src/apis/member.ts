import {axiosInstance} from "@/apis/index.ts";
import {DeleteMemberForm, UpdatePasswordForm} from "@/types/member.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteMember = async (request: DeleteMemberForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/members`, request);
}

export const updatePassword = async (request: UpdatePasswordForm) => {
  return await axiosInstance.put(`${BACKEND_URL}/api/v1/members/password`, request);
}