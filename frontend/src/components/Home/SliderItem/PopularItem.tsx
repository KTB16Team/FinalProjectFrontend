import { PostPreviewForm } from "@/types/postForm.ts";
import { Link } from "react-router-dom";
import VoteGauge from "@/components/Vote/VoteGauge.tsx";

interface PopularItemProps {
  post: PostPreviewForm;
  index: number;
}

export default function PopularItem({ post, index }: PopularItemProps) {
  return (
    <Link key={post.id} className="block bg-white p-4 mb-4 -mx-3 shadow-sm hover:shadow-md transition-shadow" to={`/posts/${post.id}`}>
      <div className="flex items-start mt-4">
        <span className="text-xl font-bold text-red-500 mr-3">{index + 1}</span>
        <div className="flex-1">

          {/*제목*/}
          <div className="flex items-center mb-2">
            <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mr-2">커뮤니티</span>
            <h3 className="text-base font-medium">{post.title}</h3>
          </div>

          {/*글 내용 미리보기*/}
          <p className="text-sm text-gray-600 mb-2 text-left line-clamp-2">{post.contentPreview}</p>
          <div className="flex justify-between items-center text-sm text-gray-500"></div>

          {/*투표 게이지*/}
          <VoteGauge voteRatePlaintiff={post.voteRatePlaintiff} voteRateDefendant={post.voteRateDefendant} />

          {/*조회수, 좋아요, 댓글 수*/}
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
