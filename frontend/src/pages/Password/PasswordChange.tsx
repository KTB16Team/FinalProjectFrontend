import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import BottomButton from "@/components/Button/BottomButton";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // 비밀번호 변경 로직
    navigate('/my-page');
  };

  const isValid = currentPassword && newPassword && confirmPassword 
                 && newPassword === confirmPassword;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="비밀번호 변경"
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
        <div className="space-y-6">
          {/* 현재 비밀번호 섹션 */}
          <div>
            <h3 className="mt-10 text-left text-base font-medium mb-2">현재 비밀번호</h3>
            <div className="bg-white rounded-lg p-4">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호"
                className="w-full bg-transparent outline-none text-base"
              />
            </div>
          </div>

          {/* 새 비밀번호 섹션 */}
          <div>
            <h3 className="text-left text-base font-medium mb-2">새 비밀번호</h3>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호"
                  className="w-full bg-transparent outline-none text-base"
                />
              </div>
              <div className="bg-white rounded-lg p-4">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호 확인"
                  className="w-full bg-transparent outline-none text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomButton
        label="비밀번호 변경"
        onClick={handleSubmit}
        disabled={!isValid}
      />
    </div>
  );
};

export default ChangePasswordPage;