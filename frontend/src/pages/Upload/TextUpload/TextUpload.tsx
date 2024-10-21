import React, { useState } from 'react';

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

  return (
    <div>
      <h2>글 작성하기</h2>
      <textarea
        placeholder="글 내용을 10자 이상 작성해주세요."
        value={content}
        onChange={handleContentChange}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleNextClick} disabled={!isButtonEnabled}>
        다음
      </button>
    </div>
  );
};

