import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import BottomButton from "@/components/Button/BottomButton.tsx";
import Body from "@/components/Body/Body.tsx";
import { updatePassword } from "@/apis/member.ts";
import { UpdatePasswordForm } from "@/types/member.ts";
import {useModal} from "@/contexts/ModalContext.tsx";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { showModal } = useModal();


  const handleSubmit = () => {
    let valid = true;

    if (!currentPassword) {
      setCurrentPasswordError(true);
      valid = false;
    }

    if (newPassword.length < 6) {
      setNewPasswordError(true);
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      valid = false;
    }

    if (!valid) {
      setGeneralError('모든 필드를 올바르게 입력하세요.');
      return;
    }

    const request: UpdatePasswordForm = {
      password: currentPassword,
      newPassword: newPassword,
    };

    updatePassword(request)
      .then(() => {
        showModal("비밀번호 변경이 완료되었습니다.", () => {});
        navigate('/my-page');
      })
      .catch((error) => {
        const response = error.response.data;
        if (response.code === 'MEMBER-001') {
          setCurrentPasswordError(true);
          setGeneralError('현재 비밀번호가 틀렸습니다.');
        } else {
          showModal("서버에서 에러가 발생했습니다.", () => {});
        }
      });
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    setCurrentPasswordError(false);
    setGeneralError('');
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setNewPasswordError(false);
    setGeneralError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false);
    setGeneralError('');
  };

  return (
    <div>
      <Header
        title="비밀번호 변경"
        leftButton={<GoBackButton />}
      />

      <Body className="bg-background">
        <div className="space-y-6">
          {/* 현재 비밀번호 섹션 */}
          <div>
            <h3 className="mt-10 text-left text-base font-medium mb-2">현재 비밀번호</h3>
            <div className={`bg-white rounded-lg p-4 ${currentPasswordError ? 'border border-red-500' : ''}`}>
              <input
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                placeholder="현재 비밀번호"
                className="w-full bg-transparent outline-none text-base"
              />

            </div>
            {currentPasswordError && (
              <p className="text-red-500 text-sm mt-2">현재 비밀번호를 입력하세요.</p>
            )}
          </div>

          {/* 새 비밀번호 섹션 */}
          <div>
            <h3 className="text-left text-base font-medium mb-2">새 비밀번호</h3>
            <div className="space-y-2">
              <div className={`bg-white rounded-lg p-4 ${newPasswordError ? 'border border-red-500' : ''}`}>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="새 비밀번호"
                  className="w-full bg-transparent outline-none text-base"
                />
              </div>
              {newPasswordError && (
                <p className="text-red-500 text-sm mt-2">새 비밀번호는 6자 이상이어야 합니다.</p>
              )}
              <div className={`bg-white rounded-lg p-4 ${confirmPasswordError ? 'border border-red-500' : ''}`}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="새 비밀번호 확인"
                  className="w-full bg-transparent outline-none text-base"
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-2">새 비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>
        </div>

        {generalError && (
          <p className="text-red-500 text-center mt-4">{generalError}</p>
        )}
      </Body>

      <BottomButton
        label="비밀번호 변경"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ChangePasswordPage;
