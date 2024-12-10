import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  showModal: (content: ReactNode, onConfirm: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);

  const showModal = (content: ReactNode, onConfirm: () => void) => {
    setModalContent(content);
    setOnConfirmAction(() => onConfirm);
  };

  const closeModal = () => {
    setModalContent(null);
    setOnConfirmAction(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full text-center shadow-lg">
            <p className="mb-4">{modalContent}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  onConfirmAction?.();
                  closeModal();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
