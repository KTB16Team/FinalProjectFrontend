import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "@/components/Header/Header";
import GoBackButton from "@/components/Button/GoBackButton";
import Body from "@/components/Body/Body.tsx";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {getProfile} from "@/apis/member.ts";
import {GetProfileForm} from "@/types/member.ts";
import LoadingWithBackgroundGray from "@/components/Loading/LoadingWithBackgroundGray.tsx";
import {useModal} from "@/contexts/ModalContext.tsx";

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<GetProfileForm | null>(null);
  const {logout} = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState(false);
  const { showModal } = useModal();



  const handleLogout = () => {
    logout();
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
  };

  const fetchProfile = () => {
    setIsLoading(true);

    getProfile()
      .then((response) => {
        const data = response.data.data;

        const profile: GetProfileForm = {
          nickname: data.nickname,
          email: data.email,
          profileImage: "",
          point: data.point
        };

        setProfile(profile);
      }).catch(() => {
        showModal('프로필을 불러오는 중 오류가 발생했습니다.', () => {navigate('/500')});
      }).finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="aimo"
        leftButton={<GoBackButton/>}
      />

      <Body>
        {/*프로필*/}
        <div className="flex items-center p-6 bg-white mb-3">
          <div className="relative w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {profile?.profileImage ? (
              // <img
              //   src={profile.profileImage}
              //   alt="Profile"
              //   className="w-full h-full rounded-full object-cover"
              // />
              <span className="text-gray-600 text-2xl">{'M'}</span>
            ) : (
              <span className="text-gray-600 text-2xl">{'M'}</span>
            )}
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-medium text-left">{profile?.nickname}</h2>
            <p className="text-gray-500 text-sm text-left">{profile?.email}</p>
            <p className="text-gray-500 text-sm text-left">P {profile?.point}P</p>
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

        {isLoading && <LoadingWithBackgroundGray/>}
      </Body>
    </div>
  );
};

export default MyPage;