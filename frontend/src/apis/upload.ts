import {axiosInstance} from "@/apis/index.ts";
import {TextUploadForm} from "@/types/UploadForm.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadText = async (request: TextUploadForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/private-posts/text`, request);
}