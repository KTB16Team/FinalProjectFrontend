import React from "react";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ children, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        <p className="mb-6 text-gray-800">{children}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            확인
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
