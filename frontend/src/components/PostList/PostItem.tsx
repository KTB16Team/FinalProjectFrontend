import {PostForm} from "@/types/postForm.ts";
import {Link} from "react-router-dom";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import LikeLogo from "@/assets/imgs/Like.svg?react";

interface PostItemProps {
  post: PostForm;
}

export default function PostItem({post}: PostItemProps) {
  return (
    <div className="bg-white rounded-2xl mb-2">
      <Link to={`/posts/${post.id}`}>
        <div className="text-left">
          <div>{post.id}</div>
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div className="flex flex-row">
            <div>{post.createdAt}</div>
            <div>조회 {post.views}</div>
            <div className="flex flex-row"><LikeLogo/>{post.likes}</div>
            <div className="flex flex-row"><CommentLogo/>{post.comments}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};