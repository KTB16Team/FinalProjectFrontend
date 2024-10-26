import {useState} from "react";
import {MyPrivatePostForm} from "@/types/myPrivatePostForm.ts";
import AudioLogo from "@/assets/imgs/Audio.svg?react";
import TextLogo from "@/assets/imgs/Text.svg?react";
import ChatLogo from "@/assets/imgs/Chat.svg?react";
import {useNavigate} from "react-router-dom";

interface PostItemProps {
  post: MyPrivatePostForm;
  onDelete: (id: number) => void;
}

export default function MyPrivatePostItem({post, onDelete}: PostItemProps) {
  const [isSwiped, setIsSwiped] = useState(false);
  const navigate = useNavigate();

  // 스와이프 이벤트 핸들러
  const handleSwipe = () => {
    setIsSwiped(!isSwiped);
  };

  const handleClick = () => {
    navigate(`/my-private-posts/${post.post_id}`);
  }

  // origin_type에 따라 올바른 로고 컴포넌트를 반환하는 함수
  const getLogoComponent = () => {
    switch (post.origin_type) {
      case "VOICE":
        return <AudioLogo style={{marginRight: '2vw'}}/>;
      case "TEXT":
        return <TextLogo style={{marginRight: '2vw'}}/>;
      case "CHAT":
        return <ChatLogo style={{marginRight: '2vw'}}/>;
      default:
        return null;
    }
  };

  return (
    <div onClick={handleClick} className="m-3 relative overflow-hidden">
      <div
        className={`rounded-lg bg-white flex items-center text-left p-4 transition-transform duration-300 ${isSwiped ? 'transform -translate-x-20' : ''}`}
        onTouchStart={handleSwipe}
      >

        {getLogoComponent()}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content_preview}</p>
          <p className="text-xs text-gray-500">{post.created_at}</p>
        </div>
      </div>
      <button
        className={`rounded-2xl absolute top-0 bottom-0 w-20 text-deleteButtonBackground bg-red-100 transition-all duration-300 ${isSwiped ? 'right-0' : '-right-20'}`}
        onClick={() => onDelete(post.post_id)}
      >
        삭제
      </button>
    </div>
  );
};
