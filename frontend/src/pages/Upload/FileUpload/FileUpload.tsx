import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import CancelButton from "@/components/Button/CancelButton.tsx";
import { getPoint } from "@/apis/member.ts"; // 포인트 가져오는 함수
import Body from "@/components/Body/Body.tsx";
import ConfirmModal from "@/components/Modal/ConfirmModal.tsx";
import { useModal } from "@/contexts/ModalContext.tsx";
import { DECREASE_POINT } from "@/constants/point.ts";
import { getFilePreSignedUrl, postFileMetaData, uploadFileToS3 } from "@/apis/upload.ts";
import { GetPreSignedUrlRequest, PostFileMetaDataRequest, UploadFileToS3Form } from "@/types/UploadForm.ts";

const REQUIRED_POINTS = 10; // 업로드 시 차감 포인트
const MAX_FILE_SIZE_MB = 10; // 최대 파일 크기 (MB)

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null); // 업로드할 파일 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // ConfirmModal 표시 여부
  const [memberPoint, setMemberPoint] = useState<number>(0); // 회원 포인트
  const { showModal } = useModal();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // 파일 확장자 추출
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();

      // 허용된 확장자와 Prefix 매핑
      const allowedExtensions = [
        "png", "jpg", "jpeg", // 이미지
        "mp3", "wav", "ogg", "acc", "flac", "m4a", // 오디오
        "txt" // 텍스트
      ];

      if (!allowedExtensions.includes(extension!)) {
        showModal(
          '지원하지 않는 파일 형식입니다. 허용된 파일 형식만 업로드 가능합니다.',
          () => {}
        );
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        showModal(`파일 크기는 최대 ${MAX_FILE_SIZE_MB}MB까지 허용됩니다.`, () => {});
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleRegisterClick = async () => {
    if (!file) {
      showModal('업로드할 파일을 선택해주세요.', () => {});
      return;
    }

    setIsLoading(true);

    let currentPoints = 0;
    // 포인트 조회
    try {
      const response = await getPoint();
      currentPoints = response.data.data.memberPoint;
      setMemberPoint(currentPoints);
    } catch {
      showModal('포인트 조회 중 에러가 발생했습니다.', () => {});
      setIsLoading(false);
      return;
    }

    // 포인트 부족 시
    if (currentPoints < REQUIRED_POINTS) {
      showModal(
        `포인트가 부족합니다. 최소 ${DECREASE_POINT['ai-request']}P가 필요합니다. \n 현재포인트 : ${currentPoints}P`,
        () => {}
      );
      setIsLoading(false);
      return;
    }

    setShowConfirmModal(true);
    setIsLoading(false);
  };

  const handleConfirmUpload = async () => {
    if (!file) return;

    try {
      setIsLoading(true);

      // 파일 확장자 추출
      const extension = file.name.split('.').pop()?.toLowerCase();

      // 허용된 확장자와 Prefix 매핑
      const extensionToPrefixMap: { [key: string]: "IMAGE" | "AUDIO" | "TEXT" } = {
        png: "IMAGE",
        jpg: "IMAGE",
        jpeg: "IMAGE",
        mp3: "AUDIO",
        wav: "AUDIO",
        ogg: "AUDIO",
        acc: "AUDIO",
        flac: "AUDIO",
        m4a: "AUDIO",
        txt: "TEXT",
      };

      // Prefix 결정
      const prefix = extensionToPrefixMap[extension!];

      // Prefix가 없으면 업로드 불가
      if (!prefix) {
        showModal('지원하지 않는 파일 형식입니다.', () => {});
        return;
      }

      // 파일명에서 확장자 제거
      const filenameWithoutExtension = file.name.slice(0, file.name.lastIndexOf('.'));

      // 요청 생성
      const request: GetPreSignedUrlRequest = {
        filename: filenameWithoutExtension,
        extension: extension!,
        prefix: prefix,
      };

      // Presigned URL 가져오기
      const response = await getFilePreSignedUrl(request);
      const preSignedUrl = response.data.data.preSignedUrl;
      const key = response.data.data.key;

      // S3 업로드 요청 객체 생성
      const uploadRequest: UploadFileToS3Form = {
        file: file,
        preSignedUrl: preSignedUrl
      };

      // S3에 파일 업로드
      await uploadFileToS3(uploadRequest);
      showModal('파일 업로드가 완료되었습니다.', () => {});

      // 백엔드에 S3 메타정보 저장
      const postFileMetaDataRequest: PostFileMetaDataRequest = {
        filename: filenameWithoutExtension,
        key: key,
        extension: extension!,
        prefix: prefix
      };
      postFileMetaData(postFileMetaDataRequest);

    } catch (error) {
      showModal('파일 업로드 중 에러가 발생했습니다.', () => {
        console.error('Error during file upload:', error);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Header
        title="파일 업로드"
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
        <div className="text-gray-700 mb-4">
          파일을 업로드해주세요. <br />
          음성, 이미지를 형식을 지원합니다. <br />
          음성 - 대화 녹음 음성, 전화 녹음 음성 <br />
          이미지 - 카톡 스크린샷, 글 캡쳐본
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-700 mb-2 text-left">파일 선택</h2>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .mp3, .wav, .ogg, .acc, .flac, .m4a, .txt" // 허용 확장자 추가
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none"
          />
          {file && (
            <div className="mt-2 text-gray-600 text-sm">
              선택된 파일: {file.name}
            </div>
          )}
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
              handleConfirmUpload(); // 파일 업로드 수행
            }}
            onCancel={() => setShowConfirmModal(false)} // 모달 닫기
          >
            <p>업로드 시 {DECREASE_POINT['ai-request']}P가 차감됩니다.</p>
            <p>업로드 하시겠습니까?</p>
            <p>현재 포인트: {memberPoint}</p>
          </ConfirmModal>
        )}
      </Body>
    </div>
  );
}
