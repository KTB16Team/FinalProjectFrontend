import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import BottomButton from "@/components/Button/BottomButton.tsx";
import LoginIdLogo from "@/assets/imgs/LoginId.svg?react";
import Body from "@/components/Body/Body.tsx";
import {sendReissuePasswordEmailCode,} from "@/apis/email.ts";
import {SendEmailCodeForm} from "@/types/emailForm.ts";
import {useModal} from "@/contexts/ModalContext.tsx";
import {reissuePassword} from "@/apis/member.ts";
import {ReissuePasswordForm} from "@/types/member.ts";

const ReissuePasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const {showModal} = useModal();

  // 이메일 인증 코드 요청
  const handleSendCode = () => {
    if (email) {
      const request: SendEmailCodeForm = {
        email: email
      };

      sendReissuePasswordEmailCode(request)
        .catch((error) => {
          const response = error.response;

          if (response.code === "EMAIL-004") {
            showModal('이미 가입된 이메일 주소입니다.', () => {
            });
          } else {
            showModal('서버에서 에러가 발생했습니다.', () => {
            });
          }
        });

      setIsCodeSent(true);
    }
  };

  // 인증 코드 확인
  const handleCheckCode = () => {
    // 코드 확인 로직 (API 호출 또는 조건 검사)
    const request: ReissuePasswordForm = {
      email: email,
      code: code
    }
    reissuePassword(request)
      .then(() => {
        showModal('새 비밀번호가 발급되었습니다. 이메일을 확인해주세요.', () => {
        });
        navigate('/login');
      })
      .catch((error) => {
        const response = error.response;

        if (response.code === "EMAIL-005") {
          showModal('이메일 코드가 틀렸습니다.', () => {
          });
        }
        if (response.code === "EMAIL-001") {
          showModal('이메일 인증이 필요합니다.', () => {
          });
        } else {
          showModal('서버에서 에러가 발생했습니다.', () => {
          });
        }
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="비밀번호 재발급" leftButton={<GoBackButton/>}/>

      <Body>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-6 mt-10">이메일 인증</h2>

          {/* Email Input Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <LoginIdLogo/>
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

          {/* 인증 코드 요청 버튼 */}
          {!isCodeSent && (
            <BottomButton
              label="인증 코드 전송"
              onClick={handleSendCode}
              disabled={!email}
            />
          )}

          {/* 인증 코드 입력 섹션 */}
          {isCodeSent && (
            <>
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="text-lg font-medium mb-2">인증 코드 입력</h3>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="인증 코드를 입력하세요"
                  className="w-full p-2 border rounded-lg outline-none"
                />
              </div>

              {/* 인증 코드 확인 버튼 */}
              <BottomButton
                label="재발급"
                onClick={handleCheckCode}
                disabled={!code}
              />
            </>
          )}
        </div>
      </Body>
    </div>
  );
};

export default ReissuePasswordPage;
