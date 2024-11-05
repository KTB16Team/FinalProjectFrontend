import {useState, useRef} from "react";
import {MyPrivatePostForm} from "@/types/myPrivatePostForm.ts";
import AudioLogo from "@/assets/imgs/Audio.svg";
import TextLogo from "@/assets/imgs/Text.svg";
import ChatLogo from "@/assets/imgs/Chat.svg";
import {useNavigate} from "react-router-dom";

interface MyPrivatePostItemProps {
  post: MyPrivatePostForm;
  onDelete: (id: number) => void;
 }
 
 const MyPrivatePostItem = ({post, onDelete}: MyPrivatePostItemProps) => {
  const getIcon = () => {
    const iconStyle = "w-8 h-8";
    switch (post.origin_type) {
      case 'VOICE':
        return (
          <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'TEXT':
        return (
          <span className="text-3xl font-medium">T</span>
        );
      case 'CHAT':
        return (
          <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="bg-white rounded-3xl shadow p-6 mb-4"> {/* padding과 margin 증가 */}
      <div className="flex items-start"> {/* align-items 수정 */}
        <div className="flex items-center justify-center mr-6 mt-6 w-6"> {/* 아이콘과 컨텐츠 사이 간격 증가 */}
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex items-center mb-2">
            {/* 공개를 제목 왼쪽에다 하니까 제목 위치가 공개글만 위치가 오른쪽으로 밀려서 그냥 제목 오른쪽 끝으로 이동시킴(변경사항) */}
            <h3 className="text-lg font-medium flex-1 text-left">{post.title}</h3>
            {!post.published && (
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">공개</span> 
            )}
          </div>
          <p className="text-gray-500 mb-3 font-light text-left">{post.content_preview}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{formatDate(post.created_at)}</span>
            <span className="mx-2"></span>
            <span>조회 475</span> {/* 조회수 추가 */}
          </div>
        </div>
      </div>
    </div>
  );
 };
 
 export default MyPrivatePostItem;
