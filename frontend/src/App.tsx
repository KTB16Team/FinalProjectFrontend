import './App.css'
import {ThemeProvider} from "styled-components";
import {theme} from "@/styles/shared/Theme.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import Home from "@/pages/Home/Home.tsx";
import Login from "@/pages/Login/Login.tsx";
import ProtectedRoute from "./components/Layout/ProtectedRoute.tsx";


function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {/* 홈 페이지는 인증 필요 없음 */}
              <Route path="/" element={<Home />} />

              {/* 로그인 페이지 */}
              <Route path="/login" element={<Login />} />

              {/* 인증된 사용자만 접근할 수 있는 경로 */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
