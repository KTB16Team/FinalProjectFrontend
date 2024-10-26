export interface MyPrivatePostForm {
  post_id: number;
  title: string;
  content_preview: string;
  origin_type: 'VOICE' | 'TEXT' | 'CHAT';
  created_at: string;
  published: boolean;
}