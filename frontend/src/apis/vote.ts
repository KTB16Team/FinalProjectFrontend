import {axiosInstance} from "@/apis/index.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postVote = async (postId: number, side: string) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/posts/${postId}/votes?side=${side}`);
}