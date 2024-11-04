import {CommentForm} from "@/types/CommentForm.ts";

export interface PostPreviewForm {
  postId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  views: number;
  likes: number;
  commentsCount: number;
  "voteRatePlaintiff": number;
  "voteRateDefendant": number;
}

export interface PostForm {
  title: string;
  nickname: string;
  content: string;
  votesPlaintiff: number;
  votesDefendant: number;
  likes: number;
  viewCount: number;
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  comments: CommentForm[];
}