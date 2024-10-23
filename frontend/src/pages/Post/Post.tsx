import VoteSection from "@/components/Post/Vote/VoteSection.tsx";
import CommentSection from "@/components/Comment/CommentSection.tsx";

const post = {
  author: 'React 선생님',
  createdat: '2024-10-21',
  name: 'React와 TypeScript에 대해',
  content: 'React와 TypeScript를 사용하면 더 안전한 코딩을 할 수 있습니다.',
  views: 100,
  likes: 100,
};

export default function Post() {
  return (
    <div>
      <h1>{post.name}</h1>
      <p>작성자: {post.author} | 작성일: {post.content}</p>
      <p>{post.content}</p>
      <p>좋아요: {post.likes}</p>

      {/* 투표 기능 컴포넌트 */}
      <VoteSection />

      {/* 댓글 기능 컴포넌트 */}
      <CommentSection />
    </div>
  );
}