import { Link } from "react-router-dom";
import { PostPreviewForm } from "@/types/postForm.ts";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import CommentLogo from "@/assets/imgs/Comment.svg?react";
import VoteGauge from "@/components/Vote/VoteGauge.tsx";

interface PostItemProps {
  post: PostPreviewForm;
}

export default function PostItem({ post }: PostItemProps) {

  return (
    <div className="bg-white rounded-2xl mb-2 p-5 shadow-md">
      <Link to={`/posts/${post.id}`}>
        <div className="text-left">
          <div className="text-lg font-semibold">{post.title}</div>
          <div
            className="text-gray-500 mb-2 line-clamp-2"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.contentPreview}
          </div>

          {/* 막대 그래프 */}
          <VoteGauge voteRatePlaintiff={post.voteRatePlaintiff} voteRateDefendant={post.voteRateDefendant} />

          {/* 메타 정보 */}
          <div className="flex flex-row mt-2 text-sm text-gray-600">
            <div className="mr-3">{post.createdAt}</div>
            <div className="mr-3">조회 {post.viewsCount}</div>
            <div className="mr-3 flex items-center"><LikeLogo /> {post.likesCount}</div>
            <div className="flex items-center"><CommentLogo /> {post.commentsCount}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
