import Header from '@/components/Header/Header';
import React, {useState} from 'react';
import CancelButton from "@/components/Button/CancelButton.tsx";

const MIN_CONTENT_LENGTH = 10;

export default function TextUpload() {
  const [content, setContent] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  // 글 내용이 변경될 때 호출되는 함수
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    // 글의 길이가 10자 이상이면 버튼 활성화
    setIsButtonEnabled(value.length >= MIN_CONTENT_LENGTH);
  };

  const handleNextClick = () => {
    // 버튼이 눌리면 실행될 로직
    alert('다음 단계로 이동합니다.');
    // 여기서 필요한 로직을 추가할 수 있습니다. 예를 들어 다음 페이지로 이동 등.
  };
  const handleRegisterClick =() => {
    alert('글이 등록되었습니다.');

  };

  return (
    <div>
      {/* 헤더에 등록 버튼 추가 */}
      <Header
        title="텍스트 업로드"
        rightButton={
          <button
            onClick={handleRegisterClick}
            className="text-mainColor text-sm font-medium"
            disabled={!isButtonEnabled}
          >
            등록
          </button>
        }
        leftButton={<CancelButton/>}
      />

      <div className="p-5">
        <h2 className="text-sm font-medium text-gray-700 mb-2 mt-32 text-left">글 내용</h2>
        <textarea
          placeholder="사연을 입력해주세요."
          value={content}
          onChange={handleContentChange}
          rows={10}
          className="w-full h-80 p-4 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:border-mainColor"
        />
      </div>
    </div>
  );
}

