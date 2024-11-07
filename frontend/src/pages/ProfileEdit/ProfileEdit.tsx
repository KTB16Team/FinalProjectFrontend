import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import { Camera } from 'lucide-react';
import BottomButton from "@/components/Button/BottomButton";
import Body from "@/components/Body/Body.tsx";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('닉네임');
  const [email, setEmail] = useState('aimo@naver.com');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEdited, setIsEdited] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsEdited(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setIsEdited(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEdited(true);
  };

  const handleSave = () => {
    // 프로필 저장 로직
    navigate('/my-page');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="프로필 편집"
        leftButton={<GoBackButton />}
      />

      <Body>
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-8 m mt-10">
          <div 
            className="relative w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer group mb-2"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 text-3xl">{'M'}</span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full hidden group-hover:flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button 
            className="text-blue-500 text-sm font-medium"
            onClick={handleImageClick}
          >
            프로필 사진 변경
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="space-y-6 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
        </div>
      </Body>

      <BottomButton
        label="저장"
        onClick={handleSave}
        disabled={!isEdited}
      />
    </div>
  );
};

export default ProfileEditPage;