import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import CancelButton from "@/components/Button/CancelButton.tsx";
import { uploadText } from "@/apis/upload.ts";
import { getPoint } from "@/apis/member.ts"; // 포인트 가져오는 함수
import { TextUploadForm } from "@/types/UploadForm.ts";
import { useNavigate } from "react-router-dom";
import Body from "@/components/Body/Body.tsx";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx";
import { useModal } from "@/contexts/ModalContext.tsx";
import {DECREASE_POINT} from "@/constants/point.ts";

const MIN_CONTENT_LENGTH = 10;
const MAX_CONTENT_LENGTH = 2500; // 최대 글자 수 제한
const REQUIRED_POINTS = 10; // 업로드 시 차감 포인트

export default function TextUpload() {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // ConfirmModal 표시 여부
  const [memberPoint, setMemberPoint] = useState<number>(0); // 회원 포인트
  const { showModal } = useModal();

  const navigate = useNavigate();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CONTENT_LENGTH) {
      setContent(value);
    }
  };

  const handleRegisterClick = async () => {
    if (content.length < MIN_CONTENT_LENGTH) {
      showModal('글은 최소 10자 이상이어야 합니다.', () => {});
      return;
    }

    setIsLoading(true);

    try {
      // 포인트 조회
      const response = await getPoint();
      const currentPoints = response.data.data.memberPoint;
      setMemberPoint(currentPoints);

      if (currentPoints < REQUIRED_POINTS) {
        showModal(`포인트가 부족합니다. 최소 ${DECREASE_POINT['ai-result']}P가 필요합니다.`, () => {});
        return;
      }

      setShowConfirmModal(true);
    } catch {
      showModal('포인트 조회 중 에러가 발생했습니다.', () => {});
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmUpload = () => {
    const request: TextUploadForm = {
      content: content,
    };

    setIsLoading(true);

    uploadText(request)
      .then((response) => {
        const data = response.data.data;
        showModal("텍스트가 업로드 되었습니다.", () => {navigate(`/my-private-posts/${data.privatePostId}`)});
      })
      .catch(() => {
        showModal('업로드 중 에러가 발생했습니다.', () => {});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="relative">
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
      <Body>
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-2 text-left">글 내용</h2>
          <textarea
            placeholder="사연을 입력해주세요."
            value={content}
            onChange={handleContentChange}
            rows={10}
            className="w-full h-80 p-4 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:border-mainColor"
          />
          <div className="text-right text-gray-500 mt-1">
            {content.length}/{MAX_CONTENT_LENGTH}자
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Confirm Modal */}
        {showConfirmModal && (
          <ConfirmModal
            onConfirm={() => {
              setShowConfirmModal(false);
              handleConfirmUpload(); // 업로드 수행
            }}
            onCancel={() => setShowConfirmModal(false)} // 모달 닫기
          >
            <p>업로드 시 ${DECREASE_POINT['ai-result']}P가 차감됩니다.</p>
            <p>업로드 하시겠습니까?</p>
            <p>현재 포인트: {memberPoint}</p>
          </ConfirmModal>
        )}
      </Body>
    </div>
  );
}
