import axios from "axios";

export const postVote = async (postId: number, side: string) => {
  return await axios.post(`/api/v1/posts/${postId}/votes?side=${side}`);
}