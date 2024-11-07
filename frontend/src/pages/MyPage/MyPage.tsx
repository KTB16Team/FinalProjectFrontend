import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname] = useState('닉네임');
  const [email] = useState('aimo@gamil.com');
  const [profileImage] = useState<string | null>(null);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
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
        {/* Profile Section */}
        <div className="flex items-center p-6 bg-white mb-3">
          <div className="relative w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 text-2xl">{'M'}</span>
            )}
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-medium text-left">{nickname}</h2>
            <p className="text-gray-500 text-sm text-left">{email}</p>
          </div>
        </div>

        {/* Settings Menu */}
        <nav className="bg-white">
          <ul className="divide-y">
            <li>
              <button 
                className="w-full px-6 py-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/profile-edit')}
              >
                프로필 편집
              </button>
            </li>
            <li>
              <button 
                className="w-full px-6 py-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/password-change')}
              >
                비밀번호 변경
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
      </div>
    </div>
  );
};

export default MyPage;