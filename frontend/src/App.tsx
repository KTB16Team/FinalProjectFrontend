import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/shared/Theme.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
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

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {/* 로그인 페이지 */}
              <Route path="/login" element={<Login />} />

              {/* 회원 가입 페이지 */}
              <Route path="/signup" element={<SignUp />} />

              {/* 인증이 필요한 경로 */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      {/* 홈 페이지는 인증 필요 없음 */}
                      <Route path="/" element={<Home />} />
                      {/* 글 목록 페이지 */}
                      <Route path="/categories/:category" element={<PostList />} />

                      {/* 음성녹음 페이지 */}
                      <Route path="/audio-recorder" element={<AudioRecorder />} />

                      {/* 글 작성 페이지 */}
                      <Route path="/text-upload" element={<TextUpload />} />

                      {/* 게시판 목록 페이지 */}
                      <Route path="/categories" element={<PostCategory />} />

                      {/* 내 개인 글 목록 페이지 */}
                      <Route path="/my-private-posts" element={<MyPrivatePostList />} />

                      {/* 내 개인 글 게시물 페이지 */}
                      <Route path="/my-private-posts/:postId" element={<MyPrivatePostDetail />} />

                      {/* 포스트 디테일 페이지 */}
                      <Route path="/posts/:postId" element={<PostDetail />} />

                      {/* 인증된 사용자만 접근할 수 있는 프로필 페이지 */}
                      <Route path="/profile" element={<Home />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
