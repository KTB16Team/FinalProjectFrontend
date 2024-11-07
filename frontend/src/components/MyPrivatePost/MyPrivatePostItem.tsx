import { useState, TouchEvent } from "react";
import { MyPrivatePostPreviewForm } from "@/types/myPrivatePostForm.ts";
import { Link } from "react-router-dom";

interface MyPrivatePostItemProps {
  post: MyPrivatePostPreviewForm;
  onDelete: (id: number) => void;
}

const MyPrivatePostItem = ({ post, onDelete }: MyPrivatePostItemProps) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touchX = e.touches[0].clientX;
    if (startX - touchX > 50) { // 슬라이드 거리가 50px 이상일 때 삭제 버튼 표시
      setIsSwiped(true);
    }
    if (startX - touchX < -50) { // 오른쪽으로 슬라이드하면 다시 숨김
      setIsSwiped(false);
    }
  };

  const handleTouchEnd = () => {
    // 스와이프가 완료되지 않았을 때 기본 상태로 초기화
    setStartX(0);
  };

  const getIcon = () => {
    switch (post.originType) {
      case 'VOICE':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'TEXT':
        return (
          <span className="text-3xl font-medium">T</span>
        );
      case 'CHAT':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}. ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div
      className="relative overflow-hidden mb-6"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(post.privatePostId)}
        className="absolute top-0 right-0 h-full bg-mainColor text-white px-4 py-2 rounded-3xl"
      >
        삭제
      </button>

      {/* 카드 아이템 */}
      <Link
        className={`block bg-white rounded-3xl shadow p-5 transition-transform duration-300 ease-in-out ${
          isSwiped ? "-translate-x-20" : "translate-x-0"
        }`}
        to={`/my-private-posts/${post.privatePostId}`}
      >
        <div className="flex items-start">
          <div className="flex items-center justify-center mr-6 mt-6 w-6">
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium flex-1 text-left">{post.title}</h3>
              {post.published && (
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">공개</span>
              )}
            </div>
            <p className="text-gray-500 mb-3 font-light text-left">{post.contentPreview}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MyPrivatePostItem;
