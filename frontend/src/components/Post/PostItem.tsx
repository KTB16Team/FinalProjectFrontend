import { Link } from "react-router-dom";
import { PostPreviewForm } from "@/types/postForm.ts";
import LikeLogo from "@/assets/imgs/Like.svg?react";
import CommentLogo from "@/assets/imgs/Comment.svg?react";

interface PostItemProps {
  post: PostPreviewForm;
}

export default function PostItem({ post }: PostItemProps) {
  // 투표 퍼센트 계산
  const plaintiffRate = post.voteRatePlaintiff;
  const defendantRate = 100 - plaintiffRate;

  return (
    <div className="bg-white rounded-2xl mb-2 p-3 shadow-md">
      <Link to={`/posts/${post.id}`}>
        <div className="text-left">
          <div className="text-lg font-semibold">{post.title}</div>
          <div className="text-gray-500">{post.contentPreview}</div>

          {/*막대 그래프*/}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${plaintiffRate}%` }}
              title={`Plaintiff: ${post.voteRatePlaintiff}%`}
            />
            <div
              className="bg-red-500 h-full"
              style={{ width: `${defendantRate}%` }}
              title={`Defendant: ${post.voteRateDefendant}%` }
            />
          </div>

          {/*메타 정보*/}
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
