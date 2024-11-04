import {PostPreviewForm} from "@/types/postPreviewForm.ts";

export default function PopularItem({postId, title, contentPreview, createdAt, likes, commentsCount} : PostPreviewForm) {
  return (
    <div className="bg-white border-8 border-grey-300 rounded-2xl mb-2">
      <span>[{postId}]</span> <span className="text-2xl font-bold">{title}</span>
      <p className="mt-2">{contentPreview}</p>
      <p className="mt-1">작성일: {createdAt}</p>
      <p className="mt-1">좋아요: {likes}</p>
      <p className="mt-1">댓글: {commentsCount}</p>
    </div>
  );
}