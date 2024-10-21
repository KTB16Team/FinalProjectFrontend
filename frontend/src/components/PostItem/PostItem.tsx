import {Post} from "@/types/post.ts";
import {Link} from "react-router-dom";

interface PostItemProps {
  post: Post;
}

export default function PostItem({post}: PostItemProps) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div>
        <div>{post.id}</div>
        <div>{post.name}</div>
        <div>{post.content}</div>
        <div>
          <span>{post.createdAt}</span>
          <span>{post.views}</span>
          <span>{post.likes}</span>
          <span>{post.comments}</span>
        </div>
      </div>
    </Link>
  );
};