import {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "@/contexts/AuthContext.tsx";

const KakaoOAuthCallback = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)!;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    console.log(accessToken);

    if (accessToken && refreshToken) {
      // 로컬 스토리지에 저장
      login(accessToken, refreshToken);

      // 인증 성공 후 대시보드로 이동
      navigate("/");
    } else {
      console.error("토큰이 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default KakaoOAuthCallback;