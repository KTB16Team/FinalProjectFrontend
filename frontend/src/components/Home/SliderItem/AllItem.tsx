import {PostPreviewForm} from "@/types/postPreviewForm.ts";
import {Link} from "react-router-dom";

interface AllItemProps {
  post: PostPreviewForm;
}

export default function AllItem({ post }: AllItemProps) {
  return (
    <Link className="block bg-customGray rounded-lg mb-2 p-2" to={`/posts/${post.id}`}>
      <span>[{post.id}] <span>{post.title}</span></span>
      <span className="mt-1">좋아요: {post.likesCount}</span>
      <span className="mt-1">댓글: {post.commentsCount}</span>
    </Link>
  );
}