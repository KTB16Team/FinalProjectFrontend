import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const authContext = useContext(AuthContext);

  // authContext가 undefined이거나 accessToken이 없으면 로그인 페이지로 리다이렉트
  if (!authContext || !authContext.accessToken) {
    return <Navigate to="/login" />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;