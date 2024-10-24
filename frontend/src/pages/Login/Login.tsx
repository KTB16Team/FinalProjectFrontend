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
    <div>
      <h1>aimo</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          textColor='white'
          color="black"
          width="80%"
          label="로그인"
          type="submit"
        >
          로그인
        </Button>
        {loginError && <p style={{color: 'red'}}>{loginError}</p>}
      </form>

      <NavigateButton title="아이디 찾기" url="/"/>
      | <NavigateButton title="비밀번호 찾기" url="/"/>
      <NavigateButton title="회원가입" url="/signup"/>

      <Button
        color="#FAE300"
        textColor="black"
        width="80%"
        label="카카오톡으로 로그인"
        onClick={() => alert('카카오톡으로 로그인')}
        type="button"
      >
        카카오톡으로 로그인
      </Button>

      <footer>
        <NavigateButton title="이용약관" url="/"/>
        <NavigateButton title="개인정보 처리방침" url="/"/>
        <NavigateButton title="문의하기" url="/"/>
      </footer>
    </div>
  );
};

const Input = styled.input`
    display: block;
`