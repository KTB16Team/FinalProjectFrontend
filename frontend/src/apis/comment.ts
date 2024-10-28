import axios from "axios";
import {PostCommentForm, PutCommentForm} from "@/types/CommentForm.ts";

// 댓글 쓰기
export const postComment = async (postId: number, body: PostCommentForm) => {
  return await axios.post(`/api/v1/posts/${postId}/comments`, body);
}

// 댓글 수정
export const putComment = async (commentId: number, body: PutCommentForm) => {
  return await axios.put(`/api/v1/posts/comments/${commentId}`, body);
}

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  return await axios.delete(`/api/v1/posts/comments/${commentId}`);
}

// 댓글 좋아요
export const postCommentLike = async (commentId: number) => {
  return await axios.put(`/api/v1/posts/comments/${commentId}/likes`);
}

// 대댓글 쓰기
export const postChildComment = async (postId: number, commentId: number, body: PostCommentForm) => {
  return await axios.post(`/api/v1/posts/${postId}/comments/${commentId}/child`, body);
}

// 대댓글 수정
export const putChildComment = async (childCommentId: number, body: PutCommentForm) => {
  return await axios.put(`/api/v1/posts/comments/child/${childCommentId}`, body);
}

// 대댓글 삭제
export const deleteChildComment = async (childCommentId: number) => {
  return await axios.delete(`/api/v1/posts/comments/child/${childCommentId}`);
}

// 대댓글 좋아요
export const postChildCommentLike = async (childCommentId: number) => {
  return await axios.put(`/api/v1/posts/comments/${childCommentId}/likes`);
}