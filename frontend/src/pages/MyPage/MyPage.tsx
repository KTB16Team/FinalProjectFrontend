import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import { Camera } from 'lucide-react';

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('닉네임');
  const [email] = useState('aimo@gamil.com');
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleWithdraw = () => {
    setShowWithdrawConfirm(true);
  };

  const handleWithdrawConfirm = () => {
    navigate('/login');
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="aimo"
        leftButton={<GoBackButton />}
      />

      <div 
        className="w-full"
        style={{
          marginTop: "15vh",
          height: "85vh",
          overflowY: 'auto',
        }}
      >
        {/* Profile 부분 */}
        <div className="flex items-center p-6 bg-white mb-3">
          <div 
            className="relative w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer group"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 text-2xl">{'M'}</span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full hidden group-hover:flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="ml-4 flex-1">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="text-lg font-medium bg-transparent text-left w-full outline-none"
            />
            <p className="text-gray-500 text-sm text-left">{email}</p>
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="bg-white">
          <ul className="divide-y">
            <li>
              <button 
                className="w-full px-6 py-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/change-password')}
              >
                비밀번호 변경
              </button>
            </li>
            <li>
              <button 
                className="w-full px-6 py-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/nickname')}
              >
                닉네임 변경
              </button>
            </li>
            <li>
              <button 
                className="w-full px-6 py-4 text-left hover:bg-gray-50"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </li>
            <li>
              <button 
                className="w-full px-6 py-4 text-left text-red-500 hover:bg-gray-50"
                onClick={handleWithdraw}
              >
                회원탈퇴
              </button>
            </li>
          </ul>
        </nav>

        {/* 회원 탈퇴 누르면 나타나는 모달 */}
        {showWithdrawConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-medium mb-2">정말 탈퇴하시겠습니까?</h3>
              <p className="text-gray-600 text-sm mb-6">
                탈퇴 시, 계정은 삭제되며 복구되지 않습니다.
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowWithdrawConfirm(false)}
                >
                  취소
                </button>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleWithdrawConfirm}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;