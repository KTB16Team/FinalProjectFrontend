import {CommentForm} from "@/types/commentForm.ts";

export interface PostPreviewForm {
  id: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  voteRatePlaintiff: number;
  voteRateDefendant: number;
}

export interface PostForm {
  isMine: boolean;
  postId: number;
  title: string;
  nickname: string;
  content: string;
  votesPlaintiff: number;
  votesDefendant: number;
  likesCount: number;
  viewsCount: number;
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  comments: CommentForm[];
}