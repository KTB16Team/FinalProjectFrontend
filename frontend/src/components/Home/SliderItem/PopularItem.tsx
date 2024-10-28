import {PostForm} from "@/types/postForm.ts";

export default function PopularItem({post_id, title, content_preview, created_at, likes, comments_count} : PostForm) {
  return (
    <div className="bg-white border-8 border-grey-300 rounded-2xl mb-2">
      <span>[{post_id}]</span> <span className="text-2xl font-bold">{title}</span>
      <p className="mt-2">{content_preview}</p>
      <p className="mt-1">작성일: {created_at}</p>
      <p className="mt-1">좋아요: {likes}</p>
      <p className="mt-1">댓글: {comments_count}</p>
    </div>
  );
}