import axios from "axios";

export const getMyPrivatePosts = async (page: number, size: number) => {
  return await axios.get(`/api/v1/private-posts?page=${page}&size=${size}`);
}

export const deleteMyPrivatePost = async (postId: number) => {
  return await axios.delete(`/api/v1/private-posts/${postId}`);
}

export const getPrivatePost = async (postId: number) => {
  return await axios.get(`/api/v1/private-posts/${postId}`);
}

export const getPosts = async (category: string, page: number, size: number) => {
  return await axios.get(`/api/v1/posts?category=${category}page=${page}&size=${size}`);
}

export const getPost = async (postId: number) => {
  return await axios.get(`/api/v1/posts/${postId}`);
}