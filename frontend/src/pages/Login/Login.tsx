import React, {useContext, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {fetchLogin} from "@/apis/login.ts";
import {Link, useNavigate} from "react-router-dom";
import LoginIdLogo from "@/assets/imgs/LoginId.svg?react";
import PasswordLogo from "@/assets/imgs/Password.svg?react";
import KakaoLogo from "@/assets/imgs/Kakao.svg?react";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const {login} = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fetchLogin({email, password})
      .then(
        (response) => {
          if (response.data.data) {
            const {accessToken, refreshToken} = response.data.data;
            login(accessToken, refreshToken);
            navigate('/')
          } else {
            setLoginError('로그인에 실패하였습니다.');
          }
        }
      );
  };

  const handleFindPassword = () => {
    navigate('/password-find');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-6 pt-48">
      <h1 className="text-6xl font-light mb-8 pb-4">aimo</h1>
      <div style={{maxWidth: '320px'}} className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 창 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <LoginIdLogo/>
            </div>
            <input
              type="text"
              placeholder="aimo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white rounded-lg focus:outline-none text-sm shadow-sm"

            />
          </div>
          {/* 패스워드 창 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <PasswordLogo/>
            </div>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white rounded-lg focus:outline-none text-sm shadow-sm"

            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-red-400 text-white rounded-lg font-medium hover:bg-red-500 transition-colors"
          >
            로그인
          </button>

          <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
            <button type="button" onClick={handleFindPassword}
              className="hover:text-gray-700">비밀번호 찾기</button>
            <Link to="/signup" type="button" className="text-red-400 hover:text-red-500">회원가입</Link>
          </div>

          {loginError && <p className="text-red-500 text-center text-sm">{loginError}</p>}
        </form>

        {/* 가로선 */}
        <div className="w-full h-px bg-gray-300 my-8"/>

        {/* 카카오 로그인버튼 */}
        <button
          type="button"
          onClick={() => alert('카카오톡으로 로그인')}
          className="w-full py-3 bg-yellow-300 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
        >
          <KakaoLogo width="20"/>
          <span>카카오톡으로 로그인</span>
        </button>
      </div>

      <footer className="flex items-center justify-center space-x-4 text-sm text-gray-500 pt-28 mb-6">
        <button type="button" className="hover:text-gray-700">이용약관</button>
        <button type="button" className="hover:text-gray-700">개인정보 처리방침</button>
        <button type="button" className="hover:text-gray-700">문의하기</button>
      </footer>
    </div>
  );
}
