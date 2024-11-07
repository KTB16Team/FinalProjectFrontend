import { PostPreviewForm } from "@/types/postPreviewForm.ts";
import { Link } from "react-router-dom";

interface MyPublicItemProps {
  post: PostPreviewForm;
}

export default function MyPublicItem({ post }: MyPublicItemProps) {
  return (
    <Link key={post.postId} className="block p-4" to={`/posts/${post.postId}`}>
      <div className="flex items-center mb-4">
        <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mr-2">
          커뮤니티
        </span>
        <h3 className="text-base font-medium">{post.title}</h3>
      </div>
      <p 
        className="text-sm text-gray-600 mb-4 text-left"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {post.contentPreview}
      </p>
      <div className="mt-3 mb-4 h-1 flex w-[calc(100%-2rem)]">
        <div 
          className="bg-red-400" 
          style={{width: `${post.voteRatePlaintiff}%`}}
        />
        <div 
          className="bg-blue-400" 
          style={{width: `${post.voteRateDefendant}%`}}
        />
      </div>
    </Link>
  );
}