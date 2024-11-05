export interface MyPrivatePostForm {
  postId: number;
  title: string;
  contentPreview: string;
  originType: 'VOICE' | 'TEXT' | 'CHAT';
  createdAt: string;
  published: boolean;
}