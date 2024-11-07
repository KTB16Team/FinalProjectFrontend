import {PostPreviewForm} from "@/types/postForm.ts";
import {Link} from "react-router-dom";

interface PopularItemProps {
  post: PostPreviewForm;
  index: number;
}

export default function PopularItem({ post, index }: PopularItemProps) {
  return (
    <Link key={post.id} className="block bg-white p-4 mb-4 -mx-3" to={`/posts/${post.id}`}>
      <div className="flex items-start mt-4">
        <span className="text-xl font-bold text-red-500 mr-3">{index + 1}</span>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mr-2">커뮤니티</span>
            <h3 className="text-base font-medium">{post.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-21 mr-4 text-left line-clamp-2">{post.contentPreview}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
          </div>
          <div className="mt-3 h-1 flex w-[calc(100%-2rem)]">
            <div className="bg-red-400" style={{width: `${post.voteRatePlaintiff}%`}}/>
            <div className="bg-blue-400" style={{width: `${post.voteRateDefendant}%`}}/>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-3 pr-8">
            <div className="flex items-center gap-2">
              <span>{post.createdAt}</span>
              <span>조회 {post.viewsCount}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>👍 {post.likesCount}</span>
              <span>💬 {post.commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}