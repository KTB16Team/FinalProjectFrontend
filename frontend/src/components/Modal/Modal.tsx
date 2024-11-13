import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full text-center shadow-lg">
        <p className="mb-4">{children}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
