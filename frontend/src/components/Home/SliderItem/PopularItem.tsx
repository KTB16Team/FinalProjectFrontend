import {Post} from "@/types/post.ts";

export default function PopularItem({id, title, content, createdAt, likes, comments} : Post) {
  return (
    <div className="bg-white border-8 border-grey-300 rounded-2xl mb-2">
      <span>[{id}]</span> <span className="text-2xl font-bold">{title}</span>
      <p className="mt-2">{content}</p>
      <p className="mt-1">작성일: {createdAt}</p>
      <p className="mt-1">좋아요: {likes}</p>
      <p className="mt-1">댓글: {comments}</p>
    </div>
  );
}