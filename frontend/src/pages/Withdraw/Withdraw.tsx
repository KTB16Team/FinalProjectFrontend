import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import BottomButton from '@/components/Button/BottomButton';

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const withdrawReasons = [
    '자주 사용하지 않아요.',
    '휴대폰 번호가 바뀔 예정이에요',
    '앱 오류가 있어요.',
    '개인정보가 걱정돼요.',
    '알림이 너무 자주 와요.',
    '직접입력'
  ];

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setShowCustomInput(reason === '직접입력');
  };

  const handleNext = () => {
    navigate('/agree');
  };

  return (
    <div className="pt-6 bg-gray-50 min-h-screen">
      <Header
        title="회원탈퇴"
        leftButton={<GoBackButton />}
      />

      <div 
        className="w-full px-4"
        style={{
          marginTop: "15vh",
          height: "85vh",
          overflowY: 'auto',
        }}
      >
        <div className="p-4">
          <h2 className="text-xl mb-1">
            <span className="font-medium">aimo를</span>
            <span className="text-red-500 font-medium"> 탈퇴</span>
            <span className="font-medium"> 하시나요?</span>
          </h2>
          <p className="text-gray-600 mb-4 text-sm">*탈퇴하시는 이유를 알려주세요*</p>

          <div className="space-y-2 p-4">
            {withdrawReasons.map((reason) => (
              <div 
                key={reason}
                className="bg-white rounded-lg"
              >
                <button
                  className={`w-full p-4 text-left border rounded-lg ${
                    selectedReason === reason 
                      ? 'border-red-500 text-red-500' 
                      : 'border-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleReasonSelect(reason)}
                >
                  {reason}
                </button>
              </div>
            ))}
          </div>

          {showCustomInput && (
            <div className="mt-4">
              <input
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="선택해주세요."
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          )}

          <p className="text-xs text-gray-500 text-left">
            계정을 삭제하시려는 이유를 말씀해주세요. 제품 개선에 중요자료로 활용하겠습니다.
          </p>
        </div>

        <BottomButton
        label="다음"
        onClick={handleNext}
        disabled={!selectedReason || (showCustomInput && !customReason)}
        />
        </div>
      </div>
  );
};

export default WithdrawPage;