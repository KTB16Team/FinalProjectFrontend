import {useNavigate} from 'react-router-dom';
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import BottomButton from "@/components/Button/BottomButton.tsx";
import Body from "@/components/Body/Body.tsx";

const ResetPasswordCompletePage = () => {
    const navigate = useNavigate();
    const email = "aimo@email.com"; // 실제로는 이전 페이지에서 전달받은 이메일을 사용
  
    const handleConfirm = () => {
      navigate('/login');
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
          <div className="flex flex-col items-center justify-center p-6 text-center" style={{ marginTop: '30vh' }}>
            <h2 className="text-2xl mb-4">
              <span className="text-red-500">임시 비밀번호</span> 발급완료
            </h2>
            <p className="text-gray-500 text-sm mt-4 mb-1">
              {email} 로 인증 메일이 전송되었습니다.
            </p>
            <p className="text-gray-500 text-sm">
              이메일 주소로 전송된 임시 비밀번호를 확인해 주세요.
            </p>
          </div>
        </Body>
  
        <BottomButton
          label="확인"
          onClick={handleConfirm}
          disabled={false}
        />
      </div>
    );
  };

export default ResetPasswordCompletePage;