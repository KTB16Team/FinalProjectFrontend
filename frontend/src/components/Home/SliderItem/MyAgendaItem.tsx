import {Post} from "@/types/post.ts";

export default function SliderItem({id, title, content, createdAt, views, likes, comments}: Post) {
  return (
    <div className="bg-white border-8 border-grey-300 rounded-2xl">
      <span>[{id}]</span> <span className="text-2xl font-bold">{title}</span>
      <p className="mt-2">{content}</p>
      <p className="mt-1">작성일: {createdAt}</p>
      <p className="mt-1">조회수: {views}</p>
      <p className="mt-1">좋아요: {likes}</p>
      <p className="mt-1">댓글: {comments}</p>
    </div>
  );
}