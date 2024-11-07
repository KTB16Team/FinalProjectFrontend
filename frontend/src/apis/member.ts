import {axiosInstance} from "@/apis/index.ts";
import {DeleteMemberForm} from "@/types/member.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteMember = async (request: DeleteMemberForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/members`, request);
}