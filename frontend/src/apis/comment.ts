import {PostCommentForm, PutCommentForm} from "@/types/CommentForm.ts";
import {axiosInstance} from "@/apis/index.ts";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// 댓글 쓰기
export const postComment = async (postId: number, body: PostCommentForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/posts/${postId}/comments`, body);
}

// 댓글 수정
export const putComment = async (commentId: number, body: PutCommentForm) => {
  return await axiosInstance.put(`${BACKEND_URL}/api/v1/posts/comments/${commentId}`, body);
}

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  return await axiosInstance.delete(`${BACKEND_URL}/api/v1/posts/comments/${commentId}`);
}

// 댓글 좋아요
export const postCommentLike = async (commentId: number, likeType: string) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/comments/${commentId}/likes?likeType=${likeType}`);
}

// 대댓글 쓰기
export const postChildComment = async (postId: number, commentId: number, body: PostCommentForm) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/posts/${postId}/comments/${commentId}/child`, body);
}

// 대댓글 수정
export const putChildComment = async (childCommentId: number, body: PutCommentForm) => {
  return await axiosInstance.put(`${BACKEND_URL}/api/v1/posts/comments/child/${childCommentId}`, body);
}

// 대댓글 삭제
export const deleteChildComment = async (childCommentId: number) => {
  return await axiosInstance.delete(`${BACKEND_URL}/api/v1/posts/comments/child/${childCommentId}`);
}

// 대댓글 좋아요
export const postChildCommentLike = async (childCommentId: number, likeType: string) => {
  return await axiosInstance.post(`${BACKEND_URL}/api/v1/comments/child/${childCommentId}/likes?likeType=${likeType}`);
}