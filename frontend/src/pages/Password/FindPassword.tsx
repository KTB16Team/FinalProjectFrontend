import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import BottomButton from "@/components/Button/BottomButton";
import LoginIdLogo from "@/assets/imgs/LoginId.svg?react";

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNext = () => {
    navigate('/reset-password'); // 비밀번호 재발급 페이지로 이동
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="비밀번호 찾기"
        leftButton={<GoBackButton />}
      />

      <div 
        className="w-full px-4 pb-[10vh]"
        style={{
          marginTop: "15vh",
          height: "85vh",
          overflowY: 'auto',
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-medium mb-6 mt-10">이메일 인증</h2>
          
          {/* Email Input Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <LoginIdLogo />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aimo@email.com"
                className="w-full pl-10 py-2 bg-transparent outline-none text-base"
              />
            </div>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-4">
            이메일이 기억나지 않는다면?{' '}
            <button 
              onClick={() => navigate('/password-reset')}
              className="text-red-500 underline"
            >
              비밀번호 재발급하기
            </button>
          </p>
        </div>
      </div>

      <BottomButton
        label="다음"
        onClick={handleNext}
        disabled={!email}
      />
    </div>
  );
};

export default FindPasswordPage;