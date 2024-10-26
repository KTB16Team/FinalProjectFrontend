import axios from "axios";

interface Payload {
  page: number;
}
export const fetchMyPrivatePosts = async (payload: Payload) => {
  return await axios.get(`/api/v1/posts/private?page=${payload.page}&size=10`);
}

export const deleteMyPrivatePost = async (postId: number) => {
  return await axios.delete(`/api/v1/posts/member/${postId}`);
}