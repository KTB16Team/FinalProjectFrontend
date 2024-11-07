import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import BottomButton from "@/components/Button/BottomButton";
import LoginIdLogo from "@/assets/imgs/LoginId.svg?react";
import Body from "@/components/Body/Body.tsx";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  
    const handleNext = () => {
      // 비밀번호 재발급 처리 로직
      navigate('/password-reset-complete');
    };
  
    return (
      <div>
        <Header
          title="비밀번호 재발급"
          leftButton={<GoBackButton />}
        />
  
        <Body
          className="bg-background"
        >
          <div className="p-4">
          <h2 className="text-xl font-medium mb-6 mt-10 text-left">
            aimo에 가입한 정보로 <span className="text-red-500">비밀번호</span>를 임시 발급 받으세요
          </h2>
  
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
  
            <p className="text-sm text-gray-500 mt-4">
              입력하신 정보로 임시 비밀번호가 발급됩니다.
            </p>
          </div>
        </Body>
  
        <BottomButton
          label="다음"
          onClick={handleNext}
          disabled={!email}
        />
      </div>
    );
  };
export default ResetPasswordPage;