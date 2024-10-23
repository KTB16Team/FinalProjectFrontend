import {SimplePost} from "@/types/simplePost.ts";

export default function AllItem({id, title, likes, comments} : SimplePost) {
  return (
    <div className="bg-customGray rounded-lg mb-2 p-2">
      <span>[{id}] <span>{title}</span></span>
      <span className="mt-1">좋아요: {likes}</span>
      <span className="mt-1">댓글: {comments}</span>
    </div>
  );
}