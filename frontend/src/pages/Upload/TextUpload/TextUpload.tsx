import Header from '@/components/Header/Header';
import React, {useState} from 'react';
import CancelButton from "@/components/Button/CancelButton.tsx";
import {uploadText} from "@/apis/upload.ts";
import {TextUploadForm} from "@/types/UploadForm.ts";
import {useNavigate} from "react-router-dom";

const MIN_CONTENT_LENGTH = 10;

export default function TextUpload() {
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleRegisterClick = () => {
    if (content.length < MIN_CONTENT_LENGTH) {
      alert('글은 최소 10자 이상이어야 합니다.');
      return;
    }

    const request: TextUploadForm = {
      script: content
    };

    uploadText(request)
      .then(() => {
        alert('글이 등록되었습니다.');
        navigate(-1);
      })
  };

  return (
    <div>
      <Header
        title="텍스트 업로드"
        rightButton={
          <button
            onClick={handleRegisterClick}
            className="text-mainColor text-sm font-medium"
          >
            등록
          </button>
        }
        leftButton={<CancelButton />}
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
