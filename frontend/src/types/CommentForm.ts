export interface PostCommentForm {
  content: string;
}

export interface PutCommentForm {
  content: string;
}

export interface CommentForm {
  isMine: boolean;
  nickname: string;
  commentId: number;
  content: string;
  likesCount: number;
  createdAt: string;
  childComments: ChildCommentForm[];
}

export interface ChildCommentForm {
  isMine: boolean;
  nickname: string;
  childCommentId: number;
  content: string;
  likesCount: number;
  createdAt: string;
}

