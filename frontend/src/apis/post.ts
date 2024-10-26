import axios from "axios";

interface Payload {
  page: number;
}
export const fetchMyPrivatePosts = async (payload: Payload) => {
  return await axios.get(`/api/v1/private-posts?page=${payload.page}&size=10`);
}

export const deleteMyPrivatePost = async (postId: number) => {
  return await axios.delete(`/api/v1/private-posts/${postId}`);
}

export const fetchPrivatePost = async (postId: number) => {
  return await axios.get(`/api/v1/private-posts/${postId}`);
}