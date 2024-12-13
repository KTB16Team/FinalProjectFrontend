import {axiosInstance} from "@/apis/index.ts";
import {
  GetPreSignedUrlRequest,
  PostFileMetaDataRequest,
  TextUploadForm,
  UploadFileToS3Form
} from "@/types/UploadForm.ts";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadText = async (request: TextUploadForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/private-posts/judgement/text`, request);
}

export const getFilePreSignedUrl = async (request : GetPreSignedUrlRequest) => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/file/presigned?filename=${request.filename}&prefix=${request.prefix}`);
}

export const uploadFileToS3 = async (request: UploadFileToS3Form) => {
  return await axios.put(request.preSignedUrl, request.file, {
    headers: {
      'Content-Type': request.file.type, // 파일 타입 설정
    },
  });
};

export const postFileMetaData = async (request: PostFileMetaDataRequest) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/file`, request);
}