import {useContext, useState} from 'react';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import BottomButton from "@/components/Button/BottomButton";
import Body from "@/components/Body/Body.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import {deleteMember} from "@/apis/member.ts";
import {DeleteMemberForm} from "@/types/member.ts";
import {AuthContext} from "@/contexts/AuthContext.tsx";

const WithdrawAgreementPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const {logout} = useContext(AuthContext)!;

  const handleWithdraw = () => {
    if (isAgreed) {
      setShowModal(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
  };

  const handleConfirmWithdraw = () => {
    const request : DeleteMemberForm = {
      password: password,
    }

    deleteMember(request)
      .then(() => {
        console.log("회원 탈퇴가 완료되었습니다.");
        logout();
      })
      .catch((error) => {
        const response = error.response.data;

        if (response.code === 'MEMBER-001') {
          setPasswordError(true);
        } else {
          console.error("서버에서 에러가 발생했습니다.");
        }
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPassword('');
    setPasswordError(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="회원탈퇴"
        leftButton={<GoBackButton />}
      />

      <Body>
        <div className="p-6 pt-10">
          <h2 className="font-medium text-xl mb-1">
            <span>aimo를 </span>
            <span className="text-red-500">탈퇴</span>
            <span> 하시나요?</span>
          </h2>

          <div className="mt-1 pt-1 text-red-500 text-xs underline">
            *회원 탈퇴를 신청하기 전에 아래의 유의사항을 확인해 주세요*
          </div>

          <div className="bg-white p-4 rounded-lg mt-10 space-y-4 text-xs text-left">
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
      </Body>

      <BottomButton
        label="탈퇴하기"
        onClick={handleWithdraw}
        disabled={!isAgreed}
      />

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">비밀번호 확인</h3>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              className={`w-full p-2 border rounded ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">비밀번호가 틀렸습니다.</p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                취소
              </button>
              <button
                onClick={handleConfirmWithdraw}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WithdrawAgreementPage;
