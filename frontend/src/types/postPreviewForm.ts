import {CommentForm} from "@/types/CommentForm.ts";

export interface PostPreviewForm {
  post_id: number;
  title: string;
  content_preview: string;
  created_at: string;
  views: number;
  likes: number;
  comments_count: number;
  "vote_rate_plaintiff": number;
  "vote_rate_defendant": number;
}

export interface PostForm {
  title: string;
  username: string;
  content: string;
  votes_plaintiff: number;
  votes_defendant: number;
  likes: number;
  view_count: number;
  votes_count: number;
  comments_count: number;
  created_at: string;
  comments: CommentForm[];
}