import React, {useContext, useState} from "react";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import {fetchLogin} from "@/apis/login.ts";
import styled from "styled-components";
import Button from "@/components/Button/Button.tsx";
import NavigateButton from "@/components/Button/NavigateButton.tsx";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const {login} = useContext(AuthContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fetchLogin({email, password})
      .then(
        (response) => {
          console.log(response);

          if (response.data.data) {
            const {accessToken, refreshToken} = response.data.data;
            login(accessToken, refreshToken);
          } else {
            setLoginError('로그인에 실패하였습니다.');
          }
        }
      );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-6 pt-48">
      <h1 className="text-6xl font-light mb-8 pb-4">aimo</h1>
      <div style={{ maxWidth: '320px' }} className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="aimo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white rounded-lg focus:outline-none text-sm shadow-sm"

            />
          </div>
          {/* 패스워드 버튼 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
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

          {/* Helper Links 위치와 스타일 조정 */}
          <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
            <button type="button" className="hover:text-gray-700">비밀번호 찾기</button>
            <button type="button" className="text-red-400 hover:text-red-500">회원가입</button>
          </div>

          {loginError && <p className="text-red-500 text-center text-sm">{loginError}</p>}
        </form>

        {/* 가로선 */}
        <div className="w-full h-px bg-gray-300 my-8" />

        {/* 카카오 로그인버튼 */}
        <button
          type="button"
          onClick={() => alert('카카오톡으로 로그인')}
          className="w-full py-3 bg-yellow-300 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.58 2 11C2 13.13 3.05 15.07 4.75 16.5C4.75 17.1 4.33 18.67 2 21C2 21 5.02 20.95 8.34 18.93C9.48 19.3 10.72 19.5 12 19.5C17.5 19.5 22 15.92 22 11.5C22 7.08 17.5 3 12 3Z"/>
          </svg>
          <span>카카오톡으로 로그인</span>
        </button>
      </div>

      {/* [수정] Footer 위치 조정 - fixed 제거하고 margin-top 추가 */}
      <footer className="flex items-center justify-center space-x-4 text-sm text-gray-500 pt-28 mb-6">
        <button type="button" className="hover:text-gray-700">이용약관</button>
        <button type="button" className="hover:text-gray-700">개인정보 처리방침</button>
        <button type="button" className="hover:text-gray-700">문의하기</button>
      </footer>
    </div>
  );
}

const Input = styled.input`
    display: block;
`