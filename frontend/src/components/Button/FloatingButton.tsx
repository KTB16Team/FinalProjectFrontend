import React from "react";
import { useNavigate } from "react-router-dom";
import PlusLogo from "@/assets/imgs/Plus.svg?react";
import FileUploadLogo from "@/assets/imgs/FileUpload.svg?react";

interface FloatingActionButtonProps {
  showActions: boolean;
  onToggleActions: () => void;
}

const FloatingButton: React.FC<FloatingActionButtonProps> = ({ showActions, onToggleActions }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* 오버레이 */}
      {showActions && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onToggleActions}
        ></div>
      )}

      {/* Floating Action Buttons */}
      {showActions && (
        <div className="fixed bottom-24 right-4 flex flex-col items-center space-y-3 z-50">
          <button
            onClick={() => navigate('/text-upload')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative -mb-3"
          >
            <span className="text-gray-600 font-bold text-xl">T</span>
            <span className="absolute text-white text-sm -left-24">텍스트 업로드</span>
          </button>
          <button
            onClick={() => navigate('/file-upload')}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 relative -mb-3"
          >
            <FileUploadLogo className="w-6 h-6" />
            <span className="absolute text-white text-sm -left-24">파일 업로드</span>
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        className="fixed bottom-4 right-4 w-14 h-14 bg-red-400 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-500 transition-colors z-50"
        onClick={onToggleActions}
      >
        <PlusLogo className="w-6 h-6" />
      </button>
    </>
  );
};

export default FloatingButton;
