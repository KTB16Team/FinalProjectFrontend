export interface PostCommentForm {
  content: string;
}

export interface PutCommentForm {
  content: string;
}

export interface CommentForm {
  is_mine: boolean;
  username: string;
  comment_id: number;
  content: string;
  likes: number;
  created_at: string;
  child_comments: ChildCommentForm[];
}

export interface ChildCommentForm {
  is_mine: boolean;
  username: string;
  child_comments_id: number;
  content: string;
  likes: number;
  created_at: string;
}

