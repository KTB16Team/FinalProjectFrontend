import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: Comment[];
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태

  const addComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: '사용자1', // 실제로는 사용자 정보를 가져와야 함
      date: new Date().toISOString(),
      content: content,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
  };

  const addReply = (commentId: number, content: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), author: '사용자2', date: new Date().toISOString(), content, replies: [] }],
          }
          : comment
      )
    );
  };

  return (
    <div>
      <h2>댓글</h2>
      <CommentForm onSubmit={addComment} />
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={addReply} />
      ))}
    </div>
  );
};

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content);
    setContent(''); // 입력 후 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="댓글을 입력하세요" />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: number, content: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReply(comment.id, replyContent);
    setReplyContent(''); // 대댓글 입력 후 초기화
  };

  return (
    <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
      <p>{comment.author} | {comment.date}</p>
      <p>{comment.content}</p>

      {/* 대댓글 입력 */}
      <form onSubmit={handleReplySubmit}>
        <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="대댓글을 입력하세요" />
        <button type="submit">대댓글 작성</button>
      </form>

      {/* 대댓글 목록 */}
      {comment.replies.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;