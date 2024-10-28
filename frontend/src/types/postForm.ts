export interface PostForm {
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