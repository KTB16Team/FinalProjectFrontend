import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import BottomButton from "@/components/Button/BottomButton";

const WithdrawAgreementPage = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleWithdraw = () => {
    if (isAgreed) {
      // 실제 회원탈퇴 처리 로직
      navigate('/login');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="회원탈퇴"
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
        <div className="p-6 pt-10">
          <h2 className="font-medium text-xl mb-1">
            <span>aimo를 </span>
            <span className="text-red-500">탈퇴</span>
            <span> 하시나요?</span>
          </h2>

          <div className="mt-1 pt-1 text-red-500 text-xs underline">
            *회원 탈퇴를 신청하기 전에 아래의 유의사항을 확인해 주세요*
          </div>

          <div className="bg-white p-4 rounded-lg  mt-10 space-y-4 text-xs text-left">
            <p>
              계정을 삭제하면 회원님의 모든 콘텐츠와 활동 기록, 포인트,충전 적립, 
              사용 내역이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
            </p>
            <p>
              포인트 충전을 통해 적립한 포인트는 계정 삭제 완료이 불가합니다.
              또한 환불 신청 후 환불 처리가 완료되기 전 계정을 삭제하는 경우 포인트 
              구매 기록을 확인할 수 없으므로 환불이 불가합니다.
            </p>
            <p>
              내용 확인 후 동의할 경우 체크표시해주세요.
            </p>
          </div>

          <div className="mt-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <span className="text-sm">
                안내사항을 모두 확인하였으며, 이에 동의합니다.
              </span>
            </label>
          </div>
        </div>
      </div>

      <BottomButton
        label="탈퇴하기"
        onClick={handleWithdraw}
        disabled={!isAgreed}
      />
    </div>
  );
};

export default WithdrawAgreementPage;