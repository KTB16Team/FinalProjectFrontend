import {axiosInstance} from "@/apis/index.ts";
import {JudgementForm} from "@/types/myPrivatePostForm.ts";
import {PostPostForm} from "@/types/postForm.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getMyPrivatePosts = async (page: number, size: number) => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/private-posts?page=${page}&size=${size}`);
}

export const deleteMyPrivatePost = async (postId: number) => {
  return await axiosInstance.delete(`${BACKEND_URL}/api/v1/private-posts/${postId}`);
}

export const getPrivatePost = async (postId: number) => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/private-posts/${postId}`);
}

export const getPosts = async (category: string, page: number, size: number) => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/posts?type=${category}&page=${page}&size=${size}`);
}

export const getPost = async (postId: number) => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/posts/${postId}`);
}

export const postPostLike = async (postId: number, likeType: string) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/posts/${postId}/likes?likeType=${likeType}`);
}

export const postPostView = async (postId: number) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/posts/${postId}/views`);
}

export const postJudgement = async (request: JudgementForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/private-posts/judgement`, request);
}

export const postPost = async (request: PostPostForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/posts`, request);
}

export const getAiResult = async (postId: number) => {
  return await axiosInstance.get(`${BACKEND_URL}/api/v1/posts/${postId}/judgement`);
}