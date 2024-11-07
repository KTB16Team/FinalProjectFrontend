import {CommentForm} from "@/types/commentForm.ts";

export interface PostPreviewForm {
  postId: number;
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

export interface PostPostForm {
  privatePostId: number;
  title: string;
  stancePlaintiff: string;
  stanceDefendant: string;
  summaryAi: string;
  judgement: string;
  originType: 'VOICE' | 'TEXT' | 'CHAT';
}

export interface AiResultForm {
  title: string;
  summary: string;
  stancePlaintiff: string;
  stanceDefendant: string;
  judgement: string;
  faultRatePlaintiff: number;
  faultRateDefendant: number;
}