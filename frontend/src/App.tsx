import {ThemeProvider} from "styled-components";
import {theme} from "@/styles/shared/Theme.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import Home from "@/pages/Home/Home.tsx";
import Login from "@/pages/Login/Login.tsx";
import ProtectedRoute from "./components/Layout/ProtectedRoute.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import PostCategory from "@/pages/PostCategory/PostCategory.tsx";
import PostList from "@/pages/Post/PostList.tsx";
import AudioRecorder from "@/pages/Upload/AudioRecoder/AudioRecoder.tsx";
import TextUpload from "@/pages/Upload/TextUpload/TextUpload.tsx";
import MyPrivatePostList from "@/pages/MyPrivatePost/MyPrivatePostList.tsx";
import MyPrivatePostDetail from "@/pages/MyPrivatePost/MyPrivatePostDetail.tsx";
import PostDetail from "@/pages/Post/PostDetail.tsx";
import Page500 from "@/pages/error/Error500.tsx";
import MyPage from "@/pages/MyPage/MyPage.tsx";
import Withdraw from "@/pages/MyPage/Withdraw/Withdraw.tsx";
import ProfileEdit from "@/pages/MyPage/ProfileEdit/ProfileEdit.tsx";
import WithdrawAgreementPage from "@/pages/MyPage/Withdraw/Agree.tsx"
import ChangePasswordPage from '@/pages/MyPage/Password/PasswordChange.tsx'
import FindPasswordPage from "@/pages/MyPage/Password/FindPassword.tsx";
import ResetPasswordPage from "@/pages/MyPage/Password/ResetPassword.tsx";
import ResetPasswordCompletePage from "@/pages/MyPage/Password/ResetPasswordCompliete.tsx";
import AiResultDetail from "@/pages/Post/AiResult.tsx";
import KakaoOAuthCallback from "@/pages/Oauth/KakaoOAuthCallback.tsx";
import {ModalProvider} from "@/contexts/ModalContext.tsx";

function App() {
  return (
    <>
      <ModalProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login/>}/>

                {/* 회원 가입 페이지 */}
                <Route path="/signup" element={<SignUp/>}/>

                {/* 비밀번호 찾기 페이지 */}
                <Route path="/password-find" element={<FindPasswordPage/>}/>

                {/* 500 에러 페이지 */}
                <Route path="/500" element={<Page500/>}/>

                {/*카카오 콜백 페이지*/}
                <Route path="/oauth/callback/kakao" element={<KakaoOAuthCallback/>}/>

                {/* 인증이 필요한 경로 */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Routes>
                        {/* 홈 페이지는 인증 필요 없음 */}
                        <Route path="/" element={<Home/>}/>

                        {/* 마이 페이지 */}
                        <Route path="/my-page" element={<MyPage/>}/>

                        {/* 회원 탈퇴 페이지 */}
                        <Route path="/profile-edit" element={<ProfileEdit/>}/>

                        {/* 탈퇴 동의 페이지 */}
                        <Route path="/agree" element={<WithdrawAgreementPage/>}/>

                        {/* 비밀번호 변경 페이지 */}
                        <Route path="/password-change" element={<ChangePasswordPage/>}/>

                        {/* 비밀번호 재발급 페이지 */}
                        <Route path="/password-reset" element={<ResetPasswordPage/>}/>

                        {/* 비밀번호 재발급완료 페이지 */}
                        <Route path="/password-reset-complete" element={<ResetPasswordCompletePage/>}/>

                        {/* 프로필 편집 페이지 */}
                        <Route path="/withdraw" element={<Withdraw/>}/>

                        {/* 글 목록 페이지 */}
                        <Route path="/categories/:category" element={<PostList/>}/>

                        {/* 음성녹음 페이지 */}
                        <Route path="/audio-recorder" element={<AudioRecorder/>}/>

                        {/* 글 작성 페이지 */}
                        <Route path="/text-upload" element={<TextUpload/>}/>

                        {/* 게시판 목록 페이지 */}
                        <Route path="/categories" element={<PostCategory/>}/>

                        {/* 내 개인 글 목록 페이지 */}
                        <Route path="/my-private-posts" element={<MyPrivatePostList/>}/>

                        {/* 내 개인 글 게시물 페이지 */}
                        <Route path="/my-private-posts/:postId" element={<MyPrivatePostDetail/>}/>

                        {/* 포스트 디테일 페이지 */}
                        <Route path="/posts/:postId" element={<PostDetail/>}/>

                        {/*포스트 AiResult 페이지*/}
                        <Route path="/posts/:postId/judgement" element={<AiResultDetail/>}/>

                        {/* 인증된 사용자만 접근할 수 있는 프로필 페이지 */}
                        <Route path="/profile" element={<Home/>}/>
                      </Routes>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </ModalProvider>
    </>
  );
}

export default App;
