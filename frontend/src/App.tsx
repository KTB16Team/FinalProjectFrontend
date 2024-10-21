import './App.css'
import {ThemeProvider} from "styled-components";
import {theme} from "@/styles/shared/Theme.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import Home from "@/pages/Home/Home.tsx";
import Login from "@/pages/Login/Login.tsx";
import ProtectedRoute from "./components/Layout/ProtectedRoute.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import Navbar from "@/components/Navbar/Navbar.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import PostCategory from "@/pages/PostCategory/PostCategory.tsx";
import PostList from "@/pages/PostList/PostList.tsx";
import Post from "@/pages/Post/Post.tsx";

function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              {/* 홈 페이지는 인증 필요 없음 */}
              <Route path="/" element={<Home/>}/>

              {/* 로그인 페이지 */}
              <Route path="/login" element={<Login/>}/>

              {/*회원 가입 페이지 */}
              <Route path="/signup" element={<SignUp/>}/>

              {/*글 목록 페이지*/}
              <Route path="/categories/:category" element={<PostList/>}/>

              {/*글*/}
              <Route path="/post/:postId" element={<Post/>}/>

              {/* 인증된 사용자만 접근할 수 있는 경로 */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                }
              />

              {/* 게시판 목록 페이지 */}
              <Route path="/categories" element={<PostCategory/>}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
