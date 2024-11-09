import { PostPreviewForm } from "@/types/postForm";
import { Link } from "react-router-dom";
import VoteGauge from "@/components/Vote/VoteGauge.tsx";

interface MyPublicItemProps {
  post: PostPreviewForm;
}

export default function MyPublicItem({ post }: MyPublicItemProps) {

  return (
    <Link key={post.id} className="block p-5 bg-white rounded-lg overflow-hidden mr-2" to={`/posts/${post.id}`}>
      <div className="flex items-center mb-4">
        <span
          className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mr-2"
          style={{ whiteSpace: 'nowrap' }} // 줄 바꿈 방지 스타일 추가
        >
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
      <VoteGauge voteRatePlaintiff={post.voteRatePlaintiff} voteRateDefendant={post.voteRateDefendant} />
    </Link>
  );
}
