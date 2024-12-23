import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "@/components/Header/Header.tsx";
import GoBackButton from "@/components/Button/GoBackButton.tsx";
import {Camera} from 'lucide-react';
import BottomButton from "@/components/Button/BottomButton.tsx";
import Body from "@/components/Body/Body.tsx";
import {getProfile, saveProfileImageMetaData, updateNickname} from "@/apis/member.ts";
import {PostProfileImageMetaDataRequest, UpdateNicknameForm} from "@/types/member.ts";
import LoadingWithBackgroundGray from "@/components/Loading/LoadingWithBackgroundGray.tsx";
import {useModal} from "@/contexts/ModalContext.tsx";
import {GetPreSignedUrlRequest, UploadFileToS3Form} from "@/types/UploadForm.ts";
import {getFilePreSignedUrl, uploadFileToS3} from "@/apis/upload.ts";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {showModal} = useModal();
  const [file, setFile] = useState<File | null>(null); // 업로드할 파일 상태
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const fetchProfile = () => {
    setIsLoading(true);

    getProfile()
      .then((response) => {
        const data = response.data.data;

        setNickname(data.nickname)
        setProfileImageUrl(data.profileImageUrl);
      }).catch(() => {
      showModal('프로필을 불러오는 중 오류가 발생했습니다.', () => {
        navigate('/500')
      });
    }).finally(() => {
      setIsLoading(false);
    });
  }

  // 프로필 이미지 클릭 핸들러
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      // 허용된 확장자가 아닌 경우
      const extension = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = ["png", "jpg", "jpeg"];
      if (!allowedExtensions.includes(extension!)) {
        showModal(
          '지원하지 않는 파일 형식입니다. 허용된 파일 형식만 업로드 가능합니다.',
          () => {
          }
        );
        return;
      }

      // 파일을 읽어 프로필 이미지로 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result as string);
        setIsEdited(true);
      };
      reader.readAsDataURL(file);

      // 파일 상태 업데이트
      setFile(file);
    }
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setIsEdited(true);
  };

  // 프로필 업데이트 핸들러
  const handleUpdateProfile = async () => {
    setIsLoading(true);

    // 닉네임 변경
    const updateNickNameRequest: UpdateNicknameForm = {
      newNickname: nickname,
    }

    try {
      let success = false;
      await updateNickname(updateNickNameRequest)
        .then(() => {
          success = true;
        })
        .catch((error) => {
          const response = error.response.data;

          if (response.code === 'MEMBER-004') {
            showModal("중복된 닉네임입니다.", () => {
            });
            return;
          }
        })
      if (!success) {
        return;
      }

      // 프로필 이미지 변경
      if (!file) {
        showModal("프로필이 변경되었습니다.", () => {
        });
        return;
      }

      const extension = file.name.split('.').pop()?.toLowerCase();
      const prefix = "PROFILE";

      // 프로필 presigned url 요청
      const getProfilePreSignedUrlRequest: GetPreSignedUrlRequest = {
        filename: file.name,
        extension: extension!,
        prefix: prefix,
      };
      const response = await getFilePreSignedUrl(getProfilePreSignedUrlRequest);
      const preSignedUrl = response.data.data.preSignedUrl;
      const key = response.data.data.key;

      // S3 업로드 요청 객체 생성
      const uploadRequest: UploadFileToS3Form = {
        file: file,
        preSignedUrl: preSignedUrl
      };
      uploadFileToS3(uploadRequest);

      // 백엔드에 S3 메타정보 저장
      const postProfileImageMetaDataRequest: PostProfileImageMetaDataRequest = {
        filename: file.name,
        key: key,
        extension: extension!,
        prefix: prefix
      };
      await saveProfileImageMetaData(postProfileImageMetaDataRequest);

      showModal("프로필이 변경되었습니다.", () => {
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="프로필 편집"
        leftButton={<GoBackButton/>}
      />

      <Body>
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-8 m mt-10">
          <div
            className="relative w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer group mb-2"
            onClick={handleImageClick}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 text-3xl">{'M'}</span>
            )}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 rounded-full hidden group-hover:flex items-center justify-center">
              <Camera className="w-8 h-8 text-white"/>
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
              placeholder={nickname}
            />
          </div>
        </div>

        {isLoading && <LoadingWithBackgroundGray/>}
      </Body>

      <BottomButton
        label="저장"
        onClick={handleUpdateProfile}
        disabled={!isEdited}
      />
    </div>
  );
};

export default ProfileEditPage;